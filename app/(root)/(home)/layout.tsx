import { Quicksand } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ChatProvider } from "@/components/providers/chat-provider";

const font = Quicksand({ subsets: ["latin"] });

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <ModalProvider />
        <ChatProvider />
        <div className="bg-[#f2f3f5]  mt-14">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
