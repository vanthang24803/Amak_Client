import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  return { title: "Thanh toán" };
}

const CheckOutLayout = ({ children }: { children: React.ReactNode }) => {
  return <body className={font.className}>{children}</body>;
};

export default CheckOutLayout;
