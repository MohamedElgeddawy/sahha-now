"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { UserCircle, ShoppingBag, Heart, LogOut } from "lucide-react";
import { PersonalInfoTab } from "@/components/account/PersonalInfoTab";
import { OrdersTab } from "@/components/account/OrdersTab";
import { PointsTab } from "@/components/account/PointsTab";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { clearCredentials } from "@/lib/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { useAppSelector } from "@/lib/redux/hooks";

export default function AccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = useState("personal-info");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated]);

  const menuItems = [
    {
      value: "personal-info",
      label: "حسابي الشخصي",
      icon: <UserCircle className="size-5" />,
    },
    {
      value: "orders",
      label: "طلباتي",
      icon: <ShoppingBag className="size-5" />,
    },
    {
      value: "points",
      label: "نقاطي",
      icon: <Heart className="size-5" />,
    },
  ];

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/");
  };

  const renderContent = (tab: string) => {
    switch (tab) {
      case "personal-info":
        return <PersonalInfoTab />;
      case "orders":
        return <OrdersTab />;
      case "points":
        return <PointsTab />;
      default:
        return <PersonalInfoTab />;
    }
  };

  return (
    <div className="py-8 flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "حسابي", href: "/account" },
        ]}
      />

      {isMobile ? (
        // Mobile Layout with Select
        <div className="flex flex-col gap-6">
          {/* Mobile Navigation Select */}
          <div className="flex flex-col gap-4">
            <Select value={activeTab} onValueChange={setActiveTab} dir="rtl">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                {menuItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Logout Button for Mobile */}
            <Button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-3 text-white bg-red-400 hover:bg-red-600 rounded-lg flex items-center justify-center gap-2"
            >
              <LogOut className="size-5" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>

          {/* Mobile Content */}
          <div className="w-full">{renderContent(activeTab)}</div>
        </div>
      ) : (
        // Desktop Layout with Tabs
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          dir="rtl"
          className="flex items-start flex-col md:flex-row"
        >
          {/* Desktop Sidebar Navigation */}
          <TabsList className="basis-1/4 h-auto items-start flex flex-col p-0 gap-2">
            {menuItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="justify-start w-full px-4 py-3 bg-green-200 hover:bg-green-300 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {item.icon}
                <span>{item.label}</span>
              </TabsTrigger>
            ))}
            <Button
              type="button"
              onClick={handleLogout}
              className="justify-start h-[calc(100%-1px)] w-full px-4 !py-3 text-white bg-red-400 hover:bg-red-600 rounded-lg"
            >
              <LogOut className="size-5" />
              <span>تسجيل الخروج</span>
            </Button>
          </TabsList>

          {/* Desktop Tab Content */}
          <div className="basis-3/4">
            {menuItems.map((item) => (
              <TabsContent key={item.value} value={item.value}>
                {renderContent(item.value)}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      )}
    </div>
  );
}
