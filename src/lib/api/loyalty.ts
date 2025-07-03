import sahhaInstance from "./sahhaInstance";

// Loyalty Transaction Types
export interface LoyaltyTransaction {
  id: string;
  adminLogId: string | null;
  purchaseAmount: string | null;
  pointsChanged: number;
  transactionType:
    | "PURCHASE_AWARD"
    | "REDEMPTION_SPEND"
    | "ORDER_CANCEL_DEDUCT"
    | "ORDER_RETURN_DEDUCT"
    | "REDEMPTION_CANCEL_REFUND"
    | "ADMIN_ADJUSTMENT_ADD"
    | "ADMIN_ADJUSTMENT_DEDUCT";
  status: "PENDING" | "DONE" | "CANCELLED";
  notes: string;
  createdAt: string;
  orderId: string | null;
  userId: string;
  order: any | null;
}

export interface LoyaltyBalance {
  pointsBalance: number;
  accountBalance: string;
}

export interface LoyaltyTransactionsResponse {
  transactions: LoyaltyTransaction[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
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

    const queryParams: Record<string, any> = {
      page,
      limit,
    };

    if (startDate) queryParams.startDate = startDate;
    if (endDate) queryParams.endDate = endDate;
    if (type) queryParams.type = type;

    const response = await sahhaInstance.get(`/loyalty/transactions`, {
      params: queryParams,
    });
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
    pointsToRedeem: number
  ): Promise<{
    success: boolean;
    message: string;
    newBalance: LoyaltyBalance;
  }> => {
    const response = await sahhaInstance.post("/loyalty/redemptions", {
      pointsToRedeem,
    });
    return response.data;
  },
};
