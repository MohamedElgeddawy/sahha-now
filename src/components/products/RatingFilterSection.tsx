import React from "react";
import { Checkbox } from "@components/ui/checkbox";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, Star } from "lucide-react";
import { cn } from "@utils";

type RatingFilterProps = {
  title: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  selectedRating?: number;
  onRatingSelect?: (rating: number) => void;
  ratingCounts?: { rating: number; count: number }[];
};

const ratingOptions = [5, 4, 3, 2, 1];

const RatingFilterSection = ({
  title,
  isCollapsed,
  onToggleCollapse,
  selectedRating,
  onRatingSelect,
  ratingCounts = [],
}: RatingFilterProps) => {
  // Convert ratingCounts array to object for easy lookup
  const ratingCountsMap = ratingCounts.reduce((acc, { rating, count }) => {
    acc[rating] = count;
    return acc;
  }, {} as Record<number, number>);
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggleCollapse}
      >
        <h3 className="font-medium text-lg">{title}</h3>
        <motion.button
          className="cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isCollapsed ? <Plus /> : <Minus />}
        </motion.button>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-3 space-y-2">
              {ratingOptions.map((rating) => (
                <div key={rating} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRating === rating}
                      onCheckedChange={() =>
                        onRatingSelect && onRatingSelect(rating)
                      }
                    />
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={cn("size-5", {
                              "text-[#FFA726] fill-[#FFA726]": i < rating,
                              "text-gray-300 fill-gray-300": i >= rating,
                            })}
                          />
                        ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {ratingCountsMap[rating] || 0}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RatingFilterSection;
