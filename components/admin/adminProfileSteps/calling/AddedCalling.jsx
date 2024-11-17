import { useGetRequests } from "@/hooks/useDashboard";
import CallingItem from "./CallingItem";
import Loading from "@/tools/Loading";

export default function AddedCalling() {
    const { requests, isGetRequests } = useGetRequests();
    
    if (isGetRequests) return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading customeColor="#0693a4" />
        </div>
    )

    return (
        <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {requests?.registered?.map((item) => (
                <CallingItem key={item.id} data={item} isDelete/>
            ))}
        </div>
    )
}
