"use client";

import { useState } from "react";
import { Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReviewItem } from "./ReviewItem";
import type { Product } from "@/lib/mock-data";

interface ProductTabsProps {
  product: Product;
}

type RatingKey = 1 | 2 | 3 | 4 | 5;

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState<RatingKey | null>(null);
  const [comment, setComment] = useState("");

  const tabs = [
    { id: "description", label: "وصف المنتج" },
    { id: "specifications", label: "مواصفات المنتج" },
    { id: "shipping", label: "سياسة الشحن والإرجاع" },
    { id: "reviews", label: "تقييم المنتج" },
  ];

  // Calculate rating percentages
  const ratingCounts: Record<RatingKey, number> = {
    5: product.reviews.filter((r) => r.rating === 5).length,
    4: product.reviews.filter((r) => r.rating === 4).length,
    3: product.reviews.filter((r) => r.rating === 3).length,
    2: product.reviews.filter((r) => r.rating === 2).length,
    1: product.reviews.filter((r) => r.rating === 1).length,
  };

  const totalReviews = product.reviews.length;

  return (
    <div className="w-full" dir="rtl">
      {/* Centered Tabs */}
      <div className="flex justify-center border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300",
                activeTab === tab.id
                  ? "bg-[#2D9CDB] text-white" // Active state
                  : "text-[#2D9CDB] bg-[#EDF8FF]" // Inactive state
              )}
            >
              {/* <button className="w-full py-2 text-center bg-[#FF9B07] text-white rounded-lg hover:bg-[#F08C00] transition-colors"> */}

              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === "description" && (
          <div className="prose prose-sm max-w-none text-right">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="space-y-4 text-right">
            {product.specifications.map((spec, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span className="text-gray-600">{spec.label}</span>
                <span className="font-medium text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="prose prose-sm max-w-none text-right">
            <p className="text-gray-600 leading-relaxed">
            {/* {product.shippingPolicy || "سياسة الشحن والإرجاع ستظهر هنا"} */}
            {product.description || "سياسة الشحن والإرجاع ستظهر هنا"}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-8 text-right">
            {/* Rating Statistics */}
            <div className="flex gap-8 items-start">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {product.rating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center gap-1 my-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={cn("size-5", {
                          "text-[#FFA726] fill-[#FFA726]":
                            i < Math.floor(product.rating),
                          "text-gray-300 fill-gray-300":
                            i >= Math.ceil(product.rating),
                          // For partial stars
                          "text-[#FFA726]":
                            i === Math.floor(product.rating) &&
                            product.rating % 1 > 0,
                        })}
                      />
                    ))}
                </div>
                <div className="text-sm text-gray-500">
                  {totalReviews} تقييم
                </div>
              </div>

              {/* Rating Bars */}
              <div className="flex-1 space-y-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm text-gray-600">{rating}</span>
                      <Star className="size-4 text-[#FFA726] fill-[#FFA726]" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFA726] rounded-full"
                        style={{
                          width: `${
                            totalReviews > 0
                              ? (ratingCounts[rating as RatingKey] /
                                  totalReviews) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-left">
                      {ratingCounts[rating as RatingKey]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  userName={review.userName}
                  rating={review.rating}
                  date={review.date}
                  comment={review.comment}
                />
              ))}
            </div>

            {/* Add Review Form */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-medium text-gray-900">إضافة تقييم</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">تقييمك:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setRating(value as RatingKey)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={cn("size-6", {
                          "text-[#FFA726] fill-[#FFA726]":
                            value <= (rating || 0),
                          "text-gray-300 fill-gray-300": value > (rating || 0),
                        })}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="اكتب تقييمك هنا..."
                  className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#4184F3] focus:border-transparent"
                />
                <p className="text-xs text-gray-500">
                  * سيتم مراجعة تقييمك قبل النشر للتأكد من مطابقته للشروط
                  والأحكام
                </p>
              </div>
              <button className="bg-[#27AE60] text-white px-6 py-2 rounded-lg hover:bg-[#219653] transition-colors">
                إرسال
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
