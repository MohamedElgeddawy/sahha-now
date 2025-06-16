import React from "react";

export function AuthSeparator() {
  return (
    <div className="relative w-full my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#DADADA]" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-4 text-[#7B868A] font-medium">أو</span>
      </div>
    </div>
  );
}
 