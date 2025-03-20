/* eslint-disable @next/next/no-img-element */
"use client";

import { Pagination } from "@/types";
import { Blog } from "@/types/blog";
import _http from "@/utils/http";
import { Inter } from "next/font/google";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { SkeletonCard } from "../../../blogs/components/skeleton-card";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import PaginationComponent from "@/components/pagination";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

const fetcher = (url: string, params: any) =>
  _http.get(url, { params }).then((res) => res.data);

export const Render = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: blogs,
    error,
    isLoading,
  } = useSWR<Pagination<Blog[]>>(
    ["/Blogs/Author", { Page: currentPage }],
    ([url, params]) => fetcher(url, params),
  );

  if (error) console.log(error);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={`${font.className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
        {isLoading ? (
          Array(4)
            .fill(0)
            .map((_, index) => <SkeletonCard key={index} />)
        ) : (
          <Fragment>
            {blogs?.result?.map((blog) => (
              <Link key={blog.id} href={`/posts/${blog.id}`}>
                <Card className="flex flex-col cursor-pointer h-[250px]">
                  <CardContent className="p-0 overflow-hidden">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                    />
                  </CardContent>
                  <div className="flex flex-col p-4 gap-1">
                    <h2 className="font-bold text-md hover:text-green-600 cursor-pointer line-clamp-2">
                      {blog.title}
                    </h2>
                    <div className="flex items-start md:items-center gap-1 md:gap-4 text-[13px] mt-2 font-medium text-muted-foreground flex-col md:flex-row">
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
  );
};
