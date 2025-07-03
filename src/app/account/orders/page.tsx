"use client";
import { OrdersTab } from "@/components/account/OrdersTab";
import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";

const OrdersPage = () => {
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
            <ShoppingBag className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">طلباتي</h1>
            <p className="text-gray-600">تتبع جميع طلباتك وحالة التوصيل</p>
          </div>
        </div>
      </motion.div>

      {/* Orders Content */}
      <OrdersTab />
    </div>
  );
};

export default OrdersPage;