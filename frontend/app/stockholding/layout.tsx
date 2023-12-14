import Navbar1 from "@/components/navbar";

export default function StockHoldingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar1 />
      <section className="flex flex-col items-center pt-10 h-screen">
        {children}
      </section>
    </>
  );
}
