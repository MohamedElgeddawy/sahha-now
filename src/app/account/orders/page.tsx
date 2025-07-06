"use client";
import { OrdersTab } from "@/components/account/OrdersTab";
import { motion } from "motion/react";
import Banner from "../components/Banner";

const OrdersPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <Banner
        icon="shopping-bag"
        title="طلباتي"
        description="تتبع جميع طلباتك وحالة التوصيل"
      />

      {/* Orders Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6"
      >
        <OrdersTab />
      </motion.div>
    </div>
  );
};

export default OrdersPage;
