import ApplicantsFilter from "@/components/admin/adminProfileSteps/calling/applicants/ApplicantsFilter";
import ApplicantsList from "@/components/admin/adminProfileSteps/calling/applicants/ApplicantsList";
import ExpertDashboard from "@/components/admin/ExpertDashboard";
import { FaAngleLeft } from "react-icons/fa6";

export default function Applicants() {
    return (
        <ExpertDashboard>
            <div className="w-full">
                <div className="w-full mb-6 flex flex-col justify-between whitespace-nowrap gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-1 text-xs md:text-sm text-slate-800">
                        فراخوان
                        <FaAngleLeft />
                        <span className="text-primary-01">
                            لیست متقاضیان
                        </span>
                    </div>

                    <div className="flex items-center gap-7 self-end">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary-01">
                            <span>
                                کل متقاضیان
                            </span>
                            <span>
                                126
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-primary-01">
                            <span>
                                متقاضیان جدید
                            </span>
                            <span className="text-yellow-500">
                                26
                            </span>
                        </div>
                    </div>
                </div>

                <ApplicantsFilter />
                <ApplicantsList />
            </div>
        </ExpertDashboard>
    )
}
