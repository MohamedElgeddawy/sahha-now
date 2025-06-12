'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validatePhoneNumber = (phone: string) => /^5[0-9]{8}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('يرجى إدخال رقم جوال صحيح');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store phone number for OTP verification
      sessionStorage.setItem('phoneNumber', phoneNumber);
      sessionStorage.setItem('resetPassword', 'true');
      
      toast.success('تم إرسال رمز التحقق بنجاح');
      router.push('/auth/otp-verification');
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال رمز التحقق');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <span>الرئيسية</span>
            <span className="mx-1">&lt;</span>
            <span>حسابي</span>
          </div>
          <div className="text-lg font-bold text-green-600">صحة ناو</div>
        </div>

        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              نسيت كلمة المرور؟
            </h1>
            <p className="text-gray-500 text-sm">
              أدخل رقم جوالك وسنرسل لك رمز التحقق لإعادة تعيين كلمة المرور
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                رقم الجوال
              </label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="يرجى إدخال رقم الجوال"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="pr-12 h-12 text-base border-2 focus:border-green-500"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  +966
                </div>
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-green-500 hover:bg-green-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                'إرسال رمز التحقق'
              )}
            </Button>

            <div className="text-center">
              <Link href="/" className="text-sm font-medium text-green-500 hover:text-green-600 hover:underline">
                العودة إلى صفحة تسجيل الدخول
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
} 