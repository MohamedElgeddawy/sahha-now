"use client";

import React from "react";

export function OrdersTab() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-[#2C3E50] mb-6 text-right">
        طلباتي
      </h3>
      <div className="text-center py-10">
        <p className="text-gray-500">لا توجد طلبات حالية</p>
      </div>
    </div>
  );
}
