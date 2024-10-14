"use client";

import { fetchGeminiConfig } from "@/services/api/configuration";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../_components/loading";
import { FormProvider, useForm } from "react-hook-form";
import InputPassword from "@/components/ui/input-password";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validateGeminiConfig } from "@/validations/configuration";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CreateFormValue = z.infer<typeof validateGeminiConfig>;

export const GeminiConfig = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`dashboard-gemini-settings`],
    queryFn: () => fetchGeminiConfig(),
  });

  const [update, setUpdate] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(validateGeminiConfig),
    defaultValues: {
      apiKey: "",
      projectNumber: "",
      model: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("projectNumber", data.projectNumber);
      form.setValue("apiKey", data.apiKey);
      form.setValue("model", data.model);
    }
  }, [form, data]);

  if (isLoading) return <Loading />;

  const onSubmit = (data: CreateFormValue) => {
    try {
      setUpdate(true);

      const handleUpdate = _http.post(`/Configuration/Gemini`, data);

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg tracking-tighter">Cấu hình</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-4 w-full py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="projectNumber"
              disabled={update}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-2">
                      <Label>Project Number</Label>
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
              name="model"
              disabled={update}
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={update}
                    onValueChange={field.onChange}
                    value={field.value || data?.model}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gemini-1.5-pro">
                        Gemini 1.5 Pro
                      </SelectItem>
                      <SelectItem value="gemini-1.5-flash-latest">
                        Gemini 1.5 Flash Lasted
                      </SelectItem>
                      <SelectItem value="gemini-1.5-flash">
                        Gemini 1.5 Flash
                      </SelectItem>
                      <SelectItem value="gemini-1.5-flash-002">
                        Gemini 1.5 Flash 002
                      </SelectItem>
                      <SelectItem value="gemini-1.5-flash-8b">
                        Gemini 1.5 Flash 8B
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end ">
              <Button variant="mix" className="w-[120px]" disabled={update}>
                {update ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "Xác nhận"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
