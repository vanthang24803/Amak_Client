/* eslint-disable @next/next/no-img-element */
"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBlog } from "@/services/api/blog";
import { Blog } from "@/types/blog";
import Link from "next/link";
import useSWR from "swr";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { generateSlug } from "@/utils/slug";
import { Fragment } from "react";

export const Blogs = () => {
  const { data, isLoading, error } = useSWR<Blog[]>(`/Blogs`, () =>
    fetchBlog(1, 5),
  );

  if (error) console.log(error);

  const [latestBlog, ...blogs] = data || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold mx-2 tracking-tighter">
            Thông báo bản quyền
          </CardTitle>
          <Link href="/blogs">
            <Button variant="ghost" className="rounded-sm h-8 font-semibold">
              Xem thêm
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Fragment>
            {latestBlog &&
              <div className="flex  justify-between flex-col md:flex-row gap-4 md:gap-6">
                <Link
                  href={`/blogs/${generateSlug(latestBlog.title, latestBlog.id)}`}
                  className="w-full md:w-1/2 flex flex-col gap-2"
                >
                  <img
                    src={latestBlog.thumbnail}
                    alt={latestBlog.title}
                    className="rounded"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-bold text-xl tracking-tight">
                      {latestBlog.title}
                    </h1>
                    <p className="text-[14px]">
                      {format(latestBlog.createAt, "dd 'tháng' MM 'năm' yyyy", {
                        locale: vi,
                      })}
                    </p>
                  </div>
                </Link>
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                  {blogs.map((blog) => (
                    <Link
                      href={`/blogs/${generateSlug(blog.title, blog.id)}`}
                      className="flex items-start gap-3"
                      key={blog.id}
                    >
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-32 h-[5.5rem] object-fill rounded"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-[14px] tracking-tight">
                          {latestBlog.title}
                        </h3>
                        <p className="text-[12px]">
                          {format(latestBlog.createAt, "dd 'tháng' MM 'năm' yyyy", {
                            locale: vi,
                          })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            }
          </Fragment>
        )}
      </CardContent>
    </Card>
  );
};
