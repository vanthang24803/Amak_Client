"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";
import { Product } from "@/types/product";
import _http from "@/utils/http";
import useSWR from "swr";

export default function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const [content, setContent] = useState(search || "");

  const [product, setProduct] = useState<Product[]>([]);

  const debounce = useDebounce(content);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const {
    data: products,
    isLoading: searchLoading,
    error,
  } = useSWR<Product[]>(`/Products?Name=${debounce}`);

  useEffect(() => {
    if (products && !searchLoading && !error) {
      setProduct(products);
    }
  }, [products, searchLoading, error]);

  useEffect(() => {
    const query = {
      search: content,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [router, content]);

  return { search, content, product, handleInputChange, router, searchLoading };
}
