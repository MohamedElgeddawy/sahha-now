"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useOrders } from "@/lib/hooks/use-orders";
import { Order } from "@/lib/api/orders";
import Link from "next/link";
import {
  CardLoading,
  ProfileLoadingMessages,
} from "@/components/ui/LoadingComponent";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Status mapping from English to Arabic
const getStatusInArabic = (status: Order["status"]): string => {
  switch (status) {
    case "PENDING":
      return "قيد الانتظار";
    case "CONFIRMED":
      return "تم التأكيد";
    case "SHIPPED":
      return "تم الشحن";
    case "DELIVERED":
      return "تم التوصيل";
    case "CANCELLED":
      return "تم الإلغاء";
    case "RETURNED":
      return "تم الإرجاع";
    default:
      return status;
  }
};

const getStatusColor = (status: Order["status"]): string => {
  switch (status) {
    case "PENDING":
      return "bg-orange-100 px-4 py-2 text-orange-600";
    case "CONFIRMED":
      return "bg-blue-100 px-4 py-2 text-blue-600";
    case "SHIPPED":
      return "bg-blue-100 px-4 py-2 text-blue-600";
    case "DELIVERED":
      return "bg-green-100 px-4 py-2 text-green-600";
    case "CANCELLED":
      return "bg-red-100 px-4 py-2 text-red-600";
    case "RETURNED":
      return "bg-purple-100 px-4 py-2 text-purple-600";
    default:
      return "bg-gray-100 px-4 py-2 text-gray-600";
  }
};

export function OrdersTab() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useOrders({
    page: currentPage,
    limit,
  });

  const orders = ordersData?.orders || [];
  const totalPages = ordersData?.totalPages || 1;

  // Loading state
  if (isLoading) {
    return (
      <CardLoading message={ProfileLoadingMessages.orders} animation="wave" />
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-white rounded-lg border border-gray-300 p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">حدث خطأ أثناء تحميل الطلبات</p>
          <button
            onClick={() => window.location.reload()}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      {orders.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-start min-w-[120px]">
                    رقم الطلب
                  </TableHead>
                  <TableHead className="text-start min-w-[100px]">
                    التاريخ
                  </TableHead>
                  <TableHead className="text-start min-w-[120px]">
                    الحالة
                  </TableHead>
                  <TableHead className="text-start min-w-[100px]">
                    الإجمالي
                  </TableHead>
                  <TableHead className="text-start min-w-[120px]">
                    عرض التفاصيل
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-start font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell className="text-start text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell className="text-start">
                      <Badge
                        className={`${getStatusColor(
                          order.status
                        )} border-none text-xs px-2 py-1`}
                      >
                        {getStatusInArabic(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-start font-semibold">
                      {parseFloat(order.totalPriceAfterFees).toFixed(2)} ر.س
                    </TableCell>
                    <TableCell className="text-start">
                      <Link
                        className="text-red-500 text-sm font-medium hover:underline"
                        href={`/account/orders/${order.id}`}
                      >
                        عرض التفاصيل
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    className={
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }
                  />
                </PaginationItem>

                {generatePageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => {
                          setCurrentPage(page as number);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    className={
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="py-12 flex flex-col items-center text-center">
          <Image
            src="/images/emptyCart.svg"
            alt="لا توجد طلبات"
            width={200}
            height={200}
            className="mb-6"
          />
          <h2 className="text-xl font-bold mb-4">لا توجد طلبات</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            لم تقم بإجراء أي طلبات حتى الآن. ابدأ بالتسوق واطلب ما تحتاجه!
          </p>
          <Button asChild>
            <Link href="/products">تصفح المنتجات</Link>
          </Button>
        </div>
      )}
    </>
  );
}
