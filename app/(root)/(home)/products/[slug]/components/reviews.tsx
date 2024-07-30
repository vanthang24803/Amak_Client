"use client";

import useReview from "@/hooks/use-fetch-reviews";
import { StarReview } from "./star-review";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Spinner } from "@/components/spinner";

type Props = {
  id: string | null;
};

export const Reviews = ({ id }: Props) => {
  const { images, loading, reviews } = useReview({
    productId: id,
  });
  return (
    <div className="w-full p-4 md:p-6 rounded-md bg-white flex flex-col">
      <h2 className="font-bold tracking-wide">Khách hàng đánh giá</h2>
      <>
        {!loading && reviews ? (
          <div className="py-4">
            {reviews.length > 0 ? (
              <div className="flex flex-col space-y-8 md:space-y-10">
                <div className="flex flex-col md:flex-row w-full space-y-4">
                  <StarReview reviews={reviews} />
                  <div className="w-[2px] h-[200px] bg-neutral-200 hidden md:block mx-4" />
                  <div className="px-4 hidden md:block">
                    <h2 className="font-semibold tracking-wide text-sm">
                      Tất cả hình ảnh ({images?.length})
                    </h2>
                    <div className="grid md:grid-cols-5 lg:grid-cols-6 gap-4 mt-2">
                      {images?.map((item) => (
                        <Link
                          href={item.url}
                          target="_bank"
                          key={item.id}
                          className="rounded-md w-[80px] h-[80px] object-cover hover:cursor-pointer bg-cover"
                          style={{
                            backgroundImage: `url(${item.url})`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Separator />
                {/* <ReviewFilter id={productId} /> */}
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col space-y-3 ">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/6381/6381554.png"
                  width={60}
                  height={60}
                  alt="icon"
                />
                <p className="text-center text-sm  tracking-tight">
                  Chưa có đánh giá nào cho sản phẩm này
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </>
    </div>
  );
};
