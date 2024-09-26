import { Inter } from "next/font/google";
import { SidebarDashboard } from "./_components/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const font = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarDashboard>{children}</SidebarDashboard>
        </ThemeProvider>
      </body>
    </QueryProvider>
  );
}
