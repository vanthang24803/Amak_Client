"use client";

import { fetchCloudinaryPhotos } from "@/services/api/cloudinary";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Fragment } from "react";
import { Loading } from "../../_components/loading";

export const CloudinaryContainer = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`dashboard-cloudinary-photos`],
    queryFn: () => fetchCloudinaryPhotos(),
  });

  return (
    <div className="pb-20">
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable searchKey="publicId" columns={columns} data={data || []} />
      )}
    </div>
  );
};
