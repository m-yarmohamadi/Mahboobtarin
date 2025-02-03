import CreateCourseForm from '@/components/admin/adminProfileSteps/academy/CreateCourseForm';
import ExpertDashboard from '@/components/admin/ExpertDashboard'
import LoadingAdmin from '@/components/admin/LoadingAdmin';
import { useAllOrOneAcademy } from '@/hooks/useAcademy';
import { useParams } from 'next/navigation';

export default function CourseEdit() {
    const { courseId } = useParams() || {};
    const { academyData, isLoading } = useAllOrOneAcademy(courseId);

    return (
        <ExpertDashboard>
            {!isLoading && academyData ? <CreateCourseForm editData={academyData.academy}/> : <LoadingAdmin />}
        </ExpertDashboard>
    )
}
