"use client";

import { Card } from "@/components/card/cart-item";
import { ProductSkeleton } from "@/components/product-skeleton";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
  isLoading: boolean;
};

export const Products = ({ products, isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full h-[50vh] md:gap-8">
          {[...Array(5)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 w-full gap-2">
          {products.map((item) => (
            <Card key={item.id} product={item} />
          ))}
        </div>
      )}
    </>
  );
};
