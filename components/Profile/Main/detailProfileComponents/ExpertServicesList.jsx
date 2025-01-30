import { useState } from "react";
import TitleItems from "../TitleItems";
import { useGetServicesProfile } from "@/hooks/expertHooks/useServices";
import { BsChatText } from "react-icons/bs";
import getPriceService from "@/components/admin/adminProfileSteps/myservices/getPriceService";
import Modal from "@/components/Modal";
import BookingForm from "../BookingForm";
import { FaClock } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import numberWithCommas from "@/utils/numberWithCommas";
import { MdDescription } from "react-icons/md";

export default function ExpertServicesList({ user }) {
    const [showIdeasDetail, setShowIdeasDetail] = useState(1);
    const { isLoadingServices, servicesData } = useGetServicesProfile(user?.id);
    const [modal, setModal] = useState(0);

    if (!isLoadingServices && servicesData && servicesData.length) {
        return (
            <div id="services">
                <div className="w-full">
                    <TitleItems title={"پلن های خدمات"} />
                    <div className="w-full flex flex-col justify-center items-center gap-2">
                        {!isLoadingServices &&
                            servicesData?.map((item, index) => {
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setShowIdeasDetail(index + 1)}
                                        className={`cursor-pointer w-full flex flex-col justify-center items-start gap-2 p-4 border border-slate-300 dark:border-slate-400 rounded-xl`}
                                    >
                                        <div
                                            onClick={() => setModal(item.id)}
                                            className="w-full flex-col sm:flex-row sm:items-center flex justify-between gap-4"
                                        >
                                            <div className=" flex items-center gap-2 truncate">
                                                <div>
                                                    <span className="rounded-lg flex justify-center items-center text-lg text-primary-01 bg-slate-300 bg-opacity-20 w-8 h-8">
                                                        <BsChatText />
                                                    </span>
                                                </div>
                                                <span className="font-bold text-sm truncate text-textDefault">
                                                    {item.type}
                                                </span>
                                            </div>
                                            <span className="text-primary-01 flex-1 justify-end items-center gap-1 flex text-sm pl-3 font-bold">
                                                {item.price_type === "custom" ? (
                                                    <>
                                                        {numberWithCommas(item.price)}
                                                        <span className="text-xs font-normal">تومان</span>
                                                    </>
                                                ) : (
                                                    getPriceService(item.price_type)
                                                )}
                                            </span>
                                        </div>
                                        <Modal
                                            title={item.type}
                                            open={modal === Number(item.id)}
                                            onClose={() => setModal(0)}
                                        >
                                            <BookingForm
                                                onClose={() => setModal(0)}
                                                serviceID={item.id}
                                                userId={user?.id}
                                                expert={user}
                                            />
                                        </Modal>
                                        {showIdeasDetail === index + 1 && (
                                            <div className="ps-2 flex flex-col justify-start items-center gap-2 text-slate-600">
                                                <div className="w-full flex justify-start items-center gap-1">
                                                    <span>
                                                        <MdDescription />
                                                    </span>
                                                    <span className="text-xs">
                                                        {item?.description}                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        )
    }
}
