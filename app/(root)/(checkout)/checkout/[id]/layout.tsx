import {  Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  return { title: "Thông tin đơn hàng" };
}


const Layout = ({ children }: { children: React.ReactNode }) => { 

  return (
    <body className={font.className}>
      <main className="h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center bg-cover">
      <>{children}</>
      </main>
    </body>
  );
};

export default Layout;
