import { Metadata } from "next";
import { Handler } from "./components/handler";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
};

export default function AllCategory() {
  return <Handler />;
}
