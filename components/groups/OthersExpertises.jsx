import Specialties from "@/data/Specialties";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

export default function OthersExpertises() {
    return (
        <div>
            <span className="w-full text-textDefault flex justify-center items-center p-2 font-bold">
                سایر تخصص ها
            </span>
            <div className="w-full bg-slate-200 dark:bg-slate-300 shadow-lg dark:shadow-darkLg h-full rounded-md">
                <div className="flex flex-wrap gap-2 p-3">
                    {Specialties.map((item, index) => {
                        return (
                            <div key={index}>
                                <span className="flex justify-between items-center gap-1 bg-slate-400 shadow-md dark:shadow-darkMd text-textDefault text-xs p-2 rounded-md">
                                    <span>{item}</span>
                                    <span>
                                        <FaAngleLeft />
                                    </span>
                                </span>{" "}
                            </div>
                        );
                    })}
                </div>
                <div className="w-full flex justify-center items-center py-2">
                    <div className="btn btn--secondary">
                        <span>
                            <FaAngleDown />
                        </span>
                        <button type="button">مشاهده بیشتر</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
