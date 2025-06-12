'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Add your authentication logic here
      console.log('Login attempt:', { phoneNumber });
      
      // Navigate to OTP page
      setTimeout(() => {
        setIsLoading(false);
        router.push('/otp');
      }, 2000);
      
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    console.log(`${provider} login clicked`);
    // Add social login logic here
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center mb-6">
            <Link href="/" className="text-[#2C3E50] hover:underline">
              الرئيسية
            </Link>
            <span className="mx-2">›</span>
            <span className="text-[#2C3E50]">حسابي</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            {/* Page Title */}
            <h2 className="font-[Cairo] font-semibold text-base tracking-[0.5px] text-[#2C3E50] mb-6">
              يمكنك تسجيل الدخول عن طريق
            </h2>

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-6 mb-6">
              <Button 
                variant="outline" 
                className="w-[312px] h-[48px] text-base border border-[#DADADA] rounded-[8px] flex items-center justify-center gap-2 font-[Cairo]"
                type="button"
                onClick={() => handleSocialLogin('google')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <rect width="24" height="24" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M23.04 12.2605C23.04 11.445 22.9668 10.6609 22.8309 9.9082H12V14.3566H18.1891C17.9225 15.7941 17.1123 17.0121 15.8943 17.8275V20.713H19.6109C21.7855 18.7109 23.04 15.7627 23.04 12.2605Z" fill="#4285F4"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 23.5005C15.1049 23.5005 17.7081 22.4708 19.6108 20.7144L15.8942 17.829C14.8644 18.519 13.5472 18.9267 11.9999 18.9267C9.00467 18.9267 6.46945 16.9037 5.56513 14.1855H1.72308V17.1651C3.61536 20.9235 7.50445 23.5005 11.9999 23.5005Z" fill="#34A853"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.56523 14.1855C5.33523 13.4955 5.20455 12.7584 5.20455 12.0005C5.20455 11.2425 5.33523 10.5055 5.56523 9.81548V6.83594H1.72318C0.944318 8.38844 0.5 10.1448 0.5 12.0005C0.5 13.8562 0.944318 15.6125 1.72318 17.165L5.56523 14.1855Z" fill="#FBBC05"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 5.07386C13.6883 5.07386 15.2042 5.65409 16.396 6.79364L19.6944 3.49523C17.7029 1.63955 15.0997 0.5 11.9999 0.5C7.50445 0.5 3.61536 3.07705 1.72308 6.83545L5.56513 9.815C6.46945 7.09682 9.00468 5.07386 11.9999 5.07386Z" fill="#EA4335"/>
                </svg>
                تسجيل الدخول عن طريق جوجل
              </Button>

              <Button 
                variant="outline" 
                className="w-[312px] h-[48px] text-base border border-[#DADADA] rounded-[8px] flex items-center justify-center gap-2 font-[Cairo]"
                type="button"
                onClick={() => handleSocialLogin('apple')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <path d="M17.05 20.28c-.98.95-2.05.96-3.08.44-1.09-.54-2.08-.52-3.19.04-1.42.71-2.35.53-3.22-.44-4.34-4.92-3.83-12.47 1.03-12.74 1.37.07 2.31.74 3.13.74.76 0 2.17-.87 3.8-.74.65.03 2.47.26 3.64 1.98-3.25 2.11-2.74 6.34.89 7.85-.72 1.94-1.63 3.01-3 3.87zM12.03 7.28c-.19-1.67.61-3.34 1.76-4.38 1.28.04 2.85 1.01 3.57 2.29.67 1.18.6 2.91-.17 4.27-1.26-.16-2.68-.94-3.34-2.08-.29-.47-.51-1.13-.57-1.85-.01-.08-.01-.17-.01-.25z" />
                </svg>
                تسجيل الدخول عن طريق آبل
              </Button>
            </div>

            {/* Divider */}
            <div className="relative w-[648px] my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-gray-50 px-3 text-gray-500 font-medium">أو</span>
              </div>
            </div>

            {/* Login Container */}
            <div className="w-[648px] bg-white border border-[#DADADA] rounded-[8px] p-8">
              {/* Login Form Section */}
              <div className="text-center mb-6">
                <h3 style={{ width: '382px', height: '45px', fontFamily: 'Cairo', fontWeight: 800, fontSize: '32px', lineHeight: '140%', letterSpacing: '0.5px', textAlign: 'right' }} className="mx-auto">
                  تسجيل الدخول إلى حسابك
                </h3>
                <p style={{ width: '377px', height: '22px', fontFamily: 'Cairo', fontWeight: 400, fontSize: '16px', lineHeight: '140%', letterSpacing: '0.5px', textAlign: 'right' }} className="mx-auto text-gray-600">
                  أدخل رقم جوالك وسنرسل لك رمز تحقق لتسجيل الدخول.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-right font-[Cairo]">
                    رقم الجوال
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="رجاء إدخال رقم الجوال"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-12 text-base text-right pl-16 font-[Cairo]"
                      dir="ltr"
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
                      +966
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-start">
                  <Checkbox id="remember" className="border-gray-400" />
                  <label htmlFor="remember" className="text-sm font-[Cairo] text-gray-600">
                    تذكرني
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="w-[184px] h-[48px] text-base text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors font-[Cairo] rounded-lg border-0"
                    disabled={isLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoading) {
                        router.push('/otp');
                      }
                    }}
                  >
                    {isLoading ? 'جاري الإرسال...' : 'أرسل رمز التحقق'}
                  </Button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600 font-[Cairo] text-[16px]">
                    ليس لديك حساب؟{' '}
                    <Link 
                      href="/signup" 
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors decoration-blue-600"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('/signup');
                      }}
                    >
                      أنشئ حساب الآن
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}