
"use client";

import { useState } from "react";
import { TabButton } from "@/components/ui/TabButton";
import { ProductSpecs } from "./ProductSpecs";
import { ReviewItem } from "./ReviewItem";

export function ProductTabs({}: {
  description: string;
  specifications: any[];
  reviews: any[];
}) {
  const [activeTab, setActiveTab] = useState("description");

  // Temporary data - replace with actual product data
  const tabs = [
    { id: "description", label: "الوصف" },
    { id: "specs", label: "المواصفات" },
    { id: "reviews", label: "التقييمات" },
  ];

  const reviews = [
    {
      id: 1,
      userName: "أحمد محمد",
      rating: 5,
      date: "2024-03-15",
      comment: "منتج رائع وجودة ممتازة",
    },
    {
      id: 2,
      userName: "سارة أحمد",
      rating: 4,
      date: "2024-03-14",
      comment: "منتج جيد ولكن السعر مرتفع قليلاً",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose prose-lg max-w-none">
            <p>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
              العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها
              التطبيق.
            </p>
            <ul>
              <li>ميزة رقم 1</li>
              <li>ميزة رقم 2</li>
              <li>ميزة رقم 3</li>
            </ul>
          </div>
        );
      case "specs":
        return <ProductSpecs />;
      case "reviews":
        return (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex gap-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
}
