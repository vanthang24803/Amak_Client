"use client";

import { Card } from "@/components/ui/card";
import { SearchForm } from "./search-form";
import { NotFoundOrder } from "./not-found-order";

export const Wrapper = () => {
  return (
    <div className=" py-4 md:py-6 lg:py-8">
      <Card className="md:max-w-screen-xl mx-auto bg-white py-6 ">
        <SearchForm />
        {/* <NotFoundOrder /> */}
      </Card>
    </div>
  );
};
