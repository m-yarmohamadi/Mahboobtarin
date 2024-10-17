import CheckBoxInput from "@/components/CheckBoxInput";
import Modal from "@/components/Modal";
import TextArea from "@/tools/TextArea";
import { useState } from "react";
import { CiCalendar, CiEdit } from "react-icons/ci";
import { HiOutlineClock } from "react-icons/hi2";
import EditAppointmentForm from "./EditAppointmentForm";

export default function VisitDetails() {
    const [selected, setSelected] = useState({ date: new Date().toLocaleDateString("fa-IR"), time: "22:00" });
    const [modal, setModal] = useState(false);

    return (
        <div className="w-full bg-white border border-slate-200 dark:border-slate-500 rounded-lg p-6">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 mb-4">
                <div className="text-primary-01 font-medium">
                    نوع ویزیت
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex items-center gap-1 text-slate-600 text-sm">
                        <CiCalendar className="w-5 h-5 text-slate-500" />
                        نوبت: {selected?.date}
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 text-sm">
                        <HiOutlineClock className="w-5 h-5 text-slate-500" />
                        ساعت: {selected?.time}
                    </div>
                </div>
                <div>
                    <Modal title="ویرایش تاریخ و ساعت نوبت" open={modal} onClose={() => setModal(false)}>
                        <EditAppointmentForm
                            onClose={() => setModal(false)}
                            lastSelected={selected}
                            onLastSelected={setSelected}
                        />
                    </Modal>
                    <button onClick={() => setModal(true)} className="text-blue-600 !text-sm flex items-center gap-1 mr-auto">
                        ویرایش نوبت
                        <CiEdit className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-primary-01 font-medium mb-2">
                    علت مراجعه
                </div>
                <ul className="w-full flex items-center gap-10 mb-6">
                    <div>
                        <CheckBoxInput label="شرح 1" name="1" />
                    </div>
                    <div>
                        <CheckBoxInput label="شرح 2" name="2" />
                    </div>
                </ul>
                <TextArea
                    label="شرح مراجعه"
                />
            </div>
        </div>
    )
}
