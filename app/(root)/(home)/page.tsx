import { BestSeller } from "./components/best-seller";
import { BillboardComponent } from "./components/billboard";
import { Categories } from "./components/categories";

export default function Home() {
  return (
    <main className="md:max-w-screen-xl mx-auto md:p-8 p-2 flex flex-col space-y-6 md:space-y-8">
      <BillboardComponent />
      <Categories />
      <BestSeller />
    </main>
  );
}
