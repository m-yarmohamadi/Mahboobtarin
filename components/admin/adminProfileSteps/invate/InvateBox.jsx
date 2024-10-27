import useProfile from "@/hooks/useProfile";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";

export default function InvateBox() {
    const { user, isLoading } = useProfile();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/i/${user?.unique_url_id}`);
            toast.success("لینک دعوت کپی شد");
        } catch (err) {

        }
    };

    return (
        <div className="w-full max-w-fit mx-auto py-20 flex flex-col gap-2 items-center justify-center">
            <h2 className="text-textDefault font-medium">
                لینک دعوت از دوستان
            </h2>
            <div className="w-full flex items-center gap-2">
                <button onClick={copyToClipboard} className="btn btn--secondary !h-14 !w-14 !p-0">
                    <MdContentCopy className="w-5 h-5" />
                </button>
                <div className="w-full flex-1 h-14 px-4 bg-slate-300 text-textDefault font-bold flex items-center justify-center rounded-lg border border-slate-400">
                    {!isLoading && user && `${window.location.origin}/i/${user?.unique_url_id}`}
                </div>
            </div>
        </div>
    )
}
