import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Get Error Message from Error Object
export const getErrorMessages = (error) => {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something wen wrong";
  }
  return message;
};

export async function POST(req) {
  const { amount, customer, status } = await req.json();

  try {
    if (!amount || !customer || !status) {
      return {
        error: "Please fill all the fields",
      };
    }

    const invoice = await prisma.invoice.create({
      data: {
        customer,
        amount,
        status,
      },
    });

    revalidatePath("/");

    return NextResponse.json({
      status: 200,
      message: "Invoice created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: getErrorMessages(error),
    });
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;
  const search = url.searchParams.get("search") || "";

  const query = {
    ...(search && {
      OR: [
        { amount: { contains: search, mode: "insensitive" } },
        { status: { equals: search, mode: "insensitive" } },
      ],
    }),
  };

  try {
    const res = await prisma.invoice.findMany({
      where: query,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.invoice.count({
      where: query,
    });
    const pageCount = Math.ceil(total / limit);

    return NextResponse.json({
      status: 200,
      message: "Invoice Loaded",
      total,
      pageCount,
      data: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error: error });
  }
}
