import { OrderDetails } from "@/components/account/OrderDetails";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { use } from "react";

interface OrderDetailsPageProps {
  params: Promise<{ orderId: string }>;
}

const OrderDetailsPage = ({ params }: OrderDetailsPageProps) => {
  const { orderId } = use(params);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "الحساب", href: "/account" },
          { label: "تفاصيل الطلب" },
        ]}
      />
      <OrderDetails orderId={orderId} />
    </>
  );
};

export default OrderDetailsPage;