import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer/footer";
import { Container } from "@/components/layout/container";
import { Toaster } from "sonner";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sahha Now",
  description: "Your trusted healthcare partner",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        suppressHydrationWarning
        className={`${cairo.className} min-h-screen flex flex-col`}
      >
        <Toaster richColors />
        <Header />
        <Container>{children}</Container>
        <Footer />
      </body>
    </html>
  );
}
