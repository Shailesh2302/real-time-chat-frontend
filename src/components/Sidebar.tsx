import { useChatStore } from "@/store/useChatStore";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { User } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="border-base-300 flex h-full w-16 flex-col border-r transition-all duration-200 sm:w-20 md:w-56 lg:w-72">
      {/* Header */}
      <div className="border-base-300 w-full border-b p-4">
        <div className="flex items-center lg:block">
          <User className="size-6" />
          <span className="hidden font-medium lg:block">Contacts</span>
        </div>

        <div className="mt-3 hidden items-center gap-2 lg:flex">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="no-scrollbar flex-1 overflow-y-auto py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`hover:bg-base-300 flex w-full items-center gap-3 p-3 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-base-300 ring-1"
                : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2 ring-zinc-900"></span>
              )}
            </div>

            {/* Name + Status */}
            <div className="hidden min-w-0 flex-1 text-left md:block">
              <div className="truncate font-medium">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="py-4 text-center text-zinc-500">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
