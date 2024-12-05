/* eslint-disable @next/next/no-img-element */
"use client";

import { Product } from "@/types/product";
import { convertPrice, formatPrice } from "@/utils/price";
import { generateSlug } from "@/utils/slug";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Cart } from "../svg";
import { ProductModal } from "../modal/product-modal";
import useAuth from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Cart as CartType } from "@/types";
import { Fragment } from "react";

type Props = {
  product: Product;
};

export const Card = ({ product }: Props) => {
  const router = useRouter();
  const { isLogin } = useAuth();
  const { addToCart } = useCart();

  const dataSend = {
    productId: product.id,
    optionName: product.options[0]?.name,
    optionId: product.options[0]?.id,
    price: product.options[0]?.price,
    productName: product?.name,
    quantity: 1,
    sale: product.options[0]?.sale,
    thumbnail: product.thumbnail,
  } as CartType;

  return (
    <div className="w-full pb-4 bg-white rounded-sm hover:shadow-md hover:cursor-pointer flex flex-col overflow-hidden group lg:h-[60vh] md:h-[50vh] relative">
      <img
        src={product.thumbnail}
        alt={product.name}
        loading="lazy"
        title={product.name}
        className="md:h-[35vh] object-contain rounded-md  transform transition-transform duration-500 p-2 w-full"
      />
      <ProductModal id={product.id} />
      {!product.options[0]?.isActive && (
        <div className="absolute top-3 left-3  bg-neutral-700/80 rounded-md text-white flex items-center justify-center text-[10px] px-2 py-1 font-medium">
          Hết hàng
        </div>
      )}

      <div className="flex flex-col space-y-1 px-4">
        <span className="text-neutral-500 font-medium text-[11px]">
          {product.brand}
        </span>
        <p
          onClick={() => {
            router.push(`/products/${generateSlug(product.name, product.id)}`);
          }}
          className="font-semibold text-[13px] line-clamp-2"
        >
          {product.name}
        </p>
        <span className="text-neutral-500 font-medium text-[11px]">
          +{product.options.length} Phiên bản
        </span>

        <div className="flex items-center justify-between py-2">
          {product.options[0]?.sale > 0 ? (
            <div className="flex flex-col">
              <span className="font-bold text-[12px] text-red-600">
                {formatPrice(product.options[0].price, product.options[0].sale)}
                ₫
              </span>
              <span className="text-[12px] line-through">
                {convertPrice(product.options[0].price)}₫
              </span>
            </div>
          ) : (
            <span className="text-[12px] font-medium">
              {convertPrice(product.options[0]?.price)}₫
            </span>
          )}

          {product.options[0]?.sale > 0 && (
            <Button className="w-8 h-6 text-[11px] p-2" variant="destructive">
              -{product.options[0]?.sale}%
            </Button>
          )}
        </div>
        <Fragment>
          {isLogin && (
            <Fragment>
              {product.options[0]?.quantity > 0 ? (
                <div
                  className="my-2 flex items-center space-x-4 md:absolute md:bottom-4"
                  onClick={() => addToCart(dataSend)}
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-[#65b10d] rounded-full">
                    <Cart />
                  </div>
                  <span className="font-bold text-[11px] uppercase hover:text-[#65b10d]">
                    Thêm vào giỏ
                  </span>
                </div>
              ) : (
                <div className="my-2 flex items-center space-x-4 md:absolute md:bottom-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-neutral-300/90 rounded-full cursor-not-allowed">
                    <Cart />
                  </div>
                  <span className="font-bold text-[11px] uppercase text-neutral-400 cursor-not-allowed">
                    Hết hàng
                  </span>
                </div>
              )}
            </Fragment>
          )}
        </Fragment>
      </div>
    </div>
  );
};
