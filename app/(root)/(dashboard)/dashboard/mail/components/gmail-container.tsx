"use client";

import { fetchMailConfig } from "@/services/api/configuration";
import { Loading } from "../../_components/loading";
import { FormProvider, useForm } from "react-hook-form";
import InputPassword from "@/components/ui/input-password";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validateMailConfig } from "@/validations/configuration";
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

type CreateFormValue = z.infer<typeof validateMailConfig>;

export const GmailContainer = () => {
  const { data, isLoading } = useSWR(`/Mail/Config`, fetchMailConfig);

  const [update, setUpdate] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(validateMailConfig),
    defaultValues: {
      displayName: "",
      host: "",
      port: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("displayName", data.displayName);
      form.setValue("email", data.email);
      form.setValue("password", data.password);
      form.setValue("host", data.host);
      form.setValue("port", String(data.port));
    }
  }, [form, data]);

  if (isLoading) return <Loading />;

  const onSubmit = (data: CreateFormValue) => {
    const jsonSend = {
      ...data,
      port: Number(data.port),
    };

    try {
      setUpdate(true);

      const handleUpdate = _http.post(`/Configuration/Mail`, jsonSend);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          mutate(`/Mail/Config`);
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
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="displayName"
            disabled={update}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="host"
            disabled={update}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <Label>Host</Label>
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="port"
            disabled={update}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <Label>Port</Label>
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            disabled={update}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input {...field} type="email" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            disabled={update}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputPassword {...field} />
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
