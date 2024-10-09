/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from "swr";
import _http from "@/utils/http";
import { ListReview } from "@/types/review";

type Props = {
  productId: string | null;
};

const fetcher = (url: string) => _http.get(url).then((res) => res.data);

export default function useReview({ productId }: Props) {
  const {
    data: reviews,
    isLoading: loading,
    error,
  } = useSWR<ListReview>(`/Reviews/Product/${productId}`, fetcher);

  if (error) console.log(error);

  const images = reviews?.result?.flatMap((review) => review.photos);

  return {
    reviews,
    images,
    loading,
  };
}
