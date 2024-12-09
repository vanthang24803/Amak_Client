"use client";

import { Fragment, useState } from "react";
import { Card } from "@/components/ui/card";
import { SearchForm } from "./search-form";
import { NotFoundOrder } from "./not-found-order";
import { Order } from "@/types";
import { RenderOrder } from "./render-order";

export const Wrapper = () => {
  const [searchResult, setSearchResult] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchResult = (result: Order | null) => {
    setSearchResult(result);
    setHasSearched(true);
  };

  const handleReset = () => {
    setSearchResult(null);
    setHasSearched(false);
  };

  return (
    <div className="py-4 md:py-6 lg:py-8">
      <Card className="md:max-w-screen-xl mx-auto bg-white py-6">
        {!hasSearched ? (
          <SearchForm onSearchResult={handleSearchResult} />
        ) : (
          <Fragment>
            {searchResult ? (
              <RenderOrder data={searchResult} handleReset={handleReset} />
            ) : (
              <NotFoundOrder handleReset={handleReset} />
            )}
          </Fragment>
        )}
      </Card>
    </div>
  );
};
