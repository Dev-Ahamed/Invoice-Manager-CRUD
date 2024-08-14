import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();
  try {
    console.log(id);
    const deletedInvoice = await prisma.invoice.delete({
      where: { id: id },
    });
    console.log(deletedInvoice);

    return NextResponse.json({
      status: 200,
      message: "Invoice Deleted",
      data: deletedInvoice,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Something went wrong" });
  }
}
