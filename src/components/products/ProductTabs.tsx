"use client";

import { useState } from "react";
import { Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReviewItem } from "./ReviewItem";
import { Product } from "@/lib/api/products";
import { reviewKeys, useProductReviews } from "@/lib/hooks/use-reviews";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectIsAuthenticated } from "@/lib/redux/slices/authSlice";
import { useProductStats } from "@/lib/hooks/use-reviews";
import { addProductReview } from "@/lib/api/reviews";

interface ProductTabsProps {
  product: Product;
}

type RatingKey = 1 | 2 | 3 | 4 | 5;

interface ReviewFormValues {
  rating: RatingKey | null;
  comment: string;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const router = useRouter();
  const [hoverRating, setHoverRating] = useState<RatingKey | null>(null);
  const [rememberComment, setRememberComment] = useState(false);
  const queryClient = useQueryClient();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ReviewFormValues>({
    defaultValues: {
      rating: null,
      comment: "",
    },
  });

  const currentRating = watch("rating");

  const {
    data: reviewStats,
    isLoading: isLoadingStats,
    error,
  } = useProductStats(product.id);
  const {
    data: reviewsRes,
    isLoading: isLoadingReviews,
    fetchNextPage,
    hasNextPage,
  } = useProductReviews(product.id);

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

  const onSubmitReview = async (data: ReviewFormValues) => {
    // Check if user is authenticated - first check Redux state, then localStorage as backup
    if (!isAuthenticated) {
      toast.error("يرجى تسجيل الدخول لإضافة تقييم");
      router.push("/auth/login");
      return;
    }

    // Validate rating
    if (!data.rating) {
      toast.error("يرجى اختيار تقييم");
      return;
    }

    try {
      await addProductReview(product.id, {
        rating: data.rating as number,
        comment: data.comment,
      });

      toast.success("تم إضافة تقييمك بنجاح");

      // Reset form but keep comment if remember is checked
      reset({
        rating: null,
        comment: rememberComment ? data.comment : "",
      });

      // Refresh reviews data
      queryClient.invalidateQueries({
        queryKey: reviewKeys.reviewStats(product.id),
      });
    } catch (error: any) {
      console.error("Error submitting review:", error);

      // Handle authentication errors
      if (
        error.message?.includes("Authentication") ||
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        toast.error("يرجى تسجيل الدخول لإضافة تقييم");

        // Clear token if it's invalid
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }

        router.push("/auth/login");
      } else {
        // Handle other errors
        toast.error(error.message || "حدث خطأ أثناء إرسال التقييم");
      }
    }
  };

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

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
              تفاصيل المنتج
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
              تعليقات المنتج
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
              {product.longDescription}
            </p>
          </TabsContent>

          <TabsContent
            value="shipping"
            className="prose prose-sm max-w-none text-right"
          >
            <p className="text-gray-600 leading-relaxed">
              {product.longDescription || "سياسة الشحن والإرجاع ستظهر هنا"}
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
                <p>حدث خطأ أثناء تحميل التقييمات</p>
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
                <div className="basis-1/3 space-y-2">
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
              {isLoadingReviews ? (
                <div className="flex gap-8 items-start animate-pulse">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ) : reviewsRes && reviewsRes?.length > 0 ? (
                <div className="space-y-4">
                  {reviewsRes.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                  ))}
                  {hasNextPage && (
                    <Button
                      size={"sm"}
                      onClick={() => fetchNextPage()}
                      className="w-fit"
                    >
                      عرض المزيد من التقييمات
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-gray-500">لم يتم إضافة أي تقييمات بعد</div>
              )}
            </div>

            {/* Add Review Form */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-medium text-gray-900">إضافة تقييم</h3>

              {!isAuthenticated ? (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">
                    يجب تسجيل الدخول لإضافة تقييم
                  </p>
                  <Button
                    onClick={handleLoginClick}
                    className="bg-[#2D9CDB] hover:bg-[#2589BD] text-white"
                  >
                    تسجيل الدخول
                  </Button>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={handleSubmit(onSubmitReview)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        تقييمك: *
                      </label>
                      <div
                        onMouseLeave={() => setHoverRating(null)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            type="button"
                            key={value}
                            onClick={() =>
                              setValue("rating", value as RatingKey)
                            }
                            onMouseEnter={() =>
                              setHoverRating(value as RatingKey)
                            }
                            className="focus:outline-none"
                          >
                            <Star
                              className={cn("size-6", {
                                "text-[#FFA726]/40 fill-[#FFA726]/40":
                                  value <= (hoverRating || 0),
                                "text-[#FFA726] fill-[#FFA726]":
                                  value <= (currentRating || 0),
                                "text-gray-300 fill-gray-300":
                                  value > (currentRating || 0) &&
                                  value > (hoverRating || 0),
                              })}
                            />
                          </button>
                        ))}
                      </div>
                      {errors.rating && (
                        <p className="text-red-500 text-sm mt-1">
                          التقييم مطلوب
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        التعليق
                      </label>
                      <textarea
                        id="comment"
                        {...register("comment")}
                        rows={4}
                        placeholder="برجاء إدخال التقييم..."
                        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#4184F3] focus:border-transparent text-right"
                      />
                    </div>

                    {/* Remember comment */}
                    <div className="flex items-center gap-2 justify-start">
                      <Checkbox
                        id="remember"
                        checked={rememberComment}
                        onCheckedChange={(checked) =>
                          setRememberComment(checked === true)
                        }
                        className="border-gray-400"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-600"
                      >
                        احفظ التعليق لاستخدامه في المرة القادمة
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2"
                    >
                      {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
