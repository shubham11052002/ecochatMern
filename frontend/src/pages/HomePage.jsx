import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import { Sidebar } from "../components/Sidebar";
import { useChatStore } from "../context/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="mt-14 h-[calc(100vh-3.5rem)] flex overflow-hidden pt-2">
      <Sidebar />
      {selectedUser ? <ChatContainer /> : <NoChatSelected />}
    </div>
  );
};

export default HomePage;
