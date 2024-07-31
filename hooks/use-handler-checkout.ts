import { useEffect, useState } from "react";
import useCart from "./use-cart";
import { Voucher } from "@/types";
import _http from "@/utils/http";

type CheckboxType = "send" | "store";
type PaymentType = "cod" | "bank" | "momo";

export default function useHandlerCheckout() {
  const cart = useCart();
  const [sendChecked, setSendChecked] = useState(true);
  const [storeChecked, setStoreChecked] = useState(false);
  const [payment, setPayment] = useState<PaymentType | null>("cod");

  const [code, setCode] = useState("");
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  const [error, setError] = useState("");

  const handlerFindVoucher = async () => {
    try {
      setError("");

      const response = await _http.post(`/Vouchers/Find`, {
        code: code,
      });

      if (response.status === 200) {
        setVoucher(response.data.voucher);
      }
    } catch (error) {
      setError("Voucher không tồn tại hoặc hết hạn!");
    }
  };

  const totalPrice = cart.totalPrice();
  const priceShipping = cart.totalPrice() + 35000;

  const finalPriceVoucher = voucher?.discount
    ? totalPrice - voucher.discount * 1000
    : totalPrice;

  const finalPriceShippingVoucher = voucher?.discount
    ? priceShipping - voucher.discount * 1000
    : priceShipping;

  const [finalPrice, setFinalPrice] = useState(finalPriceShippingVoucher);

  useEffect(() => {
    if (sendChecked) {
      setFinalPrice(finalPriceShippingVoucher);
    } else {
      setFinalPrice(finalPriceVoucher);
    }
  }, [sendChecked, finalPriceShippingVoucher, finalPriceVoucher]);

  const handleBankChange = (paymentType: PaymentType) => {
    setPayment((current) => (current === paymentType ? "cod" : paymentType));
  };

  const handleCheckboxChange = (checkboxType: CheckboxType) => {
    if (checkboxType === "send") {
      setSendChecked(true);
      setStoreChecked(false);
      setPayment("cod");
    } else if (checkboxType === "store") {
      setStoreChecked(true);
      setSendChecked(false);
      setPayment(null);
    }
  };

  return {
    sendChecked,
    storeChecked,
    finalPrice,
    totalPrice,
    payment,
    handleBankChange,
    handleCheckboxChange,
    handlerFindVoucher,
    code,
    error,
    voucher,
    setCode,
    setVoucher,
  };
}
