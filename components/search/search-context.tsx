/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Separator } from "../ui/separator";
import { Spinner } from "../spinner";
import { Product } from "@/types/product";
import { convertPrice, formatPrice } from "@/utils/price";
import { generateSlug } from "@/utils/slug";

export const SearchContent = ({
  content,
  product,
  search,
  loading,
}: {
  content: string;
  search: string | null;
  product: Product[];
  loading: boolean;
}) => {
  return (
    <div className="lg:w-[500px] md:w-[300px] lg:min-h-[20vh] min-h-[10vh] rounded-md bg-white dark:bg-neutral-700/90  p-4 md:absolute md:top-12 md:-right-2 shadow-lg">
      <p className="text-sm font-medium">Gợi ý cho bạn:</p>
      {content != "" && (
        <>
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {product.length > 0 ? (
                <div className="w-full h-auto my-2 text-sm flex flex-col space-y-2">
                  <div className="flex flex-col space-y-2">
                    {product.slice(0, 5).map((item, index) => (
                      <div className="flex flex-col space-y-2" key={index}>
                        <Link
                          href={`/products/${generateSlug(item.name, item.id)}`}
                          className="flex items-center justify-between"
                        >
                          <div className="flex flex-col space-y-1 lg:w-full w-2/3">
                            <span className="hover:text-[#65b10d] font-semibold lg:text-[13px] md:text-[12px] tracking-tighter">
                              {item.name}
                            </span>
                            <div className="flex items-center space-x-3">
                              <span className="font-medium">
                                {convertPrice(item.options[0].price)}₫
                              </span>
                              <span className="line-through text-neutral-500 text-xs">
                                {formatPrice(
                                  item.options[0].price,
                                  item.options[0].sale
                                )}
                                ₫
                              </span>
                            </div>
                          </div>
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="lg:w-[10%] w-[18%]"
                          />
                        </Link>
                        <Separator />
                      </div>
                    ))}
                  </div>
                  {product.length > 6 ? (
                    <Link
                      href={`/search/?product=${search}`}
                      className="flex items-center justify-center pt-1"
                    >
                      Xem thêm {product.length - 5} sản phẩm
                    </Link>
                  ): <span className="text-center text-[13.5px] font-medium pt-2">Có {product.length} kết quả tìm kiếm</span>}
                </div>
              ) : (
                <div className="flex items-center justify-center p-8">
                  <p className="text-sm font-medium text-neutral-600">
                    Không tìm thấy sản phẩm{" "}
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
