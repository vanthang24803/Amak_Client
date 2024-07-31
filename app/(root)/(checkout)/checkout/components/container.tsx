"use client";

import Link from "next/link";
import { MobileCart } from "./mobile-cart";
import { ChevronRight } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import { useState } from "react";
import useHandlerCheckout from "@/hooks/use-handler-checkout";
import { Cart } from "./cart";
import useClient from "@/hooks/use-client";

import { FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useFormCheckOut from "@/hooks/use-form-checkout";
import { Input } from "@/components/ui/input";
import { Method } from "./method";
import { Payment } from "./payment";
import { Button } from "@/components/ui/button";
import { Auth } from "./auth";

export const Container = () => {
  const { profile } = useAuth();
  const { isClient } = useClient();
  const [exitAddress, setAddress] = useState(
    profile?.addresses.filter((address) => address.isActive)[0].name || ""
  );

  const {
    payment,
    storeChecked,
    sendChecked,
    handleBankChange,
    handleCheckboxChange,
    handlerFindVoucher,
    setCode,
    setVoucher,
    totalPrice,
    finalPrice,
    code,
    error,
    voucher,
  } = useHandlerCheckout();

  const { form, loading, onSubmit } = useFormCheckOut({
    email: profile?.email,
    name: `${profile?.firstName} ${profile?.lastName}`,
    address:
      profile?.addresses.filter((address) => address.isActive)[0].name || "",
    storeChecked,
    exitAddress,
    payment,
    sendChecked,
    voucher: code,
    totalPrice: finalPrice,
  });

  if (!isClient) return null;

  return (
    <div className="flex flex-col lg:flex-row lg:px-44 lg:space-x-8">
      <div className="flex flex-col space-y-3 p-8">
        <Link href={`/`} className="font-bold text-2xl">
          AMAK Store
        </Link>

        <MobileCart
          ship={sendChecked}
          setCode={setCode}
          error={error}
          handlerFindVoucher={handlerFindVoucher}
          setVoucher={setVoucher}
          voucher={voucher}
          totalPrice={totalPrice}
          priceShip={totalPrice + 35000}
        />

        <div className="flex items-center space-x-3 text-[12px] text-neutral-500 font-medium">
          <Link href={`/cart`}>Giỏ hàng</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Thông tin giao hàng</span>
        </div>
        <span className="font-bold stext-xl">Thông tin giao hàng</span>

        <Auth />

        <FormProvider {...form}>
          <form
            className="w-full lg:w-[500px] flex flex-col space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Họ và tên"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Số điện thoại"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Method
              setAddress={setAddress}
              handleCheckboxChange={handleCheckboxChange}
              sendChecked={sendChecked}
              storeChecked={storeChecked}
            />

            <Payment
              finalPrice={finalPrice}
              payment={payment}
              handleBankChange={handleBankChange}
            />

            <div className="flex justify-between text-sm">
              <Link href={`/cart`}>Giỏ hàng</Link>

              <Button type="submit" variant="primary" disabled={loading}>
                Hoàn tất đơn hàng
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>

      <Cart
        ship={sendChecked}
        setCode={setCode}
        error={error}
        handlerFindVoucher={handlerFindVoucher}
        setVoucher={setVoucher}
        voucher={voucher}
        totalPrice={totalPrice}
        priceShip={totalPrice + 35000}
      />
    </div>
  );
};
