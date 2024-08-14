import CreateInvoice from "@/components/invoice/CreateInvoice";
import ListInvoice from "@/components/invoice/ListInvoice";
import { Separator } from "@radix-ui/react-separator";

export default async function Home({ searchParams }) {
  const search = searchParams?.search || "";
  const limit = searchParams?.limit || 5;
  const page = searchParams?.page || "";

  const res = await fetch(
    `${process.env.SERVER_URL}/api/actions?page=${page}&limit=${limit}&search=${search}`,
    { cache: "no-store" }
  );
  const result = await res.json();
  // console.log(result);

  return (
    <div className="flex justify-center min-h-[82vh]">
      <section className="w-full px-2 max-w-[1000px]">
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold">Invoice Manager</h3>
          <CreateInvoice />
        </div>
        <Separator className="my-2 border-b-[2px] border-color-light-blue" />

        <ListInvoice
          total={result?.total}
          pages={result?.pageCount}
          invoices={result?.data}
        />
      </section>
    </div>
  );
}
