"use client";

import { fetchCloudinaryPhotos } from "@/services/api/cloudinary";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Loading } from "../../_components/loading";
import useSWR from "swr";

export const CloudinaryContainer = () => {
  const { data, isLoading } = useSWR(`/Cloudinary`, () =>
    fetchCloudinaryPhotos()
  );

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
