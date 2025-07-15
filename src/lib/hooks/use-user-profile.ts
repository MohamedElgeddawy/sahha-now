import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import sahhaInstance from "@api/sahhaInstance";
import { toast } from "sonner";
import { z } from "zod";

// Define the user schema
export const userProfileSchema = z.object({
  fullname: z.string().min(2, { message: "الاسم يجب أن يكون أكثر من حرفين" }),
  mobile: z.string().min(10, { message: "رقم الهاتف غير صحيح" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  age: z.number().min(13, { message: "يجب أن يكون العمر 13 سنة على الأقل" }),
});

export type UserProfileData = z.infer<typeof userProfileSchema>;

// API functions
const fetchUserProfile = async (): Promise<UserProfileData> => {
  try {
    const response = await sahhaInstance.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      fullname: "",
      mobile: "",
      email: "",
      age: 0,
    };
  }
};

const updateUserProfile = async (
  data: UserProfileData
): Promise<UserProfileData> => {
  const response = await sahhaInstance.patch("/users/me", data);
  return response.data;
};

export function useUserProfile() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      // Update the cache with the new data
      queryClient.setQueryData(["userProfile"], data);
      toast.success("تم تحديث المعلومات الشخصية بنجاح");
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء تحديث المعلومات الشخصية");
      console.error("Error updating user profile:", error);
    },
  });

  return {
    userProfile: query.data || {
      fullname: "",
      mobile: "",
      email: "",
      age: 0,
    },
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    updateProfile: mutation.mutate,
    isPending: mutation.isPending,
  };
}
