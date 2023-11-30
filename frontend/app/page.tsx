import Navbar from "@/components/navbar";
import OrderPlacer from "@/components/orderplacer";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <Navbar />
      <OrderPlacer />
    </section>
  );
}
