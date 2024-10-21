"use client";

import { fetchCloudinaryConfig } from "@/services/api/configuration";
import { Loading } from "../../_components/loading";
import { FormProvider, useForm } from "react-hook-form";
import InputPassword from "@/components/ui/input-password";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  validateCloudinaryConfig,
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
import useSWR, { mutate } from "swr";

type CreateFormValue = z.infer<typeof validateCloudinaryConfig>;

export const CloudinarySettings = () => {
  const { data, isLoading } = useSWR(
    `/Cloudinary/Config`,
    fetchCloudinaryConfig
  );

  const [update, setUpdate] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(validateCloudinaryConfig),
    defaultValues: {
      cloudName: "",
      apiKey: "",
      apiSecret: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("cloudName", data.cloudName);
      form.setValue("apiKey", data.apiKey);
      form.setValue("apiSecret", data.apiSecret);
    }
  }, [form, data]);

  if (isLoading) return <Loading />;

  const onSubmit = (data: CreateFormValue) => {
    try {
      setUpdate(true);

      const handleUpdate = _http.post(`/Configuration/Cloudinary`, data);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          mutate(`/Cloudinary/Config`);
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
        <FormField
          control={form.control}
          name="cloudName"
          disabled={update}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <Label>Cloud Name</Label>
                  <Input {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apiKey"
          disabled={update}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword {...field} label="API Key" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apiSecret"
          disabled={update}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword {...field} label="API Secret" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end ">
          <Button variant="mix" className="w-[120px]" disabled={update}>
            {update ? <Loader className="w-4 h-4 animate-spin" /> : "Xác nhận"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
