import { useChatStore } from "@/store/useChatStore";
import React, { useEffect } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

if(isUsersLoading) return <SidebarSkeleton />

  return <aside className="">


  </aside>;
};

export default Sidebar;
