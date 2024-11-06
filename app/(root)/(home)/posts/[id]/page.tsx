import { Metadata } from "next";
import { Wrapper } from "./components/wrapper";

type Props = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "Cập nhật Blog",
};

export default function UpdatePost({ params }: Props) {
  return <Wrapper id={params.id} />;
}
