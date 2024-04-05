import axios from "axios";
const baseUrl = "http://localhost:3000/api/cart";

const getCartProducts = async (ids: string[]) => {
  try {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("id", id));

  const response = await axios.get(`${baseUrl}?${params}`);
    return response.data;
  } catch (error) {
    console.error("Error while posting cart products:", error);
    throw error;
  }
};

export { getCartProducts };
