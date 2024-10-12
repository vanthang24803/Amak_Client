"use client";

import { fetchMailConfig, fetchMomoConfig } from "@/services/api/configuration";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../_components/loading";
import { FormProvider, useForm } from "react-hook-form";
import InputPassword from "@/components/ui/input-password";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  validateMailConfig,
  validateMomoConfig,
} from "@/validations/configuration";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import _http from "@/utils/http";
import { toast } from "sonner";

type CreateFormValue = z.infer<typeof validateMomoConfig>;

export const MomoContainer = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`dashboard-momo-settings`],
    queryFn: () => fetchMomoConfig(),
  });

  const [update, setUpdate] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(validateMomoConfig),
    defaultValues: {
      partnerCode: "",
      returnUrl: "",
      ipnUrl: "",
      accessKey: "",
      secretKey: "",
      paymentUrl: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("partnerCode", data.partnerCode);
      form.setValue("returnUrl", data.returnUrl);
      form.setValue("ipnUrl", data.ipnUrl);
      form.setValue("accessKey", data.accessKey);
      form.setValue("secretKey", data.secretKey);
      form.setValue("paymentUrl", data.paymentUrl);
    }
  }, [form, data]);

  if (isLoading) return <Loading />;

  const onSubmit = (data: CreateFormValue) => {
    try {
      setUpdate(true);

      const handleUpdate = _http.post(`/Configuration/Momo`, data);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          refetch();
          return "Cập nhật thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log("Error updating product:", error);
    } finally {
      setUpdate(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4 w-full py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="partnerCode"
            disabled={update}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <Label>Partner Code</Label>
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="returnUrl"
            disabled={update}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <Label>Return Url</Label>
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="paymentUrl"
          disabled={update}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <Label>Payment Url</Label>
                  <Input {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ipnUrl"
          disabled={update}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword {...field} label="Ipn Url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="accessKey"
            disabled={update}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword {...field} label="Access Key" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secretKey"
            disabled={update}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword {...field} label="Secret Key" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end ">
          <Button variant="mix" className="w-[120px]" disabled={update}>
            {update ? <Loader className="w-4 h-4 animate-spin" /> : "Xác nhận"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
