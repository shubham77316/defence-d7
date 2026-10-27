import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono, Anton, Oxanium, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap"
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  display: "swap"
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Sky Wardens — Sovereign Aerospace & Defence Engineering Group",
  description:
    "Sky Wardens architects and manufactures sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
  keywords: [
    "Sky Wardens",
    "Defence Engineering",
    "Aerospace Systems",
    "UAV Platforms",
    "Advanced Systems",
    "Petrochemical",
    "Sovereign Capability",
    "B2G Defence"
  ],
  authors: [{ name: "Sky Wardens Strategic Systems" }]
};

import { SettingsProvider } from "@/context/SettingsContext";
import { NavigationProvider } from "@/context/NavigationContext";
import SmoothScroll from "@/components/common/SmoothScroll";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${jakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${anton.variable} ${oxanium.variable} ${orbitron.variable}`}>
      <body className="bg-[#020408] text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-sky-500 selection:text-slate-950">
        <SmoothScroll>
          <SettingsProvider>
            <NavigationProvider>
              <Navbar />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </NavigationProvider>
          </SettingsProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
