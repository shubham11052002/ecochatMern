import { useEffect, useState } from "react";
import { useChatStore } from "../context/useChatStore";
import { useAuth } from "../context/useAuth";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";

export const Sidebar = () => {
  const { getUsers, users = [], selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers = [], authUser: user ,currentUser} = useAuth();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users?.filter((u) =>
    showOnlineOnly ? onlineUsers.includes(u._id) : true
  );

  const onlineCount = onlineUsers?.filter((id) => id !== user?._id)?.length || 0;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-[#1e1e2e] text-white">
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
          <span className="text-xs text-zinc-400">({onlineCount} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1">
      {users
  ?.filter((user) => user && user._id !== currentUser?._id)
  .map((user) => (
    <div
      key={user?._id}
      onClick={() => setSelectedUser(user)}
      className={`p-3 flex items-center space-x-4 hover:bg-[#363949] rounded-lg cursor-pointer ${
        selectedUser?._id === user?._id ? "bg-[#363949]" : ""
      }`}
    >
      <img
        src={user?.profilePic || "/default-avatar.png"}
        alt="User"
        className="w-10 h-10 rounded-full object-cover"
      />
      <p className="text-white font-medium">{user?.fullName || "Unknown User"}</p>
    </div>
  ))}


        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-400 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};
