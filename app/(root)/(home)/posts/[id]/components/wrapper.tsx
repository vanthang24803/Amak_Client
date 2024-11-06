"use client";

import { Blog } from "@/types/blog";
import useSWR from "swr";
import { UpdateBlogForm } from "./update-post-form";

type Props = {
  id: string | undefined;
};

export const Wrapper = ({ id }: Props) => {
  const { data, isLoading } = useSWR<Blog>(`/Blogs/${id}`);

  return <UpdateBlogForm post={data} isLoading={isLoading} />;
};
