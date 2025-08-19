import ChatContainer from "@/components/ChatContainer";
import NoChatSelected from "@/components/NoChatSelected";
import Sidebar from "@/components/Sidebar";
import { useChatStore } from "@/store/useChatStore";
// import { Sidebar } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="bg-base-200 h-screen">
      <div className="flex w-full items-center justify-center px-4 pt-20">
        <div className="bg-base-200 h-[calc(100vh-8rem)] w-full rounded-lg px-6 shadow-xl">
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
