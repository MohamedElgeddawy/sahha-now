import { RegisterFormData } from "../schemas/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function register(data: RegisterFormData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "حدث خطأ أثناء إنشاء الحساب");
  }

  return response.json();
}

export async function verifyOtp(phoneNumber: string, otp: string) {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, otp }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "حدث خطأ أثناء التحقق من الرمز");
  }

  return response.json();
}

export async function login(phoneNumber: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "حدث خطأ أثناء تسجيل الدخول");
  }

  return response.json();
}

export async function forgotPassword(phoneNumber: string) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "حدث خطأ أثناء إرسال رمز إعادة تعيين كلمة المرور"
    );
  }

  return response.json();
}

export async function resetPassword(
  phoneNumber: string,
  otp: string,
  newPassword: string
) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, otp, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور");
  }

  return response.json();
}
