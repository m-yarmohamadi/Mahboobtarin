import CreateProductForm from '@/components/admin/adminProfileSteps/products/CreateProductForm'
import ExpertDashboard from '@/components/admin/ExpertDashboard'
import { getOneProductApi } from '@/services/productService';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function ProductEdit() {
    const id = useParams();
    const { productId } = id || "";
    const [editData, setEditData] = useState();

    useEffect(() => {
        async function fetchDataHandler() {
            try {
                const res = await getOneProductApi(productId);
                setEditData(res.data);
            } catch (error) {
                setEditData();
            }
        }

        if (productId) {
            fetchDataHandler();
        }
    }, [productId])



    return (
        <ExpertDashboard>
            {editData && <CreateProductForm editData={editData} />}
        </ExpertDashboard>
    )
}
