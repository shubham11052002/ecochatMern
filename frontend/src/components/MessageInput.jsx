import { useRef, useState } from "react";
import { useChatStore } from "../context/useChatStore";
import { Image, Send, X, Smile } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      setShowEmojiPicker(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const cursor = inputRef.current.selectionStart;
    const newText =
      text.slice(0, cursor) + emoji + text.slice(cursor);
    setText(newText);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.selectionEnd = cursor + emoji.length;
    }, 0);
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div className="w-full p-2 relative bg-[#1e1e2e] rounded-t-lg shadow-md">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {showEmojiPicker && (
        <div className="absolute bottom-24 left-2 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 bg-[#2c2c3b] px-3 py-2 rounded-full"
      >
        <button
          type="button"
          className="text-white hover:text-yellow-400"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {showEmojiPicker ? <X size={22} /> : <Smile size={22} />}
        </button>

        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-white hover:text-emerald-400 transition-opacity"
          title="Attach image"
        >
          <Image size={22} />
        </button>

        <button
          type="submit"
          disabled={!canSend}
          className={`transition-all ${
            canSend
              ? "text-blue-500 hover:text-blue-400"
              : "text-gray-500 cursor-not-allowed opacity-50"
          }`}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
