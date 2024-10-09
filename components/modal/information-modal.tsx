"use client";

import { Option } from "@/types/options";
import { Product } from "@/types/product";
import { convertPrice, formatPrice } from "@/utils/price";
import { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { DialogTitle } from "../ui/dialog";
import { ShareModal } from "./share-modal";
import { Cart } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";

type Props = {
  product: Product;
};

export default function InformationModal({ product }: Props) {
  const router = useRouter();
  const { isLogin } = useAuth();

  const [total, setTotal] = useState(1);

  const [option, setOption] = useState<Option | undefined>(product?.options[0]);

  const { addToCart } = useCart();

  const handleOptionChange = (id: string) => {
    const newOption = product?.options.find((option) => option.id === id);
    setOption(newOption);
  };

  const dataSend = {
    optionId: option?.id,
    optionName: option?.name,
    price: option?.price,
    sale: option?.sale,
    productId: product.id,
    productName: product.name,
    quantity: total,
    thumbnail: product.thumbnail,
  } as Cart;

  const actionAddToCart = () => {
    if (!isLogin) router.push("/login");
    addToCart(dataSend);
  };

  return (
    <div className="flex flex-col space-y-2 p-4">
      <DialogTitle className="text-md font-bold tracking-tighter">
        {product?.name}
      </DialogTitle>
      <div className="text-[12px] tracking-tighter">
        Mã sản phẩm:{" "}
        <span className="text-[#417505] font-bold">{option?.id}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-[12px] tracking-tighter">
          Tình trạng:{" "}
          {option?.isActive ? (
            <span className="text-[#417505] font-bold">Còn hàng</span>
          ) : (
            <span className="text-[#417505] font-bold">Hết hàng</span>
          )}
        </div>
        <div className="text-[12px] tracking-tighter">
          Thuơng Hiệu:{" "}
          <span className="text-[#417505] font-bold">{product.brand}</span>
        </div>
      </div>

      <div className="flex items-center space-x-12 text-sm py-2">
        <span className="font-semibold">Giá:</span>
        <div className="flex items-center space-x-2">
          <span className="text-red-500 font-bold text-lg">
            {formatPrice(option?.price, option?.sale)}₫
          </span>
          {Number(option?.sale) > 0 && (
            <span className="text-neutral-400 text-md line-through">
              {convertPrice(option?.price)}₫
            </span>
          )}
        </div>
        {Number(option?.sale) > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="mx-2 border-red-500 hover:bg-transparent h-6 w-8 text-red-500 text-[11px] font-semibold hover:text-red-500"
          >
            -{option?.sale}%
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2 text-sm py-2">
        <span className="font-semibold">Tiêu đề:</span>
        <div className="flex items-center space-x-2">
          {product?.options.map((item, index) => (
            <Button
              variant={item.id === option?.id ? "primary" : "outline"}
              key={index}
              onClick={() => handleOptionChange(item.id)}
              className="rounded-sm h-8 px-3 py-4 text-[12px] tracking-tighter"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-8 text-sm py-4">
        <span className="font-semibold">Số lượng:</span>
        <div className="flex items-center space-x-2">
          {total > 0 ? (
            <Button
              className="rounded-sm w-7 h-7"
              size="icon"
              onClick={() => setTotal(total - 1)}
            >
              <Minus className="w-4 h-4 " />
            </Button>
          ) : (
            <Button
              size="icon"
              disabled
              variant="outline"
              className="font-medium"
            >
              <Minus className="w-4 h-4" />
            </Button>
          )}
          <Button disabled variant="outline" size="icon">
            {total}
          </Button>
          <Button
            size="icon"
            className="w-7 h-7 rounded-sm"
            onClick={() => setTotal(total + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {option?.isActive ? (
        <>
          {total > 0 ? (
            <Button
              variant="default"
              className="bg-[#417505] text-white font-medium  hover:bg-[#65b10d]"
              onClick={actionAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          ) : (
            <Button variant="secondary" className="cursor-not-allowed">
              Thêm vào giỏ hàng
            </Button>
          )}
        </>
      ) : (
        <Button variant="secondary" className="cursor-not-allowed">
          Thêm vào giỏ hàng
        </Button>
      )}

      {product && (
        <ShareModal id={product.id} name={product.name} isActive={true} />
      )}
    </div>
  );
}
