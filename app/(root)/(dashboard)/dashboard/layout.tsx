import { Inter } from "next/font/google";
import { SidebarDashboard } from "./_components/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Warning } from "./_components/waring-layout";
const font = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${font.className}`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="lg:block hidden">
          <SidebarDashboard>{children}</SidebarDashboard>
        </div>
        <Warning />
      </ThemeProvider>
    </body>
  );
}
