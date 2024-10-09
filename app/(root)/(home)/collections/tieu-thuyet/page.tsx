import { Metadata } from "next";
import { Container } from "../_components/container-categoy";

export const metadata: Metadata = {
  title: "Tiểu thuyết",
};

export default function Collection() {
  return (
    <Container
      category="Tiểu thuyết"
      thumbnail="https://file.hstatic.net/200000294254/collection/banner_danh_muc_homepage___collection_1920x580px__tieu_thuyet__8c8d0f4a2511417b8ce2191535c34a8a.jpg"
    />
  );
}
