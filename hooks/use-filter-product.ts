import { useState } from "react";
import { FilterType, PriceType } from "@/types";

export default function useFilterProduct() {
  const [price, setPrice] = useState<PriceType | null>(null);
  const [filter, setFilter] = useState<FilterType | null>(null);

  const handlePriceFilter = (priceType: PriceType) => {
    setPrice((current) => (current === priceType ? null : priceType));
  };

  const handleFilter = (filterType: FilterType) => {
    setFilter((current) => (current === filterType ? null : filterType));
  };

  const reset = () => {
    setPrice(null);
    setFilter(null);
  };

  return { price, filter, handleFilter, handlePriceFilter, reset };
}
