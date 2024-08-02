import { Card } from "@/components/card/cart-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import { Package2 } from "lucide-react";

type Props = {
  products: Product[] | undefined;
};

export const ProductContainer = ({ products }: Props) => {
  return (
    <>
      {products ? (
        <>
          {products.length != 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-1.5">
              {products?.map((item, index) => (
                <Card key={index} product={item} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="flex flex-col space-y-2 items-center py-8 text-sm">
                <Package2 className="w-20 h-20" />
                <span>Không có sản phẩm phù hợp</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              className="bg-white h-[30vh] md:h-[50vh] lg:h-[30vh] w-full max-w-[200px]"
              key={index}
            />
          ))}
        </div>
      )}
    </>
  );
};
