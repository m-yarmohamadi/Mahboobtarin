import { useGetAllComments } from "@/hooks/expertHooks/useComment"
import LoadingAdmin from "../../LoadingAdmin";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import Modal from "@/components/Modal";
import ChangeStatusForm from "./ChangeStatusForm";
import TabGroup from "@/tools/TabGroup";

export default function CommentsList() {
    const { comments, isLoading } = useGetAllComments();

    const tabs = [
        { label: "همه نظرات" },
        { label: "نظرات تایید شده" },
        { label: "نظرات رد شده" },
    ]
    

    if (isLoading) return <LoadingAdmin />

    return (
        <TabGroup tabs={tabs}>
            <TabGroup.Item>
                <div className="flex flex-col w-full gap-4">
                    {comments?.map((item) => (
                        <CommentItem key={item.id} item={item} />
                    ))}
                </div>
            </TabGroup.Item>
            <TabGroup.Item>
                <div className="flex flex-col w-full gap-4">
                    {comments.filter((s) => s.status === "1").map((item) => (
                        <CommentItem key={item.id} item={item} />
                    ))}
                </div>
            </TabGroup.Item>
            <TabGroup.Item>
                <div className="flex flex-col w-full gap-4">
                    {comments.filter((s) => s.status === "2").map((item) => (
                        <CommentItem key={item.id} item={item} />
                    ))}
                </div>
            </TabGroup.Item>
        </TabGroup>
    )
}

function CommentItem({ item }) {
    const [changeStatus, setChangeStatus] = useState(false);

    const renderStatus = (status) => {
        switch (status) {
            case "0":
                return (<div className="text-xs text-blue-600">در حال بررسی</div>)
                break;

            case "1":
                return (<div className="text-xs text-green-600">فعال</div>)
                break;

            case "2":
                return (<div className="text-xs text-red-600">رد شده</div>)
                break;

            default:
                break;
        }
    }

    return (
        <div className="w-full p-6 bg-slate-200 rounded-lg flex flex-col justify-center items-start gap-1">
            <div className="w-full flex justify-between mb-4 items-center gap-4 text-slate-500 text-sm">
                <span className="font-bold text-sm text-slate-800">
                    {item.user.name} {item.user.lastname}
                </span>
                <span className="flex justify-start items-center gap-1 text-yellow-500">
                    {Array(Number(item.star)).fill({}).map((item, index) => (
                        <FaStar key={index} />
                    ))}
                </span>
            </div>
            <span className="text-slate-600 text-xs font-thin">
                {item.text}
            </span>
            <div className="w-full flex items-center justify-between">
                <div className="text-sm font-medium flex items-center gap-1 text-textDefault">
                    وضعیت:
                    {renderStatus(item.status)}
                </div>
                {/* <button onClick={() => setChangeStatus(true)} className="btn btn--primary">
                    تغییر وضعیت
                </button> */}
            </div>

            {/* <Modal title={'تغییر وضعیت'} open={changeStatus} onClose={() => setChangeStatus(false)}>
                <ChangeStatusForm onClose={() => setChangeStatus(false)} comment={item} />
            </Modal> */}
        </div>

    )
}