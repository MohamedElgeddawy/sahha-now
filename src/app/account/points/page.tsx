"use client";
import { PointsTab } from "@/components/account/PointsTab";
import { motion } from "motion/react";
import Banner from "../components/Banner";

const PointsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <Banner
        icon="heart"
        title="نقاط الولاء"
        description="استبدل نقاطك واربح مكافآت حصرية"
      />

      {/* Points Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6"
      >
        <PointsTab />
      </motion.div>
    </div>
  );
};

export default PointsPage;
