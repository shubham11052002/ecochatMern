import { useEffect, useState } from "react";
import { useChatStore } from "../context/useChatStore";
import { useAuth } from "../context/useAuth";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";

export const Sidebar = () => {
  const { getUsers, users = [], selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuth();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = (Array.isArray(users) ? users : []).filter((user) =>
    showOnlineOnly ? onlineUsers.includes(user._id) : true
  );

  if (isUsersLoading) return <SidebarSkeleton />;
  const onlineCount = (onlineUsers?.length || 0) - 1;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-[#1e1e2e] text-white">
      {/* Header Section */}
      <div className="border-b border-base-300 w-full px-4 py-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="mt-3 hidden lg:flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-success"
            />
            Show online only
          </label>
          <span className="text-xs text-zinc-400">({onlineCount + 2} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full px-3 py-2 flex items-center gap-3 
              hover:bg-[#2c2c3b] transition-colors
              ${selectedUser?._id === user._id ? "bg-[#2c2c3b] ring-1 ring-[#444]" : ""}`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-black" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-400 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};
