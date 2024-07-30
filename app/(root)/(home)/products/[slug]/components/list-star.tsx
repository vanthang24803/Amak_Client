"use client";

import Image from "next/image";
import OutlineStar from "@/public/star-outline.png";
import GoldenStar from "@/public/gold-star.png";

type Props = {
  stars: number;
  size?: number;
};

export const Stars = ({ stars, size = 16 }: Props) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {Array(stars)
          .fill(0)
          .map((_, index) => (
            <Image
              src={GoldenStar}
              width={size}
              height={size}
              alt="star"
              key={index}
            />
          ))}
      </div>
      <div className="flex items-center">
        {Array(5 - stars)
          .fill(0)
          .map((_, index) => (
            <Image
              src={OutlineStar}
              width={size}
              height={size}
              alt="star-outline"
              key={index}
            />
          ))}
      </div>
    </div>
  );
};
