"use client";

import { ListReview } from "@/types";
import _http from "@/utils/http";
import { ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { ListFilterReview } from "./list-filter";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ReviewContent } from "./review-content";
import PaginationComponent from "@/components/pagination";

type Props = {
  id: string | null;
};

export const ReviewFilter = ({ id }: Props) => {
  const [status, setStatus] = useState("Lasted");
  const [star, setStar] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [_, setCurrentPage] = useState(1);

  const [reviews, setReviews] = useState<ListReview | null>(null);

  const fetchReviews = async (page: number = 1) => {
    if (id) {
      let URL = `/Reviews/Product/${id}?Status=${status}`;

      if (star) {
        URL += `&Star=${star}`;
      }

      try {
        setLoading(true);
        const response = await _http.get(URL, {
          params: {
            Page: page,
            Limit: 5,
          },
        });
        if (response.status === 200) {
          setReviews(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, star, status]);

  const handlePageChange = (page: number) => {
    fetchReviews(page);
  };

  const onChangeStatus = (status: string) => {
    setStatus(status);
  };
  const onChangeStar = (star: number | null) => {
    setStar(star);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold tracking-wide">Lọc theo</h2>
      <ListFilterReview
        onChangeStatus={onChangeStatus}
        onChangeStar={onChangeStar}
      />
      <Separator className="my-4" />
      {reviews && reviews.result.length > 0 ? (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-3">
            {reviews.result.map((item) => (
              <ReviewContent key={item.id} review={item} />
            ))}
          </div>
          {reviews && (
            <PaginationComponent
              currentPage={reviews._currentPage}
              totalPage={reviews._totalPage}
              onPageChange={handlePageChange}
            />
          )}
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
            Không tìm thấy nhận xét phù hợp.
          </p>
        </div>
      )}
    </div>
  );
};
