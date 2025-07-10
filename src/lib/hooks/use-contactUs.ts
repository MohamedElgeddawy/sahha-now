// src/hooks/use-contactUs.ts
import { useMutation } from "@tanstack/react-query";
import { sendContactMessage, ContactFormData } from "@api/contactUs";

export const contactKeys = {
  all: ["contact"] as const,
  message: () => [...contactKeys.all, "message"] as const,
};

export function useSendContactMessage() {
  return useMutation({
    mutationFn: (formData: ContactFormData) => sendContactMessage(formData),
    // Optional: onSuccess, onError callbacks
    onSuccess: (data) => {
      console.log("Contact message sent successfully:", data);
      // You could invalidate a query here if you had a list of feedback messages to refetch
    },
    onError: (error) => {
      console.error("Failed to send contact message:", error);
      // Handle error, e.g., show a toast message
    },
  });
}
