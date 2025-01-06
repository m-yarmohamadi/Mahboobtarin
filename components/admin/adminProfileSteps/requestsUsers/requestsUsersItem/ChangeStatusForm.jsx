import Loading from "@/tools/Loading";
import Select from "@/tools/Select";
import { useState } from "react";

const statusOptions = [
    { value: 0, label: "در انتظار تایید عرضه کننده" },
    { value: 2, label: "رد شده توسط عرضه کننده" },
    { value: 3, label: "تایید اولیه توسط شما" },
    { value: 4, label: "تایید نهایی" },
    { value: 5, label: "انجام شده" },
]

export default function ChangeStatusForm({ onClose, onSubmit, lastSelected, isLoading }) {
    const [selected, setSelected] = useState(lastSelected);

    return (
        <div>
            <Select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                options={statusOptions}
            />

            <div className="w-full grid grid-cols-2 gap-4 pt-4">
                <button onClick={() => onSubmit(selected)} className="btn btn--primary">
                    {isLoading ? <Loading width={45} /> : "ثبت"}
                </button>
                <button onClick={onClose} className="btn btn--outline">
                    لغو
                </button>
            </div>
        </div>
    )
}
