"use client";

import { Order, Pagination } from "@/types";
import useSWR, { mutate } from "swr";
import _http from "@/utils/http";
import { useState } from "react";

const fetcher = (url: string) => _http.get(url).then((res) => res.data);

export default function useFetchOrder() {
  const [select, setSelect] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isValidating } = useSWR(
    () => `/Orders?Limit=3&Page=${currentPage}&OrderBy=${select}`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const reloadData = async () => {
    await mutate(`/Orders?Limit=3&Page=${currentPage}&OrderBy=${select}`);
  };

  return {
    select,
    setSelect,
    currentPage,
    setCurrentPage,
    data: data as Pagination<Order[]>,
    reloadData,
    loading: isValidating,
    error,
  };
}
