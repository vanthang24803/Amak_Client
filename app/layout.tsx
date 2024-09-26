import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/configs/site";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SocketProvider>
        <ToasterProvider />
        <body>{children}</body>
      </SocketProvider>
    </html>
  );
}
