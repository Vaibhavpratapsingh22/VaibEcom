import React from "react";
import { SideMenu } from "../constants/sideMenu";
import Link from "next/link";

type SideBarProps = {
  name: string;
};
const SideBar = ({ name }: SideBarProps) => {
  return (
    <div className="flex flex-col w-full h-full bg-red-200 p-5">
      <div>
        Welcome,
        <br />
        <span className="font-bold md:text-sm lg:text-xl">
          {" "}
          {name.toUpperCase()}!
        </span>
      </div>
      {SideMenu.map((item, index) => (
        <Link href={item.link}>
          <div className="flex flex-row px-1 py-4">
            <span className="px-1">
              <item.icon color="red" />
            </span>
            {item.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
