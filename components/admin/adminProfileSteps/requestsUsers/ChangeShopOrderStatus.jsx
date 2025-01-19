import { useChangeShopOrdersStatus } from "@/hooks/expertHooks/useRequestsClient";
import Loading from "@/tools/Loading";
import Select from "@/tools/Select";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const statusOptions = [
    { value: 0, label: "در حال پردازش" },
    { value: 1, label: "بررسی شده" },
    { value: 2, label: "ارسال به پست" },
    { value: 3, label: "دریافت توسط مشتری" },
]

export default function ChangeShopOrderStatus({ onClose, lastSelected, orderid }) {
    const [selected, setSelected] = useState(lastSelected);

    const { changeStatusShopOrder, isPending } = useChangeShopOrdersStatus();
    const queryClient = useQueryClient();

    const changeStatusHandler = async (statusNum) => {
        changeStatusShopOrder({ orderid, status: statusNum.toString() }, {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ["requests-client"] });
                onClose();
            }
        })
    }

    return (
        <div>
            <Select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                options={statusOptions}
            />

            <div className="w-full grid grid-cols-2 gap-4 pt-4">
                <button onClick={() => changeStatusHandler(selected)} className="btn btn--primary">
                    {isPending ? <Loading width={45} /> : "ثبت"}
                </button>
                <button onClick={onClose} className="btn btn--outline">
                    لغو
                </button>
            </div>
        </div>
    )
}
