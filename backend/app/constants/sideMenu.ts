import { Home, List, Settings, ShoppingBag, ShoppingCart } from "lucide-react";

export const SideMenu = [
  {
    title: "Dashboard",
    icon: Home,
    link: "/dashboard",
  },
  {
    title: "Products",
    icon: ShoppingCart,
    link: "/products",
  },
  {
    title: "Categories",
    icon: List,
    link: "/categories",
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    link: "/orders",
  },
  {
    title: "Settings",
    icon: Settings,
    link: "/settings",
  },
];
