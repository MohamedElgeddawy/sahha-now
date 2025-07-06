import sahhaInstance from "./sahhaInstance";

export interface AnnouncementData {
  id: string;
  title: string;
  description: string;
  type: "LEFT_SECTION" | "RIGHT_SECTION" | "HERO_SECTION";
  imageUrl: string;
  redirectUrl: string;
  buttonText?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AnnouncementsResponse {
  announcements: AnnouncementData[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Fetch active announcements
 */
export async function fetchActiveAnnouncements(): Promise<AnnouncementData[]> {
  try {
    const response = await sahhaInstance.get("/announcements/active");
    // Handle both old and new response formats
    if (response.data.announcements) {
      return response.data.announcements;
    }
    return response.data || [];
  } catch (error) {
    console.error("Error fetching active announcements:", error);
    throw error;
  }
}

/**
 * Fetch announcements by type (LEFT_SECTION, RIGHT_SECTION, HERO_SECTION)
 */
export async function fetchAnnouncementsByType(
  type: "LEFT_SECTION" | "RIGHT_SECTION" | "HERO_SECTION"
): Promise<AnnouncementData[]> {
  try {
    const response = await sahhaInstance.get("/announcements/active");
    const announcements = response.data.announcements || response.data || [];
    return announcements.filter(
      (announcement: AnnouncementData) => announcement.type === type
    );
  } catch (error) {
    console.error("Error fetching announcements by type:", error);
    throw error;
  }
}

/**
 * Fetch left and right section announcements
 */
export async function fetchSectionAnnouncements(): Promise<{
  leftSection: AnnouncementData[];
  rightSection: AnnouncementData[];
}> {
  try {
    const response = await sahhaInstance.get("/announcements/active");
    const announcements = response.data.announcements || response.data || [];

    return {
      leftSection: announcements.filter(
        (announcement: AnnouncementData) => announcement.type === "LEFT_SECTION"
      ),
      rightSection: announcements.filter(
        (announcement: AnnouncementData) =>
          announcement.type === "RIGHT_SECTION"
      ),
    };
  } catch (error) {
    console.error("Error fetching section announcements:", error);
    throw error;
  }
}

/**
 * Fetch all announcements (with pagination support)
 */
export async function fetchAnnouncements(params?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  type?: "LEFT_SECTION" | "RIGHT_SECTION" | "HERO_SECTION";
}): Promise<AnnouncementsResponse> {
  try {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.isActive !== undefined)
      searchParams.append("isActive", params.isActive.toString());
    if (params?.type) searchParams.append("type", params.type);

    const response = await sahhaInstance.get(
      `/announcements?${searchParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
}

/**
 * Fetch single announcement by ID
 */
export async function fetchAnnouncementById(
  id: string
): Promise<AnnouncementData> {
  try {
    const response = await sahhaInstance.get(`/announcements/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching announcement:", error);
    throw error;
  }
}
