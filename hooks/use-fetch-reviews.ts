/* eslint-disable react-hooks/exhaustive-deps */
import { Review } from '@/types/review';
import _http from '@/utils/http';
import { useEffect, useState } from 'react';

type Props = {
  productId: string | null;
};

export default function useReview({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      if (productId) {
        const URL = `/api/product/${productId}/review`;

        try {
          setLoading(true);
          const response = await _http.get(URL);

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

    fetchReviews();
  }, [productId]);

  const images = reviews?.flatMap((review) => review.photos);

  return {
    reviews,
    images,
    loading,
  };
}
