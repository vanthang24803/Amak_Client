import { Metadata } from "next";
import { LoginHandler } from "./components/login-handler";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function Login() {
  return <LoginHandler />;
}
