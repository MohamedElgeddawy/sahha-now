import { ProductReview } from "@api/reviews";
import { Star, User } from "lucide-react";
import { cn } from "@utils";
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
    <div className="flex gap-4 py-2">
      {/* First Column - User Avatar */}
      <div className="flex-shrink-0">
        <div className="size-18 rounded-full bg-gray-100 flex items-center justify-center p-4">
          <User className="size-8 text-gray-600" />
        </div>
      </div>

      {/* Second Column - Review Content */}
      <div className="flex-1 flex flex-col gap-1">
        {/* First Row - Rating Stars */}
        <div className="flex items-center gap-1">
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

        {/* Second Row - Name and Date */}
        <div className="flex gap-4 items-center">
          <span className="font-medium text-gray-800">
            {review.customer?.fullname || "غير معروف"}
          </span>
          <span className="text-sm text-gray-400">{formattedDate}</span>
        </div>

        {/* Third Row - Comment */}
        {review.comment && (
          <p className="text-gray-500 text-sm text-right">{review.comment}</p>
        )}
      </div>
    </div>
  );
}
