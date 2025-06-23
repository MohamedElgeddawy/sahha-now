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
} from "@/components/ui/pagination";
import { OrderDetails } from "./OrderDetails";
import { useRouter } from "next/navigation";

type OrderStatus = "قيد التجهيز" | "تم الشحن" | "تم التوصيل" | "تم الالغاء";

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
};

const getStatusVariant = (
  status: OrderStatus
): "default" | "destructive" | "secondary" | "outline" => {
  switch (status) {
    case "قيد التجهيز":
      return "default"; // Orange
    case "تم الشحن":
      return "secondary"; // Blue
    case "تم التوصيل":
      return "outline"; // Green
    case "تم الالغاء":
      return "destructive"; // Red
    default:
      return "default";
  }
};

const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "قيد التجهيز":
      return "bg-orange-100 px-4 py-2 text-orange-600";
    case "تم الشحن":
      return "bg-blue-100 px-4 py-2 text-blue-600";
    case "تم التوصيل":
      return "bg-green-100 px-4 py-2 text-green-600";
    case "تم الالغاء":
      return "bg-red-100 px-4 py-2 text-red-600";
    default:
      return "";
  }
};

export function OrdersTab() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  // Mock orders data
  const orders: Order[] = [
    {
      id: "123455",
      date: "13/05/2025",
      status: "قيد التجهيز",
      total: 365,
    },
    {
      id: "123455",
      date: "13/05/2025",
      status: "تم الشحن",
      total: 365,
    },
    {
      id: "123455",
      date: "13/05/2025",
      status: "تم التوصيل",
      total: 365,
    },
    {
      id: "123455",
      date: "13/05/2025",
      status: "تم الالغاء",
      total: 365,
    },
    {
      id: "123455",
      date: "13/05/2025",
      status: "تم التوصيل",
      total: 365,
    },
    {
      id: "123455",
      date: "13/05/2025",
      status: "تم الشحن",
      total: 365,
    },
    {
      id: "123455",
      date: "13/05/2025",
      status: "قيد التجهيز",
      total: 365,
    },
    {
        id: "123455",
      date: "13/05/2025",
      status: "تم الشحن",
      total: 365,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-300">
      {orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">رقم الطلب</TableHead>
              <TableHead className="text-start">التاريخ</TableHead>
              <TableHead className="text-start">الحالة</TableHead>
              <TableHead className="text-start">الإجمالي</TableHead>
              <TableHead className="sr-only">عرض التفاصيل</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell className="text-start">{order.id}</TableCell>
                <TableCell className="text-start">{order.date}</TableCell>
                <TableCell className="text-start">
                  <Badge
                    className={`${getStatusColor(order.status)} border-none`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-start">{order.total} ر.س</TableCell>

                <TableCell className="text-center">
                  <button
                    className="text-red-500 text-sm font-medium hover:underline"
                    onClick={() => router.push(`/account/${order.id}`)}
                  >
                    عرض التفاصيل
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-start py-10">
          <p className="text-gray-500">لا توجد طلبات حالية</p>
        </div>
      )}

      {orders.length > 0 && (
        <div className="p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>
              {[1, 2, 3].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.min(3, p + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
