"use client";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const SideBar = () => {
  return (
    <Sidebar aria-label="Sidebar with logo branding example" className="w-full">
      <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
        Flowbite
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie} className="text-xl">
            Trang chủ
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards} className="text-xl">
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} className="text-xl">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser} className="text-xl">
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag} className="text-xl">
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight} className="text-xl">
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable} className="text-xl">
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
