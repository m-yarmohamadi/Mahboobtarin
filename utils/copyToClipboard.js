import toast from "react-hot-toast";

export default function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text);
  toast.success(message);
}
