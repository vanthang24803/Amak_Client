import { decodeSlug } from "@/utils/slug";
import { Container } from "./components/container";
import { ProductDetail, Response } from "@/types";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const uuid = decodeSlug(params.slug);
  const product = (await fetch(`${process.env.API_URL}/Products/${uuid}`).then(
    (res) => res.json()
  )) as Response<ProductDetail>;

  return {
    title: product.result.name || "Sản phẩm",
  };
}

export default async function Product({ params }: Props) {
  const uuid = decodeSlug(params.slug);
  return <Container id={uuid} />;
}
