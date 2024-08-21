import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/configs/site";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { ChatProvider } from "@/components/providers/chat-provider";

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
        <ModalProvider />
        <ChatProvider />
        <body>{children}</body>
      </SocketProvider>
    </html>
  );
}
