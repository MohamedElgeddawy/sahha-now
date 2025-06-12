import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showLogo = true 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center" dir="rtl">
          {showLogo && (
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">صحة</span>
              </div>
            </div>
          )}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
