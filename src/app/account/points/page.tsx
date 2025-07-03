"use client";
import { PointsTab } from "@/components/account/PointsTab";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

const PointsPage = () => {
  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border p-6 mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">نقاط الولاء</h1>
            <p className="text-gray-600">استبدل نقاطك واربح مكافآت حصرية</p>
          </div>
        </div>
      </motion.div>

      {/* Points Content */}
      <PointsTab />
    </div>
  );
};

export default PointsPage;