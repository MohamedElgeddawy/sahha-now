'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Apple, Chrome, Phone, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    if (!formData.fullName) {
      toast.error('يرجى إدخال الاسم الكامل');
      return false;
    }
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('يرجى إدخال بريد إلكتروني صحيح');
      return false;
    }
    
    if (!formData.phoneNumber || !/^5[0-9]{8}$/.test(formData.phoneNumber)) {
      toast.error('يرجى إدخال رقم جوال صحيح');
      return false;
    }
    
    if (!formData.password || formData.password.length < 8) {
      toast.error('يجب أن تتكون كلمة المرور من 8 أحرف على الأقل');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمات المرور غير متطابقة');
      return false;
    }
    
    if (!agreeTerms) {
      toast.error('يرجى الموافقة على الشروط والأحكام');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('تم إنشاء الحساب بنجاح');
      
        // Redirect to OTP verification
      sessionStorage.setItem('phoneNumber', formData.phoneNumber);
      router.push('/auth/otp-verification');
    } catch (error) {
      toast.error('حدث خطأ أثناء إنشاء الحساب');
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
          <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
            يمكنك التسجيل عن طريق
          </h1>

          {/* Social login buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button
              variant="outline"
              className="h-12 text-base font-medium border-2 hover:border-green-500 hover:bg-green-50"
              type="button"
            >
              <Apple className="ml-2 h-5 w-5" />
              <span>التسجيل عن طريق آبل</span>
            </Button>
            <Button
              variant="outline"
              className="h-12 text-base font-medium border-2 hover:border-green-500 hover:bg-green-50"
              type="button"
            >
              <Chrome className="ml-2 h-5 w-5 text-blue-500" />
              <span>التسجيل عن طريق جوجل</span>
            </Button>
          </div>
          
          {/* Separator */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm">أو</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">إنشاء حساب جديد</h2>
            <p className="text-gray-500 text-sm">
              أدخل البيانات التالية لإنشاء حساب جديد
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                الاسم الكامل
              </label>
              <div className="relative">
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pr-12 h-12 text-base border-2 focus:border-green-500"
                  required
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={formData.email}
                  onChange={handleChange}
                  className="pr-12 h-12 text-base border-2 focus:border-green-500"
                  required
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                رقم الجوال
              </label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="يرجى إدخال رقم الجوال"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="pr-12 h-12 text-base border-2 focus:border-green-500"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  +966
                </div>
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="أدخل كلمة المرور"
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-12 h-12 text-base border-2 focus:border-green-500"
                  required
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="أعد إدخال كلمة المرور"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pr-12 h-12 text-base border-2 focus:border-green-500"
                  required
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                أوافق على <Link href="/terms" className="text-green-500 hover:underline">الشروط والأحكام</Link> و <Link href="/privacy" className="text-green-500 hover:underline">سياسة الخصوصية</Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-green-500 hover:bg-green-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'جاري التسجيل...' : 'إنشاء حساب'}
            </Button>
          </form>

          {/* Login link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
          لديك حساب بالفعل؟{' '}
              <Link href="/" className="font-medium text-green-500 hover:text-green-600 hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
        </Card>
      </div>
    </div>
  );
}