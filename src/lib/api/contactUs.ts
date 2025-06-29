// src/api/contactUs.ts
import sahhaInstance from "./sahhaInstance"; 

export interface ContactFormData {
    name: string;
    email: string;
    phone: string; // From frontend
    message: string; // From frontend
}

interface FeedbackPayload {
    name: string;
    email: string;
    mobile: string; // To backend
    content: string; // To backend
}

export async function sendContactMessage(formData: ContactFormData) {
    try {
        // Map frontend names to backend names
        const payload: FeedbackPayload = {
            name: formData.name,
            email: formData.email,
            mobile: formData.phone, // Map 'phone' to 'mobile'
            content: formData.message, // Map 'message' to 'content'
        };

        const response = await sahhaInstance.post('/feedbacks', payload);
        return response.data; // This will likely contain the success message and saved feedback
    } catch (error: any) {
        console.error("Error sending contact message:", error);
        // Re-throw the error so the hook can catch it
        throw error.response?.data?.message || 'Failed to send message.';
    }
}