import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setActive: Dispatch<SetStateAction<boolean>>;
};

export const RegisterSuccess = ({ setActive }: Props) => {
  const [counter, setCounter] = useState(60 * 3);

  useEffect(() => {
    if (counter === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCounter((currentCounter) => currentCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  const formatTime = () => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="py-8 flex items-center justify-center flex-col space-y-6">
      <Image src="/email-send.svg" alt="email-send" width={250} height={250} />
      <h1 className="text-center font-bold md:text-lg">
        {counter === 0
          ? 'Mã xác nhận đã hết hạn!'
          : `Mã xác nhận sẽ hết hạn sau ${formatTime()}`}
      </h1>

      <div className="flex items-center justify-center space-x-6 mt-8">
        <Button
          variant="primary"
          disabled={counter !== 0}
          onClick={() => setCounter(60 * 3)}
          className="w-[150px]"
          size="default"
        >
          Gửi lại mã xác nhận
        </Button>
      </div>
    </div>
  );
};
