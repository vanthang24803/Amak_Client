import { Logo } from "./logo";

type AuthModalProps = {
  children: React.ReactNode;
};

export const AuthModal = ({ children }: AuthModalProps) => {
  return (
    <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded flex flex-col space-y-4">
      <Logo />
      <>{children}</>
    </div>
  );
};
