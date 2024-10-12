"use client";

import useReview from "@/hooks/use-fetch-reviews";
import { StarReview } from "./star-review";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/spinner";
import { ReviewFilter } from "./review-filter";
import { ListImage } from "./list-image-review";
import { ReviewNotFound } from "./review-notfound";
import { Review } from "@/types";
import { useEffect, useState } from "react";
import _http from "@/utils/http";
import { AIResponse } from "@/types/ai-response";
import { ReviewAI } from "./review-ai";

type Props = {
  id: string | null;
};

export const Reviews = ({ id }: Props) => {
  const { images, loading, reviews } = useReview({
    productId: id,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchAIReview = async (jsonSend: Review[]) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await _http.post<AIResponse>(`/Gemini/Review`, {
        prompt: jsonSend,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("AI Không phản hồi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (reviews) {
      fetchAIReview(reviews.result);
    }
  }, [reviews]);

  return (
    <div className="w-full p-4 md:p-6 rounded-md bg-white flex flex-col">
      <h2 className="font-bold tracking-wide">Khách hàng đánh giá</h2>
      <Separator className="mt-4" />
      <>
        {!loading && reviews ? (
          <div className="py-4">
            {reviews.result.length > 0 ? (
              <div className="flex flex-col space-y-8 md:space-y-10">
                <div className="flex flex-col md:flex-row w-full space-y-4">
                  <StarReview reviews={reviews} />
                  <div className="w-[2px] h-[200px] bg-neutral-200 hidden md:block mx-4" />

                  <div className="flex flex-col gap-2 px-4 md:w-[55%]">
                    {error ? (
                      <p className="text-[12px] tracking-tighter font-semibold">
                        {error}
                      </p>
                    ) : (
                      <ReviewAI isLoading={isLoading} message={message} />
                    )}

                    <Separator />

                    <ListImage images={images ?? []} />
                  </div>
                </div>
                <Separator />
                <ReviewFilter id={id} />
              </div>
            ) : (
              <ReviewNotFound />
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
