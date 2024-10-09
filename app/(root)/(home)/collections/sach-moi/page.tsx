import { Metadata } from "next";
import { Container } from "../_components/container-categoy";

export const metadata: Metadata = {
  title: "Sách mới",
};

export default function Collection() {
  return (
    <Container
      category="Sách mới"
      thumbnail="https://file.hstatic.net/200000294254/collection/collection-banner_1c569cea7f8f400a8289422ad514f560.jpg"
    />
  );
}
