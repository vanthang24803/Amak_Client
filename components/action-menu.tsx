"use client";

import { MobileMenu } from "./mobile/mobile-menu";
import useAuth from "@/hooks/use-auth";

import useClient from "@/hooks/use-client";

import { PublicAction } from "./public-action";
import { PrivateAction } from "./private-action";
import { Fragment } from "react";

export default function ActionMenu() {
  const { isLogin } = useAuth();

  const { isClient } = useClient();

  return (
    <div className="flex items-center space-x-4">
      {isClient && (
        <Fragment>{isLogin ? <PrivateAction /> : <PublicAction />}</Fragment>
      )}
      <MobileMenu />
    </div>
  );
}
