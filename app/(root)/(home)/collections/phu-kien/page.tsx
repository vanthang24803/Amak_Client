import { Metadata } from "next";
import { Container } from "../_components/container-categoy";

export const metadata: Metadata = {
  title: "Phụ kiện",
};

export default function Collection() {
  return (
    <Container
      category="Phụ kiện"
      thumbnail="https://file.hstatic.net/200000294254/collection/phu-kien-1200x628_dbee01b7158e4e0299add52c4ab27531.png"
    />
  );
}
