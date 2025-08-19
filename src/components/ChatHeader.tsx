import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="bg-base-300/80 border-base-300 border-b p-3 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="border-base-100 relative size-10 overflow-hidden rounded-full border">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.fullName}
              className="h-full w-full object-cover"
            />
            {onlineUsers.includes(selectedUser?._id as string) && (
              <span className="ring-base-300 absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2"></span>
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="text-base-content font-medium">
              {selectedUser?.fullName}
            </h3>
            <p
              className={`text-sm ${
                onlineUsers.includes(selectedUser?._id as string)
                  ? "text-green-500"
                  : "text-zinc-400"
              }`}
            >
              {onlineUsers.includes(selectedUser?._id as string)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="hover:bg-base-200 rounded-full p-1 transition"
        >
          <X className="text-base-content" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
