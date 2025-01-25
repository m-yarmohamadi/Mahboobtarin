import ApplicantsFilter from "@/components/admin/adminProfileSteps/calling/applicants/ApplicantsFilter";
import ApplicantsList from "@/components/admin/adminProfileSteps/calling/applicants/ApplicantsList";
import ExpertDashboard from "@/components/admin/ExpertDashboard";
import LoadingAdmin from "@/components/admin/LoadingAdmin";
import { registerListRequestApi } from "@/services/expertApi/callingService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

const initial = { count: 0, list: [] };

export default function Applicants() {
    const params = useParams();
    const [applicants, setApplicants] = useState(initial);
    const [loading, setLoading] = useState(true);
    const newApplicantsCount = applicants.list.filter((l) => l.created_at === l.updated_at).length;

    useEffect(() => {
        async function fetchRegisterList() {
            try {
                const res = await registerListRequestApi(params.callingId);
                setApplicants(res);
            } catch (error) {
                setApplicants(initial);
            } finally {
                setLoading(false);
            }
        }

        if (params?.callingId) {
            fetchRegisterList();
        }
    }, [params])

    return (
        <ExpertDashboard>
            {
                !loading ?
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
                                        {applicants.count}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-primary-01">
                                    <span>
                                        متقاضیان جدید
                                    </span>
                                    <span className="text-yellow-500">
                                        {newApplicantsCount}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <ApplicantsFilter />
                        <ApplicantsList list={applicants.list} />
                    </div>
                    :
                    <LoadingAdmin />
            }
        </ExpertDashboard>
    )
}
