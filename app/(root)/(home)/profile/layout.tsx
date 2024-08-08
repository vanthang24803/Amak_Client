import { Profile, Response } from "@/types";
import { Sidebar } from "./_components/side-bar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const cookieStore = cookies();
  const token = cookieStore.get("ac_token")?.value;

  if (!token) {
    redirect("/");
  }

  //   const profile =  await fetch(`${process.env.API_URL}/Me/Profile`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => res.json()) as Response<Profile>;

  return {
    title:
      //   `${profile.result.firstName} ${profile.result.lastName}` ||
      "Trang cá nhân",
  };
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex mt-14 bg-[#f2f3f5] md:py-8 py-4 md:max-w-screen-xl mx-auto">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}
