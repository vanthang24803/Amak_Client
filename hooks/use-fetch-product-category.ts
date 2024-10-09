import useSWR from "swr";
import { env } from "@/configs/env";
import { FilterType, PriceType, Product } from "@/types";
import { useState } from "react";

type Props = {
  price: PriceType | null;
  filter: FilterType | null;
  category?: string | undefined;
  status?: string | undefined;
};

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

export default function useProductByCategory({
  price,
  filter,
  category,
  status,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const url = `${env.NEXT_PUBLIC_API_URL}/Products?SortBy=${price}&OrderBy=${filter}&Page=${currentPage}${
    category ? `&Category=${category}` : ""
  }${status ? `&Action=${status}` : ""}`;

  const { data, error } = useSWR<Product[]>(url, fetcher);

  const pageCount = data ? Math.ceil(data.length / 15) : 0;
  const currentData = data
    ? data.slice((currentPage - 1) * 15, currentPage * 15)
    : [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    currentPage,
    data: currentData,
    pageCount,
    handlePageChange,
    isLoading: !error && !data,
    isError: error,
  };
}
