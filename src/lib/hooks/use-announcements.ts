import { useQuery } from "@tanstack/react-query";
import {
  fetchActiveAnnouncements,
  fetchAnnouncements,
  fetchAnnouncementById,
  fetchAnnouncementsByType,
  fetchSectionAnnouncements,
  type AnnouncementData,
  type AnnouncementsResponse,
} from "@api/announcements";

// Query keys for announcements
export const announcementKeys = {
  all: ["announcements"] as const,
  active: () => [...announcementKeys.all, "active"] as const,
  byType: (type: string) => [...announcementKeys.all, "type", type] as const,
  sections: () => [...announcementKeys.all, "sections"] as const,
  lists: () => [...announcementKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...announcementKeys.lists(), filters] as const,
  details: () => [...announcementKeys.all, "detail"] as const,
  detail: (id: string) => [...announcementKeys.details(), id] as const,
};

/**
 * Hook to fetch active announcements
 */
export function useActiveAnnouncements() {
  return useQuery<AnnouncementData[], Error>({
    queryKey: announcementKeys.active(),
    queryFn: fetchActiveAnnouncements,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch announcements by type
 */
export function useAnnouncementsByType(
  type: "LEFT_SECTION" | "RIGHT_SECTION" | "HERO_SECTION"
) {
  return useQuery<AnnouncementData[], Error>({
    queryKey: announcementKeys.byType(type),
    queryFn: () => fetchAnnouncementsByType(type),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch left and right section announcements
 */
export function useSectionAnnouncements() {
  return useQuery<
    {
      leftSection: AnnouncementData[];
      rightSection: AnnouncementData[];
    },
    Error
  >({
    queryKey: announcementKeys.sections(),
    queryFn: fetchSectionAnnouncements,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch announcements with optional filters
 */
export function useAnnouncements(params?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  type?: "LEFT_SECTION" | "RIGHT_SECTION" | "HERO_SECTION";
}) {
  return useQuery<AnnouncementsResponse, Error>({
    queryKey: announcementKeys.list(params || {}),
    queryFn: () => fetchAnnouncements(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch a single announcement by ID
 */
export function useAnnouncement(id: string, enabled: boolean = true) {
  return useQuery<AnnouncementData, Error>({
    queryKey: announcementKeys.detail(id),
    queryFn: () => fetchAnnouncementById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch hero announcements (HERO_SECTION type)
 */
export function useHeroAnnouncements() {
  return useQuery<AnnouncementData[], Error>({
    queryKey: announcementKeys.byType("HERO_SECTION"),
    queryFn: () => fetchAnnouncementsByType("HERO_SECTION"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
