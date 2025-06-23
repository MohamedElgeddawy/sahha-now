"use client";

import React from "react";
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

// Mock data for points history
const pointsHistory = [
  {
    id: 1,
    type: "نقاط متاحة",
    points: "+120 نقطة",
    date: "13/05/2025",
    status: "مقبولة",
    source: "الطلب 123456",
  },
  {
    id: 2,
    type: "نقاط مستهلكة",
    points: "-320 نقطة",
    date: "13/05/2025",
    status: "مكتملة",
    source: "الخصم 78908",
  },
  {
    id: 3,
    type: "نقاط تسوية الصيدلية",
    points: "120 نقطة",
    date: "13/05/2025",
    status: "تسوية الصيدلية",
    source: "الطلب 123456",
  },
  {
    id: 4,
    type: "نقاط متاحة جودا",
    points: "+120 نقطة",
    date: "13/05/2025",
    status: "التسويق",
    source: "صالحة تعديل",
  },
  {
    id: 5,
    type: "نقاط متاحة",
    points: "+120 نقطة",
    date: "13/05/2025",
    status: "مقبولة",
    source: "الطلب 123456",
  },
  {
    id: 6,
    type: "نقاط متاحة",
    points: "+120 نقطة",
    date: "13/05/2025",
    status: "مقبولة",
    source: "الطلب 123456",
  },
  {
    id: 7,
    type: "نقاط مستهلكة",
    points: "-320 نقطة",
    date: "13/05/2025",
    status: "مكتملة",
    source: "الخصم 78908",
  },
  {
    id: 8,
    type: "نقاط متاحة",
    points: "+120 نقطة",
    date: "13/05/2025",
    status: "مقبولة",
    source: "الطلب 123456",
  },
];

// Helper function to get badge variant based on status
const getBadgeVariant = (status: string) => {
  switch (status) {
    case "مقبولة":
      return {
        variant: "default",
        className: "bg-green-100 px-4 py-2 text-green-600 border-green-200",
      };
    case "مكتملة":
      return {
        variant: "secondary",
        className: "bg-purple-100 px-4 py-2 text-purple-600 border-purple-200",
      };
    case "تسوية الصيدلية":
      return {
        variant: "destructive",
        className: "bg-red-100 px-4 py-2 text-red-600 border-red-200",
      };
    case "التسويق":
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
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      {/* Points Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#FFF9E9] p-4 rounded-lg flex flex-col gap-3">
          <div className="flex justify-between items-center gap-2">
            <h4 className="text-gray-600 text-lg font-bold">
              الرصيد الحالي من النقاط
            </h4>
            <Button variant="link" className="text-amber-600 p-0 h-auto text-sm">
              استبدل نقاطك
            </Button>
          </div>
          <div className="flex items-end justify-between gap-2">
            <p className="font-medium text-gray-800">1380 نقطة</p>
            <Image src="/icons/gift.svg" alt="gift" width={32} height={32} />
          </div>
        </div>
        <div className="bg-[#E9F8F4] p-4 rounded-lg flex flex-col gap-3">
          <div>
            <h4 className="text-gray-600 text-lg font-bold">محفظتي</h4>
          </div>
          <div className="flex items-end justify-between gap-2">
            <p className="font-medium text-gray-800">45.00 ر.س</p>
            <Image
              src="/icons/wallet.svg"
              alt="wallet"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#2C3E50] mb-6 ">
        جدول النقاط
      </h3>

      {/* Points Table */}
      <div className="rounded-lg overflow-x-auto border border-gray-300 mb-6">
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className=" font-bold text-gray-700">
                  النوع
                </TableHead>
                <TableHead className=" font-bold text-gray-700">
                  عدد النقاط
                </TableHead>
                <TableHead className=" font-bold text-gray-700">
                  التاريخ
                </TableHead>
                <TableHead className=" font-bold text-gray-700">
                  الحالة
                </TableHead>
                <TableHead className=" font-bold text-gray-700">
                  المرجع
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pointsHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className=" font-medium">{item.type}</TableCell>
                  <TableCell className={` ${getPointsColor(item.points)}`}>
                    {item.points}
                  </TableCell>
                  <TableCell className=" text-gray-600">{item.date}</TableCell>
                  <TableCell className="">
                    <Badge
                      variant={getBadgeVariant(item.status).variant as any}
                      className={getBadgeVariant(item.status).className}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className=" text-gray-600">
                    {item.source}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
