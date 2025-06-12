'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

interface OTPVerificationProps {
  onSubmit: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading?: boolean;
  phoneNumber?: string;
  email?: string;
}

export function OTPVerification({ 
  onSubmit, 
  onResend, 
  isLoading = false, 
  phoneNumber, 
  email 
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && value) {
      onSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (canResend) {
      await onResend();
      setResendTimer(60);
      setCanResend(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          تأكيد رمز التحقق
        </h2>
        <p className="text-gray-600">
          لقد أرسلنا رمز التحقق إلى{' '}
          <span className="font-medium">
            {phoneNumber || email}
          </span>
        </p>
      </div>

      <div className="flex justify-center space-x-3 space-x-reverse">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            autoComplete="one-time-code"
          />
        ))}
      </div>

      <div className="text-center">
        {canResend ? (
          <button
            onClick={handleResend}
            disabled={isLoading}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            إعادة إرسال الرمز
          </button>
        ) : (
          <p className="text-gray-600">
            إعادة الإرسال خلال {resendTimer} ثانية
          </p>
        )}
      </div>

      <button
        onClick={() => onSubmit(otp.join(''))}
        disabled={isLoading || otp.some(digit => !digit)}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            تأكيد
            <ArrowRight className="mr-2 h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
