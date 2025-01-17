import { Logo } from "./logo";

type AuthModalProps = {
  children: React.ReactNode;
  width?: number;
  height?: number;
};

export const AuthModal = ({
  children,
  width = 400,
  height = 360,
}: AuthModalProps) => {
  return (
    <div
      className={`md:w-[${width}px] w-[${height}px] py-4 px-6 bg-white/90 rounded flex flex-col space-y-4`}
    >
      <Logo />
      <>{children}</>
    </div>
  );
};
