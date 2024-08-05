import { Skeleton } from "@/components/ui/skeleton";
import { BestSeller } from "./_components/best-seller";
import { BillboardComponent } from "./_components/billboard";
import { Categories } from "./_components/categories";
import { NewBook } from "./_components/new-book";
import { Manga } from "./_components/manga";

export default function Home() {
  return (
    <main className="md:max-w-screen-xl mx-auto md:p-8 p-2 flex flex-col space-y-6 md:space-y-8">
      <BillboardComponent />
      <Categories />
      <BestSeller />
      <Skeleton className="w-full h-10 bg-white" />
      <NewBook />
      <Manga />
    </main>
  );
}
