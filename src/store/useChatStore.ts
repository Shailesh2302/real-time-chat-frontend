import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

interface ChatUser {
  _id: string | number;
  fullName: string;
  avatar: string;
  profilePic: string;
}

interface ChatMessage {
  _id: string | number | null;
  senderId: string | ChatUser;
  receiverId: string | number;
  text?: string;
  image?: string;
  createdAt?: Date;
}

interface MessageData {
  text?: string | null;
  image?: string | null;
}

interface ChatStore {
  messages: ChatMessage[];
  users: ChatUser[];
  selectedUser: ChatUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string | number) => Promise<void>;
  setSelectedUser: (selectedUser: ChatUser | null) => void;
  sendMessage: (messageData: MessageData) => void;
  subscribeToMessages: () => void;
  unsubscribeToMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
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

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
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

  setSelectedUser: (selectedUser: ChatUser | null) => set({ selectedUser }),

  
  sendMessage: async (messageData: MessageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    }
  },
}));
