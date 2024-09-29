import Link from "next/link";
import { MoveLeft } from "lucide-react";

type Props = {
  path: string;
};

export const ArrowBack = ({ path }: Props) => {
  return (
    <Link
      href={path}
      className="text-neutral-500 flex items-center space-x-1 font-medium scroll-m-20 text-[12px] hover:text-neutral-600 group"
    >
      <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition ease-in-out" />
      <p>Quay lại</p>
    </Link>
  );
};
