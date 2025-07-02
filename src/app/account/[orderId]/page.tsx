import { OrderDetails } from "@/components/account/OrderDetails";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

interface OrderDetailsPageProps {
  params: {
    orderId: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { orderId } = params;

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
}
