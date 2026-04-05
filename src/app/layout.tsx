import type { Metadata } from "next";
import { NetworkCanvasBackground } from "@/features/resume/NetworkCanvasBackground";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-enterprise-logo",
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Ruben Isaac Lopez Peña | FullStack Software Engineer — Java, React, Node, IAM",
  description:
    "FullStack Software Engineer. Java, React, Node, IAM. Secure, event-driven systems at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark w-full max-w-full overflow-x-hidden">
      <body
        className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable} font-sans w-full max-w-full min-w-0 overflow-x-hidden`}
      >
        <NetworkCanvasBackground />
        <div className="noise-overlay fixed inset-0 z-[1]" aria-hidden />
        <div className="relative z-[2] isolate min-w-0 max-w-full overflow-x-hidden [transform:translateZ(0)]">
          {children}
        </div>
      </body>
    </html>
  );
}
