import { X } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { useChatStore } from "../context/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuth();

  return (
    <div className="p-3 border-b border-zinc-700 bg-[#1e1e2e] rounded-t-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-zinc-600 shadow-sm">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="object-cover w-full h-full"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1e1e2e] ${
                onlineUsers.includes(selectedUser._id)
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-white text-base">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-zinc-400">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="p-1.5 rounded-full hover:bg-zinc-800 transition"
          title="Close Chat"
        >
          <X className="text-zinc-300 hover:text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
