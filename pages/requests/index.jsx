import CallingItem from "@/components/admin/adminProfileSteps/calling/CallingItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useMainPage, { useGetAllRequests } from "@/hooks/useMainPage";
import Loading from "@/tools/Loading";
import Select from "@/tools/Select";

export default function RequestsPage() {
    const { transformCategories, isLoading } = useMainPage();
    const { requests, isLoading: isGetRequests } = useGetAllRequests();
    
    return (
        <>
            <Header />
            <div className="container py-10 ">
                <div className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-white rounded-xl p-4">
                    <h1 className="text-xl font-bold text-slate-800">
                        فراخوان
                    </h1>
                    <div className="md:w-[250px]">
                        <Select
                            options={!isLoading ? [{ value: "", label: "فیلتر بر اساس دسته بندی..." }, ...transformCategories] : [{ value: "", label: "فیلتر بر اساس دسته بندی..." }]}
                        />
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 pt-8">
                    {!isGetRequests && requests?.map((item, index) => (
                        <CallingItem key={index} data={item} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}
