import prismadb from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: any) {
        const { ids } = req;
console.log(req)
    try{
        return NextResponse.json(
          { error: "Error fetching cart" },
          { status: 200 }
        );

    }
    catch(e){
        console.error(e);
        return NextResponse.json({error: "Error fetching cart"}, {status: 500});
    }
//   const cart = await prismadb.products.findMany({
//     where: {
//       id: ids,
//     },
//   });
//   return cart;
}
