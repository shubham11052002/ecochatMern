import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e1e2e] text-white">
      <div className="text-center px-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-[#7f5af0]/10 flex items-center justify-center animate-bounce">
            <MessageSquare className="w-10 h-10 text-[#7f5af0]" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome to EcoChat!</h2>
        <p className="text-zinc-400">
          Select a chat from the sidebar to start messaging your friends.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
