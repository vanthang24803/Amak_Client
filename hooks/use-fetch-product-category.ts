import { env } from '@/configs/env';
import { FilterType, PriceType, Product } from '@/types';
import { useState, useEffect } from 'react';

type Props = {
  price: PriceType | null;
  filter: FilterType | null;
  category?: string | undefined;
  status?: string | undefined;
};

export default function useProductByCategory({
  price,
  filter,
  category,
  status,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    let url = `${env.NEXT_PUBLIC_API_URL}/Products?SortBy=${price}&OrderBy=${filter}&Page=${currentPage}`;
    if (category) {
      url += `&Category=${category}`;
    }

    if (status) {
      url += `&Action=${status}`;
    }

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => setData(data))
      .catch((error) =>
        console.error(
          'There has been a problem with your fetch operation: ',
          error
        )
      );
  }, [price, filter, currentPage, category, status]);

  const pageCount = data ? Math.ceil(data.length / 15) : 0;
  const currentData = data
    ? data.slice((currentPage - 1) * 15, currentPage * 15)
    : [];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    currentPage,
    data,
    pageCount,
    currentData,
    handlePageChange,
  };
}
