"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Turnstile from "react-turnstile";
import { useState } from "react";
import _http from "@/utils/http";
import { Order, Response } from "@/types";

const formSchema = z.object({
  order: z.string().min(1, {
    message: "Mã đơn hàng không được để trống!",
  }),
});

type Props = {
  onSearchResult: (result: Order | null) => void;
};

export const SearchForm = ({ onSearchResult }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      order: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (token) {
      try {
        setLoading(true);
        const response = await _http.get(`/Orders/${values.order}`);

        if (response.status === 200) {
          onSearchResult(response.data.result);
        }
      } catch (error) {
        console.log(error);
        onSearchResult(null);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-2 "
      >
        <CardHeader>
          <CardTitle className="uppercase font-bold text-lg md:text-xl">
            Tra cứu thông tin đơn hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Nhập mã đơn hàng"
                        className={`pl-10 w-[300px] md:w-[600px] lg:w-[800px] rounded`}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Turnstile
            className="flex items-center justify-center"
            sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY ?? ""}
            onVerify={(token) => setToken(token)}
          />

          <div className=" flex items-center justify-center">
            <Button variant="primary" className="w-[200px]" disabled={loading}>
              Tra cứu ngay
              <ArrowRight className="h-4 w-4 " />
            </Button>
          </div>
        </CardContent>
      </form>
    </Form>
  );
};
