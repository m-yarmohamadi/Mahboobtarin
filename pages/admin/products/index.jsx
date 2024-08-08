import ProductsList from "@/components/admin/adminProfileSteps/products/ProductsList";
import ExpertDashboard from "@/components/admin/ExpertDashboard";

export default function index() {
    return (
        <ExpertDashboard>
            <ProductsList />
        </ExpertDashboard>
    )
}
