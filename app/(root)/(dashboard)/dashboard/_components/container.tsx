type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center h-auto m-4">
      <div className="w-full min-h-[80vh] max-w-[1180px] p-4 bg-white dark:bg-black shadow-md rounded-md flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};
