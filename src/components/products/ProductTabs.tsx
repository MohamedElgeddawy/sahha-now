"use client";

import { useState } from "react";
import { Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReviewItem } from "./ReviewItem";
import { Product } from "@/lib/api/products";
import { useProductReviewStats } from "@/lib/hooks/use-products";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "../ui/progress";

interface ProductTabsProps {
  product: Product;
}

type RatingKey = 1 | 2 | 3 | 4 | 5;

export function ProductTabs({ product }: ProductTabsProps) {
  const [rating, setRating] = useState<RatingKey | null>(null);
  const [comment, setComment] = useState("");

  const {
    data: reviewStats,
    isLoading: isLoadingStats,
    error,
  } = useProductReviewStats(product.id);

  // Calculate rating percentages
  const ratingCounts: Record<RatingKey, number> = {
    5: reviewStats?.ratingDistribution[0]?.count || 0,
    4: reviewStats?.ratingDistribution[1]?.count || 0,
    3: reviewStats?.ratingDistribution[2]?.count || 0,
    2: reviewStats?.ratingDistribution[3]?.count || 0,
    1: reviewStats?.ratingDistribution[4]?.count || 0,
  };

  const totalReviews = reviewStats?.totalReviews || 0;
  const averageRating =
    reviewStats?.averageRating || parseInt(product.averageRating) || 0;

  return (
    <div className="w-full">
      <Tabs dir="rtl" defaultValue="description" className="w-full">
        {/* Centered Tabs */}
        <div className="flex justify-center border-b border-gray-200 pb-3">
          <TabsList className="flex gap-8 bg-transparent">
            <TabsTrigger
              value="description"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 data-[state=active]:bg-[#2D9CDB] data-[state=active]:text-white data-[state=inactive]:text-[#2D9CDB] data-[state=inactive]:bg-[#EDF8FF]"
            >
              وصف المنتج
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 data-[state=active]:bg-[#2D9CDB] data-[state=active]:text-white data-[state=inactive]:text-[#2D9CDB] data-[state=inactive]:bg-[#EDF8FF]"
            >
              مواصفات المنتج
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 data-[state=active]:bg-[#2D9CDB] data-[state=active]:text-white data-[state=inactive]:text-[#2D9CDB] data-[state=inactive]:bg-[#EDF8FF]"
            >
              سياسة الشحن والإرجاع
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 data-[state=active]:bg-[#2D9CDB] data-[state=active]:text-white data-[state=inactive]:text-[#2D9CDB] data-[state=inactive]:bg-[#EDF8FF]"
            >
              تقييم المنتج
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          <TabsContent
            value="description"
            className="prose prose-sm max-w-none text-right"
          >
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-4 text-right">
            {/* {product?.specifications?.map((spec, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span className="text-gray-600">{spec.label}</span>
                <span className="font-medium text-gray-900">{spec.value}</span>
              </div>
            ))} */}
          </TabsContent>

          <TabsContent
            value="shipping"
            className="prose prose-sm max-w-none text-right"
          >
            <p className="text-gray-600 leading-relaxed">
              {product.description || "سياسة الشحن والإرجاع ستظهر هنا"}
            </p>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-8 text-right">
            {/* Rating Statistics */}
            {isLoadingStats ? (
              <div className="flex gap-8 items-start animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded-full"></div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="text-red-500">
                Failed to load review statistics
              </div>
            ) : (
              <div className="flex gap-8 items-start">
                {/* Overall Rating */}
                <div className="text-center flex items-center gap-4">
                  <div className="text-4xl font-bold text-green-600">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-start flex-col">
                    <div className="flex items-center justify-center gap-1 my-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={cn("size-5", {
                              "text-[#FFA726] fill-[#FFA726]":
                                i < Math.floor(averageRating),
                              "text-gray-300 fill-gray-300":
                                i >= Math.ceil(averageRating),
                              // For partial stars
                              "text-[#FFA726]":
                                i === Math.floor(averageRating) &&
                                averageRating % 1 > 0,
                            })}
                          />
                        ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      {totalReviews} تقييم
                    </div>
                  </div>
                </div>

                {/* Rating Bars */}
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="flex items-center gap-1 w-12">
                        <span className="text-sm text-gray-600">{rating}</span>
                        <Star className="size-4 shrink-0 text-[#FFA726] fill-[#FFA726]" />
                        <span className="text-sm text-gray-500 w-12 text-left">
                          {`(${ratingCounts[rating as RatingKey]})`}
                        </span>
                      </div>
                      <Progress
                        value={
                          totalReviews > 0
                            ? (ratingCounts[rating as RatingKey] /
                                totalReviews) *
                              100
                            : 0
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {product?._count?.reviews > 0 ? (
                // Add code to fetch and display actual reviews
                <div className="text-gray-500">
                  Reviews will be displayed here
                </div>
              ) : (
                <div className="text-gray-500">لم يتم إضافة أي تقييمات بعد</div>
              )}
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
                  * احفظ اسمي وبريدي الإلكتروني في هذا المتصفح لاستخدامهم المرة القادمة التي أعلق فيها.
                </p>
              </div>
              <button className="bg-[#27AE60] text-white px-6 py-2 rounded-lg hover:bg-[#219653] transition-colors">
                إرسال
              </button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
