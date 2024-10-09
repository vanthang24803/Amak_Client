import { Metadata } from "next";
import { Container } from "../_components/container-categoy";

export const metadata: Metadata = {
  title: "Manga - Commic",
};

export default function Collection() {
  return (
    <Container
      category="Manga-Commic"
      thumbnail="https://file.hstatic.net/200000294254/collection/banner_danh_muc_homepage___collection_1920x580px__truyen_tranh__ebacebcd2b134638a9179a96f7b4af29.jpg"
    />
  );
}
