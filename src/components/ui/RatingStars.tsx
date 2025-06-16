 // components/ui/RatingStars.tsx
import React from "react";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
}

export const RatingStars = ({ 
  rating, 
  maxStars = 5, 
  size = 20 
}: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, index) => {
        if (index < fullStars) {
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="#FBBF24"
              stroke="#FBBF24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="#FBBF24"
              stroke="#FBBF24"
            >
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27V2z" />
            </svg>
          );
        } else {
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D1D5DB"
            >
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
          );
        }
      })}
    </div>
  );
};