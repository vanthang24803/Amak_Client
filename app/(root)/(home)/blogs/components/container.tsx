/* eslint-disable @next/next/no-img-element */
"use client";

import PaginationComponent from "@/components/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/types";
import { Blog } from "@/types/blog";
import _http from "@/utils/http";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Dot } from "lucide-react";
import { Fragment, useState } from "react";
import useSWR from "swr";

import Link from "next/link";
import { generateSlug } from "@/utils/slug";
import { SkeletonCard } from "./skeleton-card";

const fetcher = (url: string, params: any) =>
  _http.get(url, { params }).then((res) => res.data);

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
      <div className="w-full flex flex-col gap-2">
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
    </div>
  );
};
