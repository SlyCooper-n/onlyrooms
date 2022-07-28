import { Copy } from "phosphor-react";
import toast from "react-hot-toast";

interface RoomCodeProps {
  roomCode: string;
}

export const RoomCode = ({ roomCode }: RoomCodeProps) => {
  async function copyCodeToClipboard() {
    try {
      await navigator.clipboard.writeText(
        `I'm inviting you to join me at http://localhost:3000/rooms\nEnter with this code: ${roomCode}`
      );
      toast.success("Copied to clipboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      onClick={copyCodeToClipboard}
      className="w-fit pr-2 flex items-center gap-2 bg-white rounded-md border border-primary"
    >
      <div className="p-2 bg-primary">
        <Copy size={24} color="white" />
      </div>
      <span className="text-base-100">#{roomCode}</span>
    </button>
  );
};
