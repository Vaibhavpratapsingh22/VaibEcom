import prismadb from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    parentName,
    categoryName,
    parentCategoryId: { value: parentCategoryId },
    saveCategory,
    saveParentCategory,
  } = body;
  console.log(
    parentName,
    categoryName,
    parentCategoryId,
    saveCategory,
    saveParentCategory
  );
  if (saveCategory) {
    try {
      if (parentCategoryId?.length > 0) {
        const response = await prismadb.category.create({
          data: {
            name: categoryName,
            parentId: parentCategoryId,
          },
        });
        if (response)
          return new NextResponse("Category created", { status: 201 });
      } else {
        const response = await prismadb.category.create({
          data: {
            name: categoryName,
          },
        });
        if (response)
          return new NextResponse("Category created", { status: 201 });
      }
    } catch (err) {
      return new NextResponse(`Error while creating category, ${err}`, {
        status: 400,
      });
    }
  }
  if (saveParentCategory) {
    try {
      const response = await prismadb.parentCategory.create({
        data: {
          name: parentName,
        },
      });
      if (response)
        return new NextResponse("Parent category created", { status: 201 });
    } catch (err) {
      return new NextResponse(`Error while creating parent category, ${err}`, {
        status: 400,
      });
    }
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("get")?.toString();

  try {
    if (id === "parent") {
      const response = await prismadb.parentCategory.findMany();
      if (response) return NextResponse.json(response, { status: 200 });
    }
    if (id === "category") {
      const response = await prismadb.category.findMany({
        include: {
          parent: true,
        },
      });
      if (response) return NextResponse.json(response, { status: 200 });
    }
  } catch (err) {
    return new NextResponse(`Error while fetching categories ${err}`, {
      status: 400,
    });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const {
    parentName,
    categoryName,
    parentCategoryId,
    updateParentCategory,
    updateCategory,
  } = body;
  console.log(
    parentName,
    categoryName,
    parentCategoryId,
    updateParentCategory,
    updateCategory
  );
  if (updateCategory) {
    try {
      const response = await prismadb.category.update({
        where: {
          name: categoryName,
        },
        data: {
          name: categoryName,
          parentId: parentCategoryId,
        },
      });
      if (response)
        return new NextResponse("Category updated", { status: 200 });
    } catch (err) {
      return new NextResponse(`Error while updating category, ${err}`, {
        status: 400,
      });
    }
  }

  if (updateParentCategory) {
    try {
      const response = await prismadb.parentCategory.updateMany({
        where: {
          name: parentName,
        },
        data: {
          name: parentName,
        },
      });
      if (response)
        return new NextResponse("Category updated", { status: 200 });
    } catch (err) {
      return new NextResponse(`Error while updating category, ${err}`, {
        status: 400,
      });
    }
  }
}
