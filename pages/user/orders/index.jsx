import OrdersList from "@/components/userNormal/dashboardPages/orders/OrdersList";
import UserNormalDashboard from "@/components/userNormal/UserNormalDashboard";

export default function OrdersUser() {
    return (
        <UserNormalDashboard>
            <OrdersList />
        </UserNormalDashboard>
    )
}
