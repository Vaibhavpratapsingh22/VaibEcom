import prismadb from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { catName, parentCat } = body;
  try {
    if (parentCat) {
      const response = await prismadb.category.create({
        data: {
          name: catName,
          parentId: parentCat,
        },
      });
      if (response)
        return new NextResponse("Category created", { status: 201 });
    } else {
      const response = await prismadb.category.create({
        data: {
          name: catName,
        },
      });
      if (response)
        return new NextResponse("Category created", { status: 201 });
    }
  } catch (err) {
    return new NextResponse("Error while creating category", { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const response = await prismadb.category.findMany();
    if (response) return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return new NextResponse("Error while fetching categories", { status: 400 });
  }
}
