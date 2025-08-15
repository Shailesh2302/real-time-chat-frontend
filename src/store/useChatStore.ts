import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ChatUser {
  id: string | number;
  name?: string;
  avatar?: string;
}

interface ChatMessage {
  id: string | number;
  senderId: string | number;
  receiverId: string | number;
  text?: string;
  createdAt?: string;
}

interface ChatStore {
  messages: ChatMessage[];
  users: ChatUser[];
  selectedUser: ChatUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string | number | null) => Promise<void>;
  setSelectorUser: (selectedUser:ChatStore) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get<ChatUser[]>("/messages/users");
      set({ users: res.data });
      toast.success("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get<ChatMessage[]>(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectorUser: (selectedUser: ChatUser) => set({ selectedUser }),
}));
