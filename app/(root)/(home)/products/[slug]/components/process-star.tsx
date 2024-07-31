"use client";

type Props = {
  percentage: number;
};

export const ProcessStar = ({ percentage }: Props) => {
  return (
    <div className="bg-neutral-200 rounded-full h-[4.75px] dark:bg-gray-700 w-[200px] mx-2">
      <div
        className="bg-sky-600 h-[4.75px] rounded-full"
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};
