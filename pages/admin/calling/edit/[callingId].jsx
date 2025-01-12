import CreateCallingForm from '@/components/admin/adminProfileSteps/calling/CreateCallingForm'
import ExpertDashboard from '@/components/admin/ExpertDashboard'
import { getRequestById } from '@/services/expertApi/callingService';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CallingEdit() {
    const id = useParams();
    const { callingId } = id || "";
    const [editData, setEditData] = useState();

    useEffect(() => {
        async function fetchDataHandler() {
            try {
                const { data } = await getRequestById(callingId);
                setEditData(data);
            } catch (error) {
                setEditData();
            }
        }

        if (callingId) {
            fetchDataHandler();
        }
    }, [callingId])

    return (
        <ExpertDashboard>
            {editData && <CreateCallingForm editData={editData} />}
        </ExpertDashboard>
    )
}
