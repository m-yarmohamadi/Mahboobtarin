import { changeStatusComment } from "@/services/expertDashboardService";
import Loading from "@/tools/Loading";
import Select from "@/tools/Select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const statusOptions = [
    { value: "0", label: "در حال بررسی" },
    { value: "1", label: "فعال" },
    { value: "2", label: "رد شده" }
]

export default function ChangeStatusForm({ comment, onClose }) {
    const [status, setStatus] = useState(comment.status);
    const { mutateAsync, isPending } = useMutation({ mutationFn: changeStatusComment });
    const queryClient = useQueryClient();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await mutateAsync({ id: comment.id, status });
            if (data) {
                toast.success("وضعیت تغییر یافت");
                onClose();
                queryClient.invalidateQueries({ queryKey: ["get-comments-dashboard"] });
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                window.location.reload();
                return;
            }
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <Select
                label={'وضعیت'}
                options={statusOptions}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            <div className="w-full pt-4 grid grid-cols-2 gap-4">
                <button type="submit" className="btn btn--primary">
                    {isPending ? <Loading /> : "تایید"}
                </button>
                <button onClick={onClose} type="button" className="btn btn--outline">
                    لغو
                </button>
            </div>
        </form>
    )
}
