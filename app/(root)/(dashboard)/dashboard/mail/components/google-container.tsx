"use client";

import { fetchGoogleConfig } from "@/services/api/configuration";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../_components/loading";
import { FormProvider, useForm } from "react-hook-form";
import InputPassword from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import { validateGoogleConfig } from "@/validations/configuration";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type CreateFormValue = z.infer<typeof validateGoogleConfig>;

export const GoogleContainer = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`dashboard-google-settings`],
    queryFn: () => fetchGoogleConfig(),
  });

  const [update, setUpdate] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(validateGoogleConfig),
    defaultValues: {
      clientId: "",
      clientSecret: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("clientId", data.clientId);
      form.setValue("clientSecret", data.clientSecret);
    }
  }, [form, data]);

  if (isLoading) return <Loading />;

  const onSubmit = (data: CreateFormValue) => {
    try {
      setUpdate(true);

      const handleUpdate = _http.post(`/Configuration/Google`, data);

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
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="clientId"
          disabled={update}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <Label>Client Id</Label>
                  <Input {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientSecret"
          disabled={update}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword {...field} label="Client Secret" />
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
