"use client";
import { PersonalInfoTab } from "@/components/account/PersonalInfoTab";
import { motion } from "motion/react";
import Banner from "./components/Banner";

const AccountPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}

      <Banner
        icon="user"
        title="المعلومات الشخصية"
        description="إدارة بياناتك الشخصية ومعلومات الحساب"
      />

      {/* Personal Info Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6"
      >
        <PersonalInfoTab />
      </motion.div>
    </div>
  );
};

export default AccountPage;
