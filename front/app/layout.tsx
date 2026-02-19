import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { ModalRenderer } from "@/components/modals/ModalRenderer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ClinicDoc | Modern Healthcare Management",
  description: "A professional medical clinic management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-slate-800 bg-slate-50 overflow-hidden`}>
        <ModalProvider>
          {children}
          <ModalRenderer />
        </ModalProvider>
      </body>
    </html>
  );
}
