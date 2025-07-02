/**
 * LoadingDemo Component - Showcases all modern loading animations
 * This component demonstrates the various loading animations available
 */

import React from "react";
import {
  LoadingComponent,
  CardLoading,
  InlineLoading,
  OverlayLoading,
  ProfileLoadingMessages,
} from "./LoadingComponent";

export function LoadingDemo() {
  return (
    <div className="space-y-12 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🎨 Modern Loading Animations Showcase
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Explore our collection of beautiful, modern loading animations
          designed for the Sahha Now pharmacy app. Each animation is optimized
          for performance and user experience.
        </p>

        {/* Animation Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Particles Animation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              🌟 Particles
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Canvas-based animation with connected moving particles
            </p>
            <LoadingComponent
              animation="particles"
              size="lg"
              message="جاري التحميل..."
              className="h-32"
            />
          </div>

          {/* Wave Animation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              🌊 Wave
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Expanding circles with wave effect
            </p>
            <LoadingComponent
              animation="wave"
              size="lg"
              message="جاري التحميل..."
              className="h-32"
            />
          </div>

          {/* Morphing Animation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              🔄 Morphing
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Shape-shifting gradient animation
            </p>
            <LoadingComponent
              animation="morphing"
              size="lg"
              message="جاري التحميل..."
              className="h-32"
            />
          </div>

          {/* Dots Animation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              ⚫ Dots
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Animated dots with scale and opacity changes
            </p>
            <LoadingComponent
              animation="dots"
              size="lg"
              message="جاري التحميل..."
              className="h-32"
            />
          </div>

          {/* Pulse Animation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              💓 Pulse
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Pulsing gradient circle
            </p>
            <LoadingComponent
              animation="pulse"
              size="lg"
              message="جاري التحميل..."
              className="h-32"
            />
          </div>

          {/* Skeleton Animation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              🦴 Skeleton
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Content placeholder animation
            </p>
            <LoadingComponent
              animation="skeleton"
              size="lg"
              message="جاري التحميل..."
              className="h-32"
            />
          </div>
        </div>

        {/* Size Variants */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            📏 Size Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <h4 className="font-semibold mb-4 text-gray-700">Small</h4>
              <LoadingComponent animation="morphing" size="sm" />
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-4 text-gray-700">Medium</h4>
              <LoadingComponent animation="morphing" size="md" />
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-4 text-gray-700">Large</h4>
              <LoadingComponent animation="morphing" size="lg" />
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-4 text-gray-700">Extra Large</h4>
              <LoadingComponent animation="morphing" size="xl" />
            </div>
          </div>
        </div>

        {/* Specialized Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Card Loading */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              🃏 Card Loading
            </h2>
            <p className="text-gray-600">
              Perfect for loading entire sections or tabs
            </p>
            <CardLoading
              message={ProfileLoadingMessages.orders}
              animation="wave"
            />
          </div>

          {/* Inline Loading */}
          <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              ➡️ Inline Loading
            </h2>
            <p className="text-gray-600">
              Great for buttons and inline elements
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">
                  Button Loading:
                </span>
                <InlineLoading
                  message={ProfileLoadingMessages.saving}
                  animation="dots"
                  size="sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">
                  Form Submission:
                </span>
                <InlineLoading
                  message={ProfileLoadingMessages.updating}
                  animation="pulse"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Messages */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            💬 Arabic Loading Messages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ProfileLoadingMessages).map(([key, message]) => (
              <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-600 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
                <div className="text-gray-800 font-medium">{message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Examples */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            🔧 Implementation Examples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Profile Component
              </h3>
              <pre className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                {`if (isLoading) {
  return (
    <CardLoading 
      message={ProfileLoadingMessages.orders}
      animation="wave" 
    />
  );
}`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Button Loading
              </h3>
              <pre className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                {`{isPending ? (
  <InlineLoading 
    message={ProfileLoadingMessages.saving}
    animation="dots"
    size="sm"
  />
) : "حفظ التعديلات"}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingDemo;
