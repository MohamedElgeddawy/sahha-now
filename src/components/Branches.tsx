"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Branches() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-right mb-8">
        <h1 className="text-4xl font-cairo text-[#2C3E50]  font-bold mb-4">
          تعرف على أقرب فرع لك
        </h1>
        <p className="text-gray-600">
          أدخل مدينتك وسنظهر لك أقرب فرع لك بكل سهولة.
        </p>
      </div>

      {/* Search Box */}
      <div className="flex justify-start mb-12">
        <div className="flex h-[48px] w-[600px]">
          <div className="flex-1 flex items-center border border-[#DADADA] rounded-r-lg border-l-0">
            <Input
              type="text"
              placeholder="ابحث بمدينتك"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-[16px] text-[#2C3E50] placeholder:text-gray-400 py-3 px-2 text-right"
            />
          </div>
          <Button
            variant="default"
            size="icon"
            className="size-[48px] rounded-r-none rounded-l-lg bg-[#2C3E50] hover:bg-[#243342]"
            onClick={() => {
              // Handle search
              console.log("Searching for:", searchQuery);
            }}
          >
            <Search className="size-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-[600px] rounded-lg overflow-hidden border border-[#DADADA]">
        <Image
          src="/images/map.png"
          alt="Branch Locations Map"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
