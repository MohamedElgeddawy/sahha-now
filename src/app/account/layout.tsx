"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle, ShoppingBag, Heart, LogOut } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { clearCredentials } from "@/lib/redux/slices/authSlice";
import { useMediaQuery } from "usehooks-ts";
import { useAppSelector } from "@/lib/redux/hooks";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isMobile = useMediaQuery("(max-width: 768px)");

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated]);

  const menuItems = [
    {
      href: "/account",
      label: "المعلومات الشخصية",
      icon: <UserCircle className="w-5 h-5" />,
      description: "إدارة بياناتك الشخصية",
    },
    {
      href: "/account/orders",
      label: "طلباتي",
      icon: <ShoppingBag className="w-5 h-5" />,
      description: "تتبع طلباتك وحالة التوصيل",
    },
    {
      href: "/account/points",
      label: "نقاط الولاء",
      icon: <Heart className="w-5 h-5" />,
      description: "استبدل نقاطك واربح مكافآت",
    },
  ];

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/");
  };

  const getCurrentPageLabel = () => {
    const currentItem = menuItems.find((item) => item.href === pathname);
    return currentItem?.label || "حسابي";
  };

  const handleMobileNavigation = (value: string) => {
    router.push(value);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div className="">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "حسابي", href: "/account" },
          ]}
        />

        {isMobile ? (
          // Mobile Layout
          <div className="mt-6 space-y-6">
            {/* Mobile Navigation Select */}
            <Select
              dir="rtl"
              value={pathname}
              onValueChange={handleMobileNavigation}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder={getCurrentPageLabel()} />
              </SelectTrigger>
              <SelectContent>
                {menuItems.map((item) => (
                  <SelectItem key={item.href} value={item.href}>
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-2" />
              تسجيل الخروج
            </Button>

            {/* Mobile Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </div>
        ) : (
          // Desktop Layout
          <div className="mt-6 grid grid-cols-12 gap-4">
            {/* Enhanced Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-4 lg:col-span-3"
            >
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {/* Profile Header */}

                {/* Navigation Menu */}
                <nav className="p-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-4 px-4 py-4 m-1 rounded-lg transition-all duration-200 hover:bg-green-50 group",
                          pathname === item.href
                            ? "bg-green-50 text-green-700 border-r-4 border-green-500"
                            : "text-gray-700 hover:text-green-700"
                        )}
                      >
                        <div
                          className={cn(
                            "transition-colors duration-200",
                            pathname === item.href
                              ? "text-green-600"
                              : "text-gray-400 group-hover:text-green-600"
                          )}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.description}
                          </div>
                        </div>
                        {pathname === item.href && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Logout Section */}
                <div className="border-t border-gray-100 p-2">
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5 mr-4" />
                    <div>
                      <div className="font-medium">تسجيل الخروج</div>
                      <div className="text-xs text-gray-500">
                        الخروج من حسابك
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-8 lg:col-span-9"
            >
              {children}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountLayout;
