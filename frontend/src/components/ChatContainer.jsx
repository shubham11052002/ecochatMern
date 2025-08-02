import { useChatStore } from "../context/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuth } from "../context/useAuth";
import { formatMessageTime } from "../lib/utils";
import { Avatar, Card } from "@nextui-org/react";
import { motion } from "framer-motion";

const ChatContainer = () => {
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuth();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
  
    getMessages(selectedUser._id);
    subscribeToMessages();
  
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
  {messages.map((message) => (
    <motion.div
      key={message._id}
      initial="hidden"
      animate="visible"
      variants={messageVariants}
      className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
      ref={messageEndRef}
    >
      <div className={`flex max-w-[85%] gap-2 ${message.senderId === authUser._id ? "flex-row-reverse" : ""}`}>
        <Avatar
          isBordered
          size="sm"
          src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
          className="flex-shrink-0 mt-auto"
        />
        <div className="flex flex-col">
          <span className={`text-xs text-default-500 mb-1 ${message.senderId === authUser._id ? "text-right" : "text-left"}`}>
            {formatMessageTime(message.createdAt)}
          </span>
          <Card
            className={`px-4 py-2 rounded-xl shadow-sm ${
              message.senderId === authUser._id
                ? "bg-primary-500 text-white rounded-br-none"
                : "bg-default-100 dark:bg-default-200 rounded-bl-none"
            }`}
            shadow="none"
          >
            {message.image && (
              <img
                src={message.image}
                alt="Attachment"
                className="max-w-[200px] rounded-lg mb-2"
              />
            )}
            {message.text && <p className="text-sm">{message.text}</p>}
          </Card>
        </div>
      </div>
    </motion.div>
  ))}
</div>
      <MessageInput />
    </div>
  );
};
export default ChatContainer;