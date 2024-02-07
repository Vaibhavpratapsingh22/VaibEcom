import React from "react";
import { SideMenu } from "../constants/sideMenu";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

type SideBarProps = {
  name: string;
};
const SideBar = ({ name }: SideBarProps) => {
  const activeLink =
    "flex flex-row px-1 py-4 bg-black text-white font-bold rounded-md shadow-md hover:bg-gray";
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full h-full bg-[#B91C1C] p-5">
      <div className="my-4">
        Welcome,
        <br />
        <span className="font-bold md:text-sm lg:text-xl">
          {" "}
          {name.toUpperCase()}!
        </span>
      </div>
      {SideMenu.map((item, index) => {
        return (
          <Link href={item.link}>
            <div
              className={
                pathname?.includes(item?.title.toLocaleLowerCase())
                  ? activeLink
                  : "flex flex-row px-1 py-4"
              }
            >
              <span className="px-1">
                <item.icon color="white" />
              </span>
              {item.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
