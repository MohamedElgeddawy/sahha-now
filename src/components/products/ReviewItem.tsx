import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewItemProps {
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export function ReviewItem({
  userName,
  rating,
  date,
  comment,
}: ReviewItemProps) {
  return (
    <div className="space-y-3 border-b border-gray-100 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{userName}</span>
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={cn("size-4", {
                    "text-yellow-400 fill-yellow-400": i < rating,
                    "text-gray-300 fill-gray-300": i >= rating,
                  })}
                />
              ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
}
