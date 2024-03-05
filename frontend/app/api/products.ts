import axios from "axios";
const baseUrl = "http://localhost:3000/api/product";

const getAllProducts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOneProduct = async (id: string) => {
  const response = await axios.get(
    `${baseUrl}?id=${id}`
  );
  return response.data;
};


export { getAllProducts, getOneProduct };
