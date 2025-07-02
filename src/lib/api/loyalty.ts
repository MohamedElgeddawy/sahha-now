import sahhaInstance from "./sahhaInstance";

// Loyalty Transaction Types
export interface LoyaltyTransaction {
  id: string;
  createdAt: string;
  updatedAt: string;
  type:
    | "PURCHASE_AWARD"
    | "REDEMPTION_SPEND"
    | "ORDER_CANCEL_DEDUCT"
    | "ORDER_RETURN_DEDUCT"
    | "REDEMPTION_CANCEL_REFUND"
    | "ADMIN_ADJUSTMENT_ADD"
    | "ADMIN_ADJUSTMENT_DEDUCT";
  amount: number;
  status: "PENDING" | "DONE" | "CANCELLED";
  source: string;
  description?: string;
  orderId?: string;
  orderNumber?: string;
  userId: string;
}

export interface LoyaltyBalance {
  currentPoints: number;
  walletBalance: number;
  totalEarned: number;
  totalSpent: number;
}

export interface LoyaltyTransactionsResponse {
  data: LoyaltyTransaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  balance: LoyaltyBalance;
}

export interface LoyaltyTransactionsParams {
  page?: number;
  limit?: number;
  type?: "earned" | "spent" | "all";
  startDate?: string;
  endDate?: string;
}

// API Functions
export const loyaltyApi = {
  /**
   * Get loyalty transactions with pagination
   */
  getTransactions: async (
    params: LoyaltyTransactionsParams = {}
  ): Promise<LoyaltyTransactionsResponse> => {
    const { page = 1, limit = 10, type, startDate, endDate } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);
    if (type) searchParams.append("type", type);

    const response = await sahhaInstance.get(
      `/loyalty/transactions?${searchParams}`
    );
    return response.data;
  },

  /**
   * Get loyalty balance summary
   */
  getBalance: async (): Promise<LoyaltyBalance> => {
    const response = await sahhaInstance.get("/loyalty/balance");
    return response.data;
  },

  /**
   * Redeem points for wallet credit
   */
  redeemPoints: async (
    points: number
  ): Promise<{
    success: boolean;
    message: string;
    newBalance: LoyaltyBalance;
  }> => {
    const response = await sahhaInstance.post("/loyalty/redeem", { points });
    return response.data;
  },
};
