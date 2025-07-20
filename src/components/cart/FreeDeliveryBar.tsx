import { Truck } from "lucide-react";
import React from "react";

const FREE_DELIVERY_THRESHOLD = 375;

export function FreeDeliveryBar({ total }: { total: number }) {
  const amountLeft = Math.max(0, FREE_DELIVERY_THRESHOLD - total);
  const progress = Math.min((total / FREE_DELIVERY_THRESHOLD) * 100, 100);

  return (
    <div
      style={{
        border: "1px solid #ff9800",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "24px",
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "6px",
          background: "#eee",
          borderRadius: "4px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#ff9800",
            borderRadius: "4px",
            transition: "width 0.3s",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: `${progress - 8}%`,
            top: "-16px",
            transform: "translateX(-50%)",
            color: "#263238",
          }}
        >
          <Truck className="size-4 -scale-x-100" />
        </span>
      </div>
      <div style={{ textAlign: "center", color: "#263238", fontWeight: 300 }}>
        {total >= FREE_DELIVERY_THRESHOLD ? (
          <span style={{ color: "#43a047" }}>🎉 لقد حصلت على شحن مجاني!</span>
        ) : (
          <>
            أضف{" "}
            <span style={{ fontWeight: 700 }}>{amountLeft.toFixed(2)} ر.س</span>{" "}
            أكثر للحصول على <span style={{ fontWeight: 700 }}>شحن مجاني!</span>
          </>
        )}
      </div>
    </div>
  );
} 