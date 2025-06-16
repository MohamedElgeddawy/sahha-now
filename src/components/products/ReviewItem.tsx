import { RatingStars } from "@/components/ui/RatingStars";

interface ReviewItemProps {
  review: {
    id: number;
    userName: string;
    rating: number;
    date: string;
    comment: string;
  };
}

export function ReviewItem({ review }: ReviewItemProps) {
  const formattedDate = new Date(review.date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-medium">
              {review.userName.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{review.userName}</h4>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <RatingStars rating={review.rating} size="sm" />
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
} 