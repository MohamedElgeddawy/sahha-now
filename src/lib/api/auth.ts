import { RegisterFormData } from "../schemas/auth";
import sahhaInstance from "./sahhaInstance";
export async function register(data: {
  fullname: string;
  email: string;
  age: number;
  mobile: string;
}) {
  const response = await sahhaInstance.post(`auth/register`, data);
  return response.data;
}

export async function verifyOtp(data: { mobile: string; otp: string }) {
  const response = await sahhaInstance.post(`auth/otp/verify`, data);
  return response.data as {
    exists: boolean;
    message: string;
    mobile: string;
  };
}

export async function generateOtp(data: { mobile: string }) {
  const response = await sahhaInstance.post(`auth/otp/send`, data);
  return response.data;
}
export async function login(data: { mobile: string; otp: string }) {
  const response = await sahhaInstance.post(`auth/login`, data);
  return response.data;
}

export async function forgotPassword(data: { mobile: string }) {
  const response = await sahhaInstance.post(`auth/forgot-password`, data);
  return response.data;
}

export async function resetPassword(data: {
  mobile: string;
  otp: string;
  newPassword: string;
}) {
  const response = await sahhaInstance.post(`auth/reset-password`, data);
  return response.data;
}
