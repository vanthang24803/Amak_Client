"use client";

import { AuthModal } from "@/components/auth-model";
import { redirect, useRouter } from "next/navigation";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { loginValidation } from "@/validations";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialButton } from "./social-btn";
import toast from "react-hot-toast";
import _http from "@/utils/http";
import useAuth from "@/hooks/use-auth";
import useSocialLogin from "@/hooks/use-social-login";
import PasswordInput from "@/components/ui/input-password";

export type LoginFromValue = z.infer<typeof loginValidation>;

export const LoginHandler = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { login, isLogin } = useAuth();

  const { loginWithGoogle } = useSocialLogin();

  const form = useForm({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFromValue) => {
    setLoading(true);

    try {
      await login(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      redirect("/");
    }
  }, [isLogin]);

  return (
    <AuthModal>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Login</h2>
        <span className="text-neutral-800 text-sm">
          to continue to AMAK Store
        </span>
      </div>
      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">Email address</span>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="mail@example.com"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">Password</span>
                    <PasswordInput
                      placeholder="Password"
                      {...field}
                      autoComplete="off"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span
            className="text-end text-[12px] hover:cursor-pointer hover:underline pb-3"
            onClick={() => router.push(`/forgot-password`)}
          >
            Forgot password
          </span>

          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </FormProvider>

      <div className="flex flex-col gap-2">
        <SocialButton
          provider="google"
          size={18}
          onClick={() => loginWithGoogle()}
        />
      </div>

      <div className="flex items-center space-x-2 text-sm">
        <span className="mt-4 text-neutral-600">No account?</span>
        <span
          className="mt-4 text-blue-600 hover:cursor-pointer"
          onClick={() => router.push("/register")}
        >
          Create now
        </span>
      </div>
    </AuthModal>
  );
};
