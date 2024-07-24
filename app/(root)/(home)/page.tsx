"use client";

import useAuth from "@/hooks/use-auth";

export default function Home() {
  const { profile, isLogin } = useAuth();

  console.log(isLogin);

  return (
    <main>
      <p className="text-xl font-bold text-red-500">
        Hello World {profile?.avatar}
      </p>
    </main>
  );
}
