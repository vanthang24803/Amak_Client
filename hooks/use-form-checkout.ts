import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import _http from "@/utils/http";
import { checkOutValidation } from "@/validations/checkout";
import { PaymentType } from "@/app/(root)/(checkout)/checkout/components/payment";
import { Momo } from "@/types";
import { useCart } from "./use-cart";

type Props = {
  email: string | undefined;
  name: string | undefined;
  storeChecked: boolean;
  address: string | null;
  exitAddress: string | null;
  payment: PaymentType | null;
  sendChecked: boolean;
  voucher: string;
  totalPrice: number;
  numberPhone: string | undefined;
};

type CreateFormValue = z.infer<typeof checkOutValidation>;

export default function useFormCheckOut({
  email,
  name,
  storeChecked,
  address,
  exitAddress,
  payment,
  sendChecked,
  voucher,
  totalPrice,
  numberPhone,
}: Props) {
  const router = useRouter();
  const { totalItems, data: cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const priceShip = totalPrice + 35000;

  const uuid = uuidv4();

  const form = useForm({
    resolver: zodResolver(checkOutValidation),
    defaultValues: {
      email: "",
      address: "",
      name: "",
      numberPhone: "",
    },
  });

  useEffect(() => {
    form.setValue("email", email || "");
    form.setValue("name", name || "");
    form.setValue("address", (storeChecked ? address : exitAddress) || "");
    form.setValue("numberPhone", numberPhone || "");
  }, [address, email, exitAddress, form, name, numberPhone, storeChecked]);

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      ...data,
      id: uuid,
      customer: data.name,
      products: cart.map((item) => ({
        optionId: item.optionId,
        productId: item.productId,
        productName: item.productName,
        thumbnail: item.thumbnail,
        optionName: item.optionName,
        price: item.price,
        sale: item.sale,
        quantity: item.quantity,
      })),
      voucher: voucher,
      payment: payment?.toUpperCase(),
      shipping: sendChecked,
      quantity: totalItems,
      totalPrice: totalPrice,
    };

    if (payment == "cod") {
      try {
        setLoading(true);
        const response = await _http.post(`/Orders`, dataSend);
        if (response.status == 201) {
          toast.success("Thành công");
          router.push(`/checkout/${uuid}`);
          clearCart();
        } else {
          toast.error("Thất bại");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (payment == "momo") {
      try {
        setLoading(true);
        const response = await _http.post(`/Payment/Momo`, dataSend);
        if (response.status == 201) {
          toast.success("Thành công");
          const data = JSON.parse(response.data.result) as Momo;
          router.push(`${data.payUrl}`);
        } else {
          toast.error("Thất bại");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return { form, onSubmit, loading, priceShip };
}
