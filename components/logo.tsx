/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
export const Logo = () => {
  return (
    <Link href="/">
      <img src="/logo.png" className="w-auto h-10 object-cover" alt="logo" />
    </Link>
  );
};
