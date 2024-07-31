import { Skeleton } from "@/components/ui/skeleton";
import { BestSeller } from "./components/best-seller";
import { BillboardComponent } from "./components/billboard";
import { Categories } from "./components/categories";
import { NewBook } from "./components/new-book";
import { Manga } from "./components/manga";

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
