import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import Nav from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sunnychen.dev"),
  title: "Sunny Chen — Software Developer in Montreal",
  description: "Sunny Chen is a software developer based in Montreal. Building exceptional digital experiences with React, Next.js, TypeScript, and modern web technologies.",
  keywords: ["Sunny Chen", "software developer", "Montreal", "React", "Next.js", "TypeScript", "portfolio"],
  authors: [{ name: "Sunny Chen", url: "https://sunnychen.dev" }],
  creator: "Sunny Chen",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "KobL4Bgb3W3h6bDmlj1zxDD4AQjTaeF88NL28_dIONI",
  },
  openGraph: {
    title: "Sunny Chen — Software Developer in Montreal",
    description: "Sunny Chen is a software developer based in Montreal. Building exceptional digital experiences with React, Next.js, TypeScript, and modern web technologies.",
    url: "https://sunnychen.dev",
    siteName: "Sunny Chen",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunny Chen — Software Developer in Montreal",
    description: "Sunny Chen is a software developer based in Montreal. Building exceptional digital experiences with React, Next.js, TypeScript, and modern web technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <TooltipProvider>
          <Nav />
          {children}
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
