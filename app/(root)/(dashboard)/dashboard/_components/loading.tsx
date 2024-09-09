import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <Loader className="w-4 h-4 animate-spin" />
    </div>
  );
};
