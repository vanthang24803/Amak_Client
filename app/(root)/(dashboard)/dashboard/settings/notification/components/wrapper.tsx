"use client";

import Tiptap from "@/components/tiptap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { fetchAnalyticAccounts } from "@/services/api/account";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import MultiSelectDropdown from "./select-user";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import _http from "@/utils/http";
import { toast } from "sonner";

const FormSchema = z.object({
  content: z.string().min(1, {
    message: "Không được bỏ trống",
  }),
  isGlobal: z.boolean(),
  url: z.string().optional(),
  users: z.string().array().optional(),
});

export const Wrapper = () => {
  const [isGlobal, setIsGlobal] = useState(true);
  const [loading, setLoading] = useState(false);

  const { data } = useQuery({
    queryKey: [`dashboard-analytic-accounts`],
    queryFn: () => fetchAnalyticAccounts(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      isGlobal: isGlobal,
      url: "",
      users: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const userJsonSend = data.users?.map((user) => ({ id: user }));

    const jsonSend = {
      ...data,
      users: userJsonSend,
    };

    try {
      setLoading(true);

      const res = await _http.post(`/Notifications/Global`, jsonSend);

      if (res.status === 201) {
        toast.success("Tạo thông báo thành công");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base tracking-tighter">
          Tạo thông báo mới
        </CardTitle>
        <CardDescription className="text-[13px]">
          Điền đầy đủ thông tin để khởi tạo một thông báo mới
        </CardDescription>
        <CardContent className="mb-20">
          <FormProvider {...form}>
            <form
              className="flex flex-col gap-4 py-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                disabled={loading}
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="text-sm font-medium  leading-none tracking-tighter">
                        Nội dung
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Tiptap
                        {...field}
                        description={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="text-sm font-medium  leading-none tracking-tighter">
                        Link
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isGlobal"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium leading-none tracking-tighter">
                          Thông báo toàn cục
                        </p>
                        <Switch
                          checked={field.value}
                          disabled={loading}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setIsGlobal(checked);
                          }}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {!isGlobal && (
                <FormField
                  control={form.control}
                  name="users"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="text-sm font-medium leading-none tracking-tighter">
                          Chọn người dùng
                        </p>
                      </FormLabel>
                      <FormControl>
                        <MultiSelectDropdown
                          users={data?.data.result}
                          selectedUsers={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex items-center justify-end">
                <Button variant="mix" className="h-8" disabled={loading}>
                  Xác nhận
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
