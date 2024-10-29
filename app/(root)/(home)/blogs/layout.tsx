/* eslint-disable @next/next/no-img-element */
import { Response } from "@/types";
import { Blog } from "@/types/blog";
import { Fragment, PropsWithChildren } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SkeletonCard } from "./components/skeleton-card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { navigator } from "@/constants/blog-navigator";
import { generateSlug } from "@/utils/slug";

export default async function BlogLayout({ children }: PropsWithChildren) {
  const data = (await fetch(`${process.env.API_URL}/Blogs/`).then((res) =>
    res.json(),
  )) as Response<Blog[]>;

  return (
    <main className="md:max-w-screen-xl mx-auto p-4 flex flex-col lg:flex-row gap-4">
      <div className="lg:basis-3/4">{children}</div>
      <div className="w-full lg:basis-1/4 flex flex-col gap-4">
        <Fragment>
          {!data ? (
            <SkeletonCard />
          ) : (
            <Accordion
              type="multiple"
              className="w-full bg-white rounded-md px-4"
              defaultValue={["data"]}
            >
              <AccordionItem value="data">
                <AccordionTrigger className="hover:no-underline font-bold tracking-tighter">
                  Bài viết mới nhất
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4">
                  {data.result.map((blog, index) => (
                    <Link
                      href={`/blogs/${generateSlug(blog.title, blog.id)}`}
                      className="flex gap-2"
                      key={blog.id}
                    >
                      <div className="relative w-[120px]">
                        <div className="absolute top-3 left-0 w-6 h-6 bg-green-600 text-white font-bold flex items-center justify-center rounded-full">
                          {index + 1}
                        </div>
                        <img
                          src={blog.thumbnail}
                          alt={blog.title}
                          className="w-[110px] h-[70px]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[12px]  font-medium tracking-tight line-clamp-1 hover:text-green-600 hover:font-semibold">
                          {blog.title}
                        </h3>
                        <span className="text-[11px] text-muted-foreground">
                          {format(blog.createAt, "dd 'tháng' MM 'năm' yyyy", {
                            locale: vi,
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </Fragment>

        <Fragment>
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
        </Fragment>
      </div>
    </main>
  );
}
