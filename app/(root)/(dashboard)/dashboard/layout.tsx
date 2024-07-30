import { Inter } from 'next/font/google';

const font = Inter({ subsets: ['latin'] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <body className={font.className}>{children}</body>;
}
