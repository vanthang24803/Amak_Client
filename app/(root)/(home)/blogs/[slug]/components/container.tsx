/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Blog } from "@/types/blog";
import { vi } from "date-fns/locale";
import { Dot } from "lucide-react";
import { Metadata } from "next";
import { format } from "date-fns";
import useSWR from "swr";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  blogId: string | null;
};

export const metadata: Metadata = {
  title: "Tin tức",
};

const SkeletonLoader = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-8 w-3/4 mb-4" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-40" />
        <Dot className="w-6 h-6 text-muted-foreground" />
        <Skeleton className="h-6 w-32" />
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="h-full w-full rounded-md" />
      </AspectRatio>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </CardContent>
  </Card>
);

export const Container = ({ blogId }: Props) => {
  const { data: blog, error, isLoading } = useSWR<Blog>(`/Blogs/${blogId}`);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <div>Error loading blog post</div>;
  if (!blog) return <div>Blog post not found</div>;

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Thông báo bản quyền</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blog.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tighter">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-muted-foreground flex items-center gap-2">
              <span className="flex md:items-center gap-2 text-sm">
                <p> bởi:</p>
                <img
                  className="md:flex items-center justify-center rounded-full w-8 h-8 hidden "
                  src={blog.author.avatar}
                  alt={blog.author.fullName}
                />
                <p> {blog.author.fullName}</p>
              </span>
            </div>
            <Dot className="w-6 h-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {format(blog.createAt || new Date(), "dd 'tháng' MM 'năm' yyyy", {
                locale: vi,
              })}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={blog.thumbnail || ""}
              alt={blog.title || ""}
              fill
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>

          <div
            className="text-[15px] font-medium tracking-tight"
            dangerouslySetInnerHTML={{
              __html: blog.content || "",
            }}
          />

          <Separator />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Đang xem:</span>
            <p className="font-bold">{blog.title}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
