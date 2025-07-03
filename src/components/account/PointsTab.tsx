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
  PaginationEllipsis,
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
} from "@/lib/hooks/use-loyalty";
import {
  CardLoading,
  ProfileLoadingMessages,
} from "@/components/ui/LoadingComponent";
import { LoyaltyTransaction } from "@/lib/api/loyalty";
import { RedeemPointsModal } from "./RedeemPointsModal";
import { RedeemSuccessModal } from "./RedeemSuccessModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Transaction type mapping from English to Arabic
const transactionTypeMap: Record<string, string> = {
  PURCHASE_AWARD: "نقاط من المشتريات",
  ADMIN_ADJUSTMENT_ADD: "إضافة نقاط إدارية",
  ADMIN_ADJUSTMENT_DEDUCT: "خصم نقاط إدارية",
  REDEMPTION_SPEND: "استهلاك نقاط",
  BONUS_AWARD: "نقاط مكافأة",
  REFUND_AWARD: "نقاط مسترجعة",
  EXPIRED_DEDUCT: "نقاط منتهية الصلاحية",
};

// Status mapping from English to Arabic
const statusMap: Record<string, string> = {
  DONE: "مكتملة",
  PENDING: "قيد المعالجة",
  APPROVED: "مقبولة",
  REJECTED: "مرفوضة",
  EXPIRED: "منتهية الصلاحية",
  CANCELLED: "ملغية",
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
const getPointsColor = (pointsChanged: number) => {
  return pointsChanged > 0
    ? "text-green-600"
    : pointsChanged < 0
    ? "text-red-500"
    : "text-gray-700";
};

export function PointsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastRedemption, setLastRedemption] = useState<{
    points: number;
    amount: number;
  } | null>(null);
  const limit = 10;
  const router = useRouter();
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

  // Loading state
  if (transactionsLoading) {
    return (
      <CardLoading message={ProfileLoadingMessages.points} animation="pulse" />
    );
  }

  // Error state
  if (transactionsError) {
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

  const transactions = transactionsData?.transactions || [];
  const pagination = transactionsData;
  const balance = balanceData;
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
  const formatPoints = (pointsChanged: number) => {
    const prefix = pointsChanged > 0 ? "+" : "";
    return `${prefix}${pointsChanged} نقطة`;
  };

  // Handle redeem points button click
  const handleRedeemPointsClick = () => {
    setShowRedeemModal(true);
  };

  // Handle successful redemption
  const handleRedeemSuccess = (
    redeemedPoints: number,
    earnedAmount: number
  ) => {
    setLastRedemption({ points: redeemedPoints, amount: earnedAmount });
    setShowRedeemModal(false);
    setShowSuccessModal(true);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    router.push("/products");
  };

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
              onClick={handleRedeemPointsClick}
              disabled={!balance?.pointsBalance || balance.pointsBalance < 15}
            >
              استبدل نقاطك
            </Button>
          </div>
          <div className="flex items-end justify-between gap-2">
            <p className="font-medium text-gray-800">
              {balance?.pointsBalance?.toLocaleString() || 0} نقطة
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
              {parseFloat(balance?.accountBalance || "0").toFixed(2)} ر.س
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

      {/* Empty State */}
      {transactions.length === 0 ? (
        <div className="py-12 flex flex-col items-center text-center">
          <Image
            src="/images/emptyCart.svg"
            alt="لا توجد معاملات نقاط"
            width={200}
            height={200}
            className="mb-6"
          />
          <h2 className="text-xl font-bold mb-4">لا توجد معاملات نقاط</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            لم تقم بأي معاملات نقاط حتى الآن. ابدأ بالتسوق لكسب نقاط الولاء!
          </p>
          <Button asChild>
            <Link href="/products">ابدأ التسوق</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Points Table */}
          <div className="rounded-lg overflow-x-auto border border-gray-300 mb-6">
            <div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-bold text-gray-700">
                      النوع
                    </TableHead>
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
                        {transactionTypeMap[transaction.transactionType] ||
                          transaction.transactionType}
                      </TableCell>
                      <TableCell
                        className={getPointsColor(transaction.pointsChanged)}
                      >
                        {formatPoints(transaction.pointsChanged)}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDate(transaction.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            getBadgeVariant(
                              statusMap[transaction.status] ||
                                transaction.status
                            ).variant as any
                          }
                          className={
                            getBadgeVariant(
                              statusMap[transaction.status] ||
                                transaction.status
                            ).className
                          }
                        >
                          {statusMap[transaction.status] || transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {transaction.notes}
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
          </div>
        </>
      )}

      {/* Redeem Points Modal */}
      <RedeemPointsModal
        open={showRedeemModal}
        onOpenChange={setShowRedeemModal}
        onSuccess={handleRedeemSuccess}
        availablePoints={balance?.pointsBalance || 0}
      />

      {/* Success Modal */}
      <RedeemSuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        onContinueShopping={handleContinueShopping}
        redeemedPoints={lastRedemption?.points}
        earnedAmount={lastRedemption?.amount}
      />
    </div>
  );
}
