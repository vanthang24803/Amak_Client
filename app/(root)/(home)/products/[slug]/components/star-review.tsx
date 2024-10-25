"use client";

import { ListReview, Review } from "@/types/review";
import { Stars } from "./list-star";
import { ProcessStar } from "./process-star";

type Props = {
  reviews: ListReview;
};

type StarStats = {
  [key: number]: {
    total: number;
    percentage: number;
  };
};

export const StarReview = ({ reviews }: Props) => {
  const starCount = Math.floor(Number(reviews.average_star));

  const starStats: StarStats = Array(5)
    .fill(0)
    .reduce((acc, _, index) => {
      const total = reviews.result.reduce(
        (sum, review) => sum + (review.star === index + 1 ? 1 : 0),
        0,
      );
      const percentage = (total / reviews.result.length) * 100;
      acc[index + 1] = { total, percentage };
      return acc;
    }, {});

  return (
    <div className="flex flex-col lg:basis-1/3 md:basis-1/2 ">
      <p className="font-bold tracking-wide text-sm">Tổng quan</p>
      <div className="flex items-center space-x-4 my-2">
        <p className="text-3xl font-bold">{reviews.average_star.toFixed(2)}</p>
        <Stars stars={starCount} size={22} />
      </div>
      <p className="text-xs font-medium tracking-tighter text-neutral-500">
        ({reviews.result.length} đánh giá)
      </p>
      <div className="flex flex-col space-y-2 pt-2">
        {Object.entries(starStats)
          .reverse()
          .map(([star, { total, percentage }]) => (
            <div key={star} className="flex items-center">
              <Stars stars={parseInt(star)} />
              <ProcessStar percentage={percentage} />
              <p className="text-xs text-neutral-600 font-bold">{total}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
