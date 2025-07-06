import { motion } from "framer-motion";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import React from "react";

type Props = {
  icon: IconName;
  title: string;
  description: string;
};

const Banner = ({ icon, title, description }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-100 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-right">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
          <DynamicIcon
            name={icon}
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            {title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
