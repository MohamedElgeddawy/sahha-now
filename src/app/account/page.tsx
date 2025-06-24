"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

export default function AccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="py-8 flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "حسابي", href: "/account" },
        ]}
      />

      <Tabs
        defaultValue="personal-info"
        dir="rtl"
        className="flex items-start flex-col md:flex-row"
      >
        {/* Sidebar Navigation */}
        <TabsList className="basis-1/4 h-auto items-start flex flex-col p-0 gap-2">
          <TabsTrigger
            value="personal-info"
            className="justify-start w-full px-4 py-3 bg-green-200 hover:bg-green-300 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <UserCircle className="size-5" />
            <span>حسابي الشخصي</span>
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="justify-start w-full px-4 py-3 bg-green-200 hover:bg-green-300 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <ShoppingBag className="size-5" />
            <span>طلباتي</span>
          </TabsTrigger>
          <TabsTrigger
            value="points"
            className="justify-start w-full px-4 py-3 bg-green-200 hover:bg-green-300 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <Heart className="size-5" />
            <span>نقاطي</span>
          </TabsTrigger>
          <Button
            type="button"
            onClick={() => {
              dispatch(clearCredentials());
              router.push("/");
            }}
            className="justify-start h-[calc(100%-1px)] w-full px-4 !py-3 text-white bg-red-400 hover:bg-red-600 rounded-lg"
          >
            <LogOut className="size-5" />
            <span>تسجيل الخروج</span>
          </Button>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="personal-info" className="basis-3/4">
          <PersonalInfoTab />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>

        <TabsContent value="points">
          <PointsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
