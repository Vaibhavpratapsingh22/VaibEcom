import prismadb from "@/app/lib/prismadb";
import axios from "axios";

type createProps = {
  data: {
    name: string;
    description: string;
    price: number;
  };
  method: string;
};

async function createProduct(props: createProps) {
  const { data, method } = props;
  if (method === "POST") {
    return null;
  }
}

export { createProduct };
