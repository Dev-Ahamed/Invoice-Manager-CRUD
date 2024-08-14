import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    console.log(id);
    const invoice = await prisma.invoice.findUnique({ where: { id: id } });

    return NextResponse.json({ status: 200, message: "Got it", data: invoice });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 200, error: error });
  }
}

export async function POST(req) {
  const { customer, amount, status, id } = await req.json();
  try {
    // console.log(customer, amount, status, id);

    const invoice = await prisma.invoice.update({
      where: {
        id: id,
      },
      data: {
        customer: customer,
        amount: amount,
        status: status,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Updated successfully",
      data: invoice,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 200,
      error: error,
    });
  }
}
