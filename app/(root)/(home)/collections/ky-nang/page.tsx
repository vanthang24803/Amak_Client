import { Metadata } from "next";
import { Container } from "../_components/container-categoy";

export const metadata: Metadata = {
  title: "Kỹ năng",
};

export default function Collection() {
  return (
    <Container
      category="Kỹ năng"
      thumbnail="https://file.hstatic.net/200000294254/collection/banner_danh_muc_homepage___collection_1920x580px__ky_nang__73b162c327bd4a9c8040a0df028632fb.jpg"
    />
  );
}
