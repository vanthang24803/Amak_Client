import { Response } from "@/types";
import { Blog } from "@/types/blog";
import { decodeSlug } from "@/utils/slug";
import { Container } from "./components/container";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const uuid = decodeSlug(params.slug);
  const product = (await fetch(`${process.env.API_URL}/Blogs/${uuid}`).then(
    (res) => res.json(),
  )) as Response<Blog>;

  return {
    title: product.result.title || "Giới thiệu",
  };
}

export default function BlogDetail({ params }: Props) {
  const uuid = decodeSlug(params.slug);
  return <Container blogId={uuid} />;
}
