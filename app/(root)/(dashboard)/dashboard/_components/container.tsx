type Props = {
  children: React.ReactNode;
};



export const Container = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full h-[80vh] max-w-screen-lg p-4 bg-white dark:bg-black shadow-md rounded-md flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};
