"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { BillboardComponent } from "./billboard";
import { Categories } from "./categories";
import { BestSeller } from "./best-seller";
import { NewBook } from "./new-book";
import { Manga } from "./manga";
import Figures from "./figures";
import { Blogs } from "./blogs";
import useClient from "@/hooks/use-client";
import { Spinner } from "@/components/spinner";
import { FlashSale } from "./flash-sale";
import { Ticket } from "./ticket";

export const Wrapper = () => {
  const { isClient } = useClient();

  if (!isClient)
    return (
      <div className="w-full flex items-center justify-center h-svh">
        <Spinner />
      </div>
    );

  return (
    <main className="md:max-w-screen-xl mx-auto md:p-8 p-2 flex flex-col space-y-6 md:space-y-8">
      <BillboardComponent />
      <Categories />
      <FlashSale />
      <Ticket />
      <BestSeller />
      <Skeleton className="w-full h-10 bg-white" />
      <NewBook />
      <Manga />
      <Figures />
      <Blogs />
    </main>
  );
};
