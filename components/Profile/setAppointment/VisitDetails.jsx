import CheckBoxInput from "@/components/CheckBoxInput";
import Modal from "@/components/Modal";
import TextArea from "@/tools/TextArea";
import { useEffect, useState } from "react";
import { CiCalendar, CiEdit } from "react-icons/ci";
import { HiOutlineClock } from "react-icons/hi2";
import EditAppointmentForm from "./EditAppointmentForm";
import { useSearchParams } from "next/navigation";
import { getServiceProfile } from "@/services/expertApi/specialistServices";

export default function VisitDetails({ date, time, serviceData, type, setDateTime, setDescUser, descUser }) {
    const [modal, setModal] = useState(false);

    return (
        <div className="w-full bg-white border border-slate-200 dark:border-slate-500 rounded-lg p-6">
            <div className="flex flex-col gap-4 pb-4">
                <div className="text-primary-01 font-medium">
                    {serviceData?.type}
                </div>
                {
                    type === "turn" ?
                        <div className="grid grid-cols-2">
                            <div className="flex items-center gap-1 text-slate-600 text-sm">
                                <CiCalendar className="w-5 h-5 text-slate-500" />
                                نوبت: {date}
                            </div>
                            <div className="flex items-center gap-1 text-slate-600 text-sm">
                                <HiOutlineClock className="w-5 h-5 text-slate-500" />
                                ساعت: {time}
                            </div>
                        </div>
                        :
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-1 text-slate-600 text-sm">
                                <CiCalendar className="w-5 h-5 text-slate-500" />
                                تاریخ از {selected?.date.split(",")[0]}

                                <div>
                                    تا {selected?.date.split(",")[1]}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-slate-600 text-sm">
                                <HiOutlineClock className="w-5 h-5 text-slate-500" />
                                ساعت برگزاری: {selected?.time}
                            </div>
                        </div>
                }
                {
                    type === "turn" ?
                        <div>
                            <Modal title="ویرایش تاریخ و ساعت نوبت" open={modal} onClose={() => setModal(false)}>
                                <EditAppointmentForm
                                    onClose={() => setModal(false)}
                                    lastSelected={{ date, time }}
                                    onLastSelected={setDateTime}
                                    serviceData={serviceData}
                                />
                            </Modal>
                            <button onClick={() => setModal(true)} className="text-blue-600 !text-sm flex items-center gap-1 mr-auto">
                                ویرایش نوبت
                                <CiEdit className="w-5 h-5" />
                            </button>
                        </div> : null
                }
            </div>
            {
                type === "turn" ?
                    <div className="flex flex-col border-t border-slate-200 dark:border-slate-400 pt-4">
                        <div className="text-primary-01 font-medium mb-2">
                            توضیحات
                        </div>
                        <TextArea
                            label="شرح مراجعه"
                            value={descUser}
                            onChange={(e) => setDescUser(e.target.value)}
                        />
                    </div> : null
            }
        </div>
    )
}
