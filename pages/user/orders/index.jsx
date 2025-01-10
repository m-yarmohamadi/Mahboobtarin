import OrdersList from "@/components/admin/adminProfileSteps/orders/OrdersList";
import UserNormalDashboard from "@/components/userNormal/UserNormalDashboard";

export default function OrdersUser() {
    return (
        <UserNormalDashboard>
            <OrdersList />
        </UserNormalDashboard>
    )
}
