import CommentsList from "@/components/admin/adminProfileSteps/comments/CommentsList";
import ExpertDashboard from "@/components/admin/ExpertDashboard";

export default function comments() {
    return (
        <ExpertDashboard>
            <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                <h1 className="text-xl text-slate-800 font-semibold">
                    نظرات
                </h1>
            </div>
            <CommentsList />
        </ExpertDashboard>
    )
}
