import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { AuthWrapper } from "../components/AuthWrapper";
import { CartSyncManager } from "../components/CartSyncManager";
import Navbar from "../components/Navbar";
import { Footer } from "../components/ui/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CartFlow | Modern Shopping Experience",
  description: "A production-ready Full Stack Shopping Cart System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#F8FAFC] min-h-screen text-[#0F172A]`} suppressHydrationWarning>
        <Providers>
          <AuthWrapper>
            <CartSyncManager />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="bottom-right" />
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}
