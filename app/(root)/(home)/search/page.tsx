import { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "./components/container";

export const metadata: Metadata = {
  title: `Kết quả tìm kiếm`,
};

export default function Search() {
  return (
    <Suspense>
      <Container />
    </Suspense>
  );
}
