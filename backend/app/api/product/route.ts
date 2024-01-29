import prismadb from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

type createProps = {
  data: {
    name: string;
    description: string;
    price: number;
  };
  method: string;
};

export async function POST(req: Request) {
  const body = await req.json();
  const { name, description, price } = body;
  const existingProduct = await prismadb.products.findFirst({
    where: {
      name,
    },
  });
  if (existingProduct) {
    return new NextResponse("Product already exists", { status: 400 });
  }
  const result = await prismadb.products.create({
    data: {
      name,
      description: description,
      price: Number(price),
    },
  });
  return NextResponse.json(result, { status: 201 });
}

export async function GET(req: any) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id")?.toString();
  if (id) {
    try {
      const product = await prismadb.products.findUnique({
        where: {
          id,
        },
      });

      if (product) {
        return NextResponse.json(product, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error fetching product" },
        { status: 500 }
      );
    }
  } else {
    const result = await prismadb.products.findMany();
    return NextResponse.json(result, { status: 200 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { name, description, price } = body;
  const result = await prismadb.products.updateMany({
    where: {
      name,
    },
    data: {
      description,
      price: Number(price),
    },
  });
  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { name } = body;
  const result = await prismadb.products.deleteMany({
    where: {
      name,
    },
  });
  return NextResponse.json(result, { status: 200 });
}