"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/types";
import { Stars } from "./list-star";
import { starList } from "@/constants";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import { formatDateToNow } from "@/utils/date";

type Props = {
  review: Review;
};

export const ReviewContent = ({ review }: Props) => {
  const auth = useAuth();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <div className="lg:basis-1/3 basis-1/2">
          <div className="w-full flex md:flex-row flex-col items-center space-x-3">
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src={review.author.avatar} />
            </Avatar>
            <p className="text-sm font-semibold">
              {review.author.firstName} {review.author.lastName}
            </p>
          </div>
        </div>
        <div className="lg:basis-2/3 md:basis-1/2 flex flex-col space-y-3 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Stars stars={review.star} />
              <p className="text-sm font-semibold">{starList[review.star]}</p>
            </div>
          </div>

          <div
            className="text-sm my-4 tracking-tighter font-medium"
            dangerouslySetInnerHTML={{
              __html: review.content,
            }}
          />

          {review.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {review.photos.map((item) => (
                <Link
                  href={item.url}
                  target="_blank"
                  key={item.id}
                  className="rounded-sm w-[100px] h-[100px] object-center hover:cursor-pointer bg-cover"
                  style={{
                    backgroundImage: `url(${item.url})`,
                  }}
                />
              ))}
            </div>
          )}

          <span className="text-xs text-neutral-500 font-medium">
            {formatDateToNow(review.createAt)} trước
          </span>
        </div>
      </div>
      <Separator />
    </div>
  );
};
