import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { ModalRenderer } from "@/components/modals/ModalRenderer";
import { Toaster } from "react-hot-toast";
import { NotificationProvider } from "@/context/NotificationContext";
import HotKeyHandler from "@/components/HotKeyHandler";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ClinicDoc | Dr. Alexander Hayes — Private Practice",
  description: "Professional single-doctor clinic management system for Dr. Alexander Hayes, General Medicine & Family Care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-slate-800 bg-slate-50`}>
        <AuthProvider>
          <NotificationProvider>
            <ModalProvider>
              {children}
              <ModalRenderer />
              <HotKeyHandler />
              <Toaster position="top-right" />
            </ModalProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
