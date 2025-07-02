"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  useLoyaltyTransactions,
  useLoyaltyBalance,
  useRedeemPoints,
} from "@/lib/hooks/use-loyalty";
import {
  CardLoading,
  InlineLoading,
  ProfileLoadingMessages,
} from "@/components/ui/LoadingComponent";
import { LoyaltyTransaction } from "@/lib/api/loyalty";
import { Loader2 } from "lucide-react";

// Transaction type mapping from English to Arabic
const transactionTypeMap: Record<string, string> = {
  earned: "نقاط متاحة",
  spent: "نقاط مستهلكة",
  bonus: "نقاط مكافأة",
  refund: "نقاط مسترجعة",
  expired: "نقاط منتهية الصلاحية",
  adjustment: "تعديل نقاط",
};

// Status mapping from English to Arabic
const statusMap: Record<string, string> = {
  completed: "مكتملة",
  pending: "قيد المعالجة",
  approved: "مقبولة",
  rejected: "مرفوضة",
  expired: "منتهية الصلاحية",
  cancelled: "ملغية",
};

// Helper function to get badge variant based on status
const getBadgeVariant = (status: string) => {
  switch (status) {
    case "مقبولة":
    case "مكتملة":
      return {
        variant: "default",
        className: "bg-green-100 px-4 py-2 text-green-600 border-green-200",
      };
    case "قيد المعالجة":
      return {
        variant: "secondary",
        className: "bg-blue-100 px-4 py-2 text-blue-600 border-blue-200",
      };
    case "مرفوضة":
    case "ملغية":
      return {
        variant: "destructive",
        className: "bg-red-100 px-4 py-2 text-red-600 border-red-200",
      };
    case "منتهية الصلاحية":
      return {
        variant: "outline",
        className: "bg-amber-100 px-4 py-2 text-amber-600 border-amber-200",
      };
    default:
      return {
        variant: "default",
        className: "bg-gray-100 px-4 py-2 text-gray-600 border-gray-200",
      };
  }
};

// Helper function to get text color based on points
const getPointsColor = (points: string) => {
  return points.startsWith("+")
    ? "text-green-600"
    : points.startsWith("-")
    ? "text-red-500"
    : "text-gray-700";
};

export function PointsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useLoyaltyTransactions({ page: currentPage, limit });

  const {
    data: balanceData,
    isLoading: balanceLoading,
    isError: balanceError,
  } = useLoyaltyBalance();

  const { mutate: redeemPoints, isPending: isRedeeming } = useRedeemPoints();

  // Loading state
  if (transactionsLoading || balanceLoading) {
    return (
      <CardLoading message={ProfileLoadingMessages.points} animation="pulse" />
    );
  }

  // Error state
  if (transactionsError || balanceError) {
    return (
      <div className="bg-white rounded-lg border border-gray-300 p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">حدث خطأ أثناء تحميل النقاط</p>
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

  const transactions = transactionsData?.data || [];
  const pagination = transactionsData?.pagination;
  const balance = transactionsData?.balance || balanceData;
  const totalPages = pagination?.totalPages || 1;

  // Format date for Arabic locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Format points display
  const formatPoints = (amount: number, type: string) => {
    const prefix =
      type === "earned" || type === "bonus" || type === "refund"
        ? "+"
        : type === "spent" || type === "expired"
        ? "-"
        : "";
    return `${prefix}${Math.abs(amount)} نقطة`;
  };

  // Handle redeem points
  const handleRedeemPoints = () => {
    if (balance?.currentPoints && balance.currentPoints >= 100) {
      const pointsToRedeem = Math.floor(balance.currentPoints / 100) * 100; // Redeem in multiples of 100
      redeemPoints(pointsToRedeem);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      {/* Points Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#FFF9E9] p-4 rounded-lg flex flex-col gap-3">
          <div className="flex justify-between items-center gap-2">
            <h4 className="text-gray-600 text-lg font-bold">
              الرصيد الحالي من النقاط
            </h4>
            <Button
              variant="link"
              className="text-amber-600 p-0 h-auto text-sm"
              onClick={handleRedeemPoints}
              disabled={
                isRedeeming ||
                !balance?.currentPoints ||
                balance.currentPoints < 100
              }
            >
              {isRedeeming ? (
                <InlineLoading
                  message="جاري الاستبدال..."
                  animation="dots"
                  size="sm"
                />
              ) : (
                "استبدل نقاطك"
              )}
            </Button>
          </div>
          <div className="flex items-end justify-between gap-2">
            <p className="font-medium text-gray-800">
              {balance?.currentPoints?.toLocaleString() || 0} نقطة
            </p>
            <Image src="/icons/gift.svg" alt="gift" width={32} height={32} />
          </div>
        </div>
        <div className="bg-[#E9F8F4] p-4 rounded-lg flex flex-col gap-3">
          <div>
            <h4 className="text-gray-600 text-lg font-bold">محفظتي</h4>
          </div>
          <div className="flex items-end justify-between gap-2">
            <p className="font-medium text-gray-800">
              {balance?.walletBalance?.toFixed(2) || "0.00"} ر.س
            </p>
            <Image
              src="/icons/wallet.svg"
              alt="wallet"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#2C3E50] mb-6">جدول النقاط</h3>

      {/* Points Table */}
      <div className="rounded-lg overflow-x-auto border border-gray-300 mb-6">
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-bold text-gray-700">النوع</TableHead>
                <TableHead className="font-bold text-gray-700">
                  عدد النقاط
                </TableHead>
                <TableHead className="font-bold text-gray-700">
                  التاريخ
                </TableHead>
                <TableHead className="font-bold text-gray-700">
                  الحالة
                </TableHead>
                <TableHead className="font-bold text-gray-700">
                  المرجع
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction: LoyaltyTransaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transactionTypeMap[transaction.type] || transaction.type}
                  </TableCell>
                  <TableCell
                    className={getPointsColor(
                      formatPoints(transaction.amount, transaction.type)
                    )}
                  >
                    {formatPoints(transaction.amount, transaction.type)}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate(transaction.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        getBadgeVariant(
                          statusMap[transaction.status] || transaction.status
                        ).variant as any
                      }
                      className={
                        getBadgeVariant(
                          statusMap[transaction.status] || transaction.status
                        ).className
                      }
                    >
                      {statusMap[transaction.status] || transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {transaction.source}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-300">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>
                الصفحة {currentPage} من {totalPages}
              </span>
            </div>

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
                      currentPage <= 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {/* Page numbers */}
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page: number;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
