import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WhatsAppBubble } from "@/components/WhatsAppBubble";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kerala Green Haven Tours | Best Kerala Holiday Packages",
  description:
    "Authorized local tour operator in Kerala, India. Customized holiday packages for Munnar, Alleppey Houseboats, Wayanad, Kovalam, and Ayurveda Retreats.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        {children}
        <WhatsAppBubble phone="+919876543210" message="Hello! I am interested in Kerala tour packages and custom itineraries." />
      </body>
    </html>
  );
}
