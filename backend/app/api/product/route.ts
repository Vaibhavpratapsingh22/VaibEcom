import prismadb from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest } from "next";
type createProps = {
  data: {
    name: string;
    description: string;
    price: number;
  };
  method: string;
};
cloudinary.config({
  cloud_name: "dr5cycgqc",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, description, price, uploadedImages, inputList } = body;
    const imagesURL = await Promise.all(
      uploadedImages?.map(async (imageURLs: string) => {
        const result = await cloudinary.uploader.upload(imageURLs);
        return result.secure_url;
      })
    );
    const existingProduct = await prismadb.products.findFirst({
      where: {
        name,
      },
    });
    if (existingProduct) {
      return new NextResponse("Product already exists", { status: 400 });
    }
    const result = await prismadb.products.createMany({
      data: {
        name,
        description: description,
        price: Number(price),
        image: imagesURL,
        properties: inputList,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
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
    try {
      const result = await prismadb.products.findMany();
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error fetching product" },
        { status: 500 }
      );
    }
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { name, description, price, images, newImages } = body;
  if (!newImages?.length) {
    const result = await prismadb.products.updateMany({
      where: {
        name,
      },
      data: {
        description,
        price: Number(price),
        image: images,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } else {
    const imagesURL = await Promise.all(
      newImages.map(async (imageURLs: string) => {
        const result = await cloudinary.uploader.upload(imageURLs);
        return result.secure_url;
      })
    );
    const result = await prismadb.products.updateMany({
      where: {
        name,
      },
      data: {
        description,
        price: Number(price),
        image: [...images, ...imagesURL],
      },
    });
    return NextResponse.json(result, { status: 200 });
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name")?.toString();
  const result = await prismadb.products.delete({
    where: {
      name: name,
    },
  });
  return NextResponse.json(result, { status: 200 });
}
