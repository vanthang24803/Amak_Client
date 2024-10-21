"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { categories } from "@/constants";

export const Categories = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-2 md">
      {categories.map((item, index) => (
        <Link
          href={item.url}
          key={index}
          className="overflow-hidden rounded-md"
        >
          <img
            src={item.thumbnail}
            alt={item.name}
            title={item.name}
            className="rounded-md hover:scale-105 transform transition-transform duration-500"
          />
        </Link>
      ))}
    </div>
  );
};
