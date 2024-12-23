"use client";

import { useState, useEffect } from "react";

type Props = {
  endDate: string;
};

export const Countdown = ({ endDate }: Props) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-yellow-300 flex items-center justify-center rounded flex-col">
        <h3 className="font-bold text-[18px]">{timeLeft.days}</h3>
        <span className="text-[10px]">Ngày</span>
      </div>
      <div className="w-9 h-11 bg-yellow-300 flex items-center justify-center rounded flex-col">
        <h3 className="font-bold text-[18px]">{timeLeft.hours}</h3>
        <span className="text-[10px]">Giờ</span>
      </div>
      <div className="w-9 h-11 bg-yellow-300 flex items-center justify-center rounded flex-col">
        <h3 className="font-bold text-[18px]">{timeLeft.minutes}</h3>
        <span className="text-[10px]">Phút</span>
      </div>
      <div className="w-9 h-11 bg-yellow-300 flex items-center justify-center rounded flex-col">
        <h3 className="font-bold text-[18px]">{timeLeft.seconds}</h3>
        <span className="text-[10px]">Giây</span>
      </div>
    </div>
  );
};
