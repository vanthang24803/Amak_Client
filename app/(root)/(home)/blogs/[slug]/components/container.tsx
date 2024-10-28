"use client";

import { Blog } from "@/types/blog";
import { Metadata } from "next";
import useSWR from "swr";

type Props = {
  blogId: string | null;
};

export const metadata: Metadata = {
  title: "Tin tức",
};

export const Container = ({ blogId }: Props) => {
  const { data } = useSWR<Blog>(`/Blogs/${blogId}`);

  return <div className="h-svh">{JSON.stringify(data)}</div>;
};
