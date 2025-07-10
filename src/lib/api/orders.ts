import sahhaInstance from "./sahhaInstance";

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;

  transaction: {
    method: "CARD" | "CASH_ON_DELIVERY";
    paymentMethod: {
      brand?: string;
    };
  };
  status:
    | "PENDING"
    | "CONFIRMED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";
  pointsEarned: string;
  pointAwardTransactionId: string | null;
  userId: string;
  subtotalBeforeFees: string;
  deliveryFee: string;
  totalPriceAfterFees: string;
  confirmedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  orderAddress: {
    id: string;
    createdAt: string;
    orderId: string;
    fullname: string;
    phoneNumber: string;
    city: string;
    district: string;
    street: string;
    building: string;
  };
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  createdAt: string;
  variantId: string;
  orderId: string;
  unitPrice: string;
  quantity: number;
  totalPrice: string;
  variant: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    arabicName: string;
    sku: string;
    price: string;
    discount: string;
    isAvailable: boolean;
    isDefault: boolean;
    productId: string;
    product: {
      id: string;
      createdAt: string;
      updatedAt: string;
      name: string;
      arabicName: string;
      sku: string | null;
      shortDescription: string;
      arabicShortDescription: string;
      longDescription: string;
      arabicLongDescription: string;
      price: string;
      discount: string;
      averageRating: string;
      isFavourite: boolean;
      brandId: string;
      categoryId: string;
      media: ProductMedia[];
    };
  };
}

export interface ProductMedia {
  id: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  filename: string;
  isMain: boolean;
  key: string;
  url: string;
  isFileConfirmed: boolean;
  thumbnailKey: string;
  thumbnailUrl: string;
  isThumbnailConfirmed: boolean;
}

export interface OrdersResponse {
  orders: Order[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrdersParams {
  page?: number;
  limit?: number;
  status?: string;
}

export const getOrders = async (
  params: OrdersParams = {}
): Promise<OrdersResponse> => {
  const response = await sahhaInstance.get("/orders", {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      ...params,
    },
  });
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await sahhaInstance.get(`/orders/${orderId}`);
  return response.data;
};
