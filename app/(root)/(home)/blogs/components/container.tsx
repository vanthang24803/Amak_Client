/* eslint-disable @next/next/no-img-element */
"use client";

import PaginationComponent from "@/components/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/types";
import { Blog } from "@/types/blog";
import _http from "@/utils/http";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Dot } from "lucide-react";
import { Fragment, useState } from "react";
import useSWR from "swr";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { generateSlug } from "@/utils/slug";
import { Separator } from "@/components/ui/separator";

const fetcher = (url: string, params: any) =>
  _http.get(url, { params }).then((res) => res.data);

const SkeletonCard = () => (
  <Card className="flex flex-col">
    <CardContent className="p-0 overflow-hidden">
      <Skeleton className="w-full h-48" />
    </CardContent>
    <div className="flex flex-col p-4 gap-1">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex items-center gap-4 mt-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  </Card>
);

const navigator = [
  { href: "/", label: "Trang chủ" },
  { href: "/collections/sach-ban-chay", label: "Sách bán chạy" },
  { href: "/collections/all", label: "Danh sách sản phẩm" },
  { href: "/collections/phu-kien", label: "Phụ kiện" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact/gioi-thieu", label: "Giới thiệu" },
  { href: "/contact/lien-he", label: "Liên hệ" },
];

export const Container = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: blogs,
    error,
    isLoading,
  } = useSWR<Pagination<Blog[]>>(
    ["/Blogs", { Page: currentPage, Limit: 4 }],
    ([url, params]) => fetcher(url, params),
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) console.log(error);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-3/4 flex flex-col gap-2">
        <h1 className="text-xl font-bold tracking-tight">Tin tức</h1>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          ) : (
            <Fragment>
              {blogs?.result?.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${generateSlug(blog.title, blog.id)}`}
                >
                  <Card className="flex flex-col cursor-pointer h-[300px] md:h-[400px]">
                    <CardContent className="p-0 overflow-hidden">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                      />
                    </CardContent>
                    <div className="flex flex-col p-4 gap-1">
                      <h2 className="font-bold text-lg hover:text-green-600 cursor-pointer line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="line-clamp-2 text-sm">{blog.content}</p>
                      <div className="flex items-start md:items-center gap-2 md:gap-4 text-[13px] mt-2 font-medium text-muted-foreground flex-col md:flex-row">
                        <span className="flex md:items-center gap-2">
                          <p> bởi:</p>
                          <img
                            className="md:flex items-center justify-center rounded-full w-8 h-8 hidden "
                            src={blog.author.avatar}
                            alt={blog.author.fullName}
                          />
                          <p> {blog.author.fullName}</p>
                        </span>
                        <Dot className="w-4 h-4 hidden md:block" />
                        <span>
                          {format(blog.createAt, "dd 'tháng' MM 'năm' yyyy", {
                            locale: vi,
                          })}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </Fragment>
          )}
        </div>

        {blogs && (
          <div className="mt-3">
            <PaginationComponent
              currentPage={blogs._currentPage}
              totalPage={blogs._totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/4 flex flex-col gap-4 ml-2">
        <Fragment>
          {isLoading ? (
            <SkeletonCard />
          ) : (
            <Accordion
              type="multiple"
              className="w-full bg-white rounded-md px-4"
              defaultValue={["data"]}
            >
              <AccordionItem value="data">
                <AccordionTrigger className="hover:no-underline font-bold tracking-tighter">
                  Bài viêt mới nhất
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4">
                  {navigator.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <Link
                        href={item.href}
                        className="text-md tracking-tight hover:text-green-600 font-semibold"
                      >
                        {item.label}
                      </Link>
                      <Separator />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </Fragment>

        <Fragment>
          {isLoading ? (
            <SkeletonCard />
          ) : (
            <Accordion
              type="multiple"
              className="w-full bg-white rounded-md px-4"
              defaultValue={["data"]}
            >
              <AccordionItem value="data">
                <AccordionTrigger className="hover:no-underline font-bold tracking-tighter">
                  Danh mục bài viết
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/"
                      className="text-md  tracking-tight hover:text-green-600 font-semibold"
                    >
                      Trang chủ
                    </Link>
                    <Separator />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/collections/sach-ban-chay"
                      className="text-md  tracking-tight hover:text-green-600 font-semibold"
                    >
                      Sách bán chạy
                    </Link>
                    <Separator />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/collections/all"
                      className="text-md  tracking-tight hover:text-green-600 font-semibold"
                    >
                      Danh sách sản phẩm
                    </Link>
                    <Separator />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/collections/phu-kien"
                      className="text-md  tracking-tight hover:text-green-600 font-semibold"
                    >
                      Phụ kiện
                    </Link>
                    <Separator />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/blogs"
                      className="text-md  tracking-tight hover:text-green-600 font-semibold"
                    >
                      Blogs
                    </Link>
                    <Separator />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/contact/gioi-thieu"
                      className="text-md  tracking-tight hover:text-green-600 font-semibold"
                    >
                      Giới thiệu
                    </Link>
                    <Separator />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/contact/lien-he"
                      className="text-md  tracking-tight hover:text-green-600 font-semibold"
                    >
                      Liên hệ
                    </Link>
                    <Separator />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </Fragment>
      </div>
    </div>
  );
};
