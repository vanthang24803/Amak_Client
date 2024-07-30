import { Metadata } from "next";
import { Container } from "../../components/container-action";

export const metadata: Metadata = {
  title: "Sách bán chạy",
};

export default function Collection() {
  return <Container action="Top-selling" />;
}
