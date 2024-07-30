import { Metadata } from "next";
import { Container } from "../../components/container-action";

export const metadata: Metadata = {
  title: "Sản phẩm khuyến mãi",
};

export default function Collection() {
  return <Container action="OnSale" />;
}