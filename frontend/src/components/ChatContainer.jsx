import { useChatStore } from "../context/useChatStore"
import React, { useEffect } from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeletons/MessageSkeleton";


function ChatContainer() {
  const {messages,getMessages,isMessagesLoading,selectedUser} = useChatStore();
 useEffect(()=>{
  getMessages(selectedUser._id);
 },[selectedUser, getMessages]);

 if (true) {
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
    <ChatHeade />
    <MessageInput/>
    </div>
  )
}

export default ChatContainer;
