import { ProductReview } from "@/lib/api/reviews";
import { Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface ReviewItemProps {
  review: ProductReview;
}

export function ReviewItem({ review }: ReviewItemProps) {
  // Format the date in Arabic
  const formattedDate = format(new Date(review.createdAt), "dd MMMM yyyy", {
    locale: ar,
  });

  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 rounded-full p-1">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <span className="font-medium text-gray-800">
            {review.customer?.fullname || "غير معروف"}
          </span>
        </div>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn("h-4 w-4", {
              "text-[#FFA726] fill-[#FFA726]": star <= Number(review.rating),
              "text-gray-300 fill-gray-300": star > Number(review.rating),
            })}
          />
        ))}
      </div>

      {review.comment && (
        <p className="text-gray-600 text-sm">{review.comment}</p>
      )}
    </div>
  );
}
