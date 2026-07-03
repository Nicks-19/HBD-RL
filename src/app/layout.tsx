import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import EasterEggs from "@/components/EasterEggs";
import MuteButton from "@/components/MuteButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Championship Season - Happy Birthday",
  description: "A premium Formula 1 themed birthday experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white">
        <SmoothScroll>{children}</SmoothScroll>
        <EasterEggs />
        <MuteButton />
      </body>
    </html>
  );
}
