"use client";
import { useEffect, useState, useRef } from "react";
import Search from "../widgets/Search";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import ReactPaginate from "react-paginate";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import DeleteModel from "../widgets/DeleteModel";
import { toast } from "react-toastify";

export default function ListInvoice({ total, pages, invoices }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pageCount, setPageCount] = useState(1);
  const currentpage = useRef(1);

  const [search, setSearch] = useState();

  // const handleSearch = (e) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("page", 1);

  //   if (search) {
  //     params.set("search", search);
  //   } else {
  //     params.delete("search");
  //   }

  //   router.replace(`${pathname}?${params.toString()}`);
  // };

  const debouncedHandleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", 1);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    debouncedHandleSearch(); // This will execute after 500ms
  }, [search]);

  // Pagination Start
  useEffect(() => {
    if (total > 0) {
      setPageCount(pages);
    }
  }, [pageCount, total]);

  function handlePageClick(e) {
    const params = new URLSearchParams(searchParams.toString());

    if (currentpage.current) {
      params.set("page", e.selected + 1);
    }

    currentpage.current = e.selected + 1;
    router.replace(`${pathname}?${params.toString()}`);
  }

  const onDelete = async (id) => {
    console.log(id);
    const res = await fetch("/api/deleteInvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const result = await res.json();
    if (result.status === 200) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleSendEmail = async (invoice) => {
    const res = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        subject: "Invoice",
        message: "Your invoice for latest purchase",
        email: [invoice?.customer?.email],
        data: invoice,
      }),
    });

    const result = await res?.json();
    console.log(result);

    if (result?.status === 200) {
      toast.success(result?.message);
    } else {
      toast.error(result?.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b-[1px] border-gray-400 pb-3">
        <p>({total ? total : 0}) Invoices</p>
        <Search
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">s/n</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map((invoice, index) => (
            <TableRow key={invoice?.id}>
              {/* S/N */}
              <TableCell className="font-medium">{index + 1}</TableCell>
              {/* Avatar & Name */}
              <TableCell>
                <div className="flex justify-start items-center space-x-2">
                  <span>
                    <Avatar>
                      <AvatarImage
                        src={invoice?.customer?.image}
                        alt={`${invoice?.customer?.name} profile`}
                      />
                      <AvatarFallback>
                        {invoice?.customer?.name?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </span>
                  <span>{invoice?.customer?.name}</span>
                </div>
              </TableCell>
              {/* Email */}
              <TableCell>{invoice?.customer?.email}</TableCell>
              {/* Amount */}
              <TableCell>${invoice?.amount}</TableCell>
              {/* Date */}
              <TableCell>
                {format(new Date(invoice?.createdAt), "yyyy/MM/dd")}
              </TableCell>
              {/* Status */}
              <TableCell>
                <Badge
                  variant={
                    invoice?.status === "Paid" ? "default" : "destructive"
                  }
                >
                  {invoice?.status}
                </Badge>
              </TableCell>
              {/* Action */}
              <TableCell className="flex space-x-3">
                <>
                  {/* Send Email */}
                  <span>
                    <Tooltip
                      placement="top"
                      trigger={["hover"]}
                      overlay={<span>Send Email</span>}
                    >
                      <RiMailSendLine
                        size={24}
                        color={"purple"}
                        className="cursor-pointer"
                        onClick={() => handleSendEmail(invoice)}
                      />
                    </Tooltip>
                  </span>
                  {/* Edit */}
                  <span>
                    <Tooltip
                      placement="top"
                      trigger={["hover"]}
                      overlay={<span>Edit</span>}
                    >
                      <Link href={`/?id=${invoice?.id}`}>
                        <FaEdit
                          size={24}
                          color={"green"}
                          className="cursor-pointer"
                        />
                      </Link>
                    </Tooltip>
                  </span>
                  {/* Delete */}
                  <span>
                    <Tooltip
                      placement="top"
                      trigger={["hover"]}
                      overlay={<span>Delete</span>}
                    >
                      <DeleteModel
                        title={"Delete Invoice"}
                        desc={"Are you sure you want to delete this invoice?"}
                        pass={"delete"}
                        onClick={() => onDelete(invoice?.id)}
                      />
                    </Tooltip>
                  </span>
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {invoices?.length > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      )}
    </div>
  );
}
