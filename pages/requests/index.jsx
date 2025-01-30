import { IncomingCallingItem } from "@/components/admin/adminProfileSteps/calling/IncomingCalling";
import Footer from "@/components/Footer";
import GroupSearchBox from "@/components/Group/GroupSearchBox";
import { Search } from "@/components/groups/filters/GroupFilters";
import Header from "@/components/Header";
import RequestFilter from "@/components/requests/filters/RequestFilter";
import RequestExpertise from "@/components/requests/RequestExpertise";
import useMainPage, { useGetAllRequests } from "@/hooks/useMainPage";
import { filterRequests } from "@/services/mainPageService";
import Loading from "@/tools/Loading";
import { useEffect, useState } from "react";

export default function RequestsPage() {
    const { requests, isLoading: isGetRequests } = useGetAllRequests();
    const [resRequests, setResRequests] = useState([]);
    const { categories, isLoading } = useMainPage();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterObj, setFilterObj] = useState({
        "category": "",
        "location": "",
        "gender": "",
        "collaboration": "",
        "pyment_type": "",
        "type": ""
    });
    const changeFilterHandler = (name, value) => {
        setFilterObj((prevState) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {
        if (!isGetRequests) {
            setResRequests(requests);
        }
    }, [isGetRequests, requests])

    useEffect(() => {
        async function filterRequestsHandler() {
            try {
                const { requests } = await filterRequests(filterObj);
                setResRequests(requests)
            } catch (error) {
                setResRequests([...requests])
            }
        }

        filterRequestsHandler();
    }, [filterObj])

    if (isLoading || isGetRequests) return (
        <div className="w-full h-screen flex items-center justify-center">
            <Loading customeColor={'#0693a4'} />
        </div>
    );

    return (
        <>
            <Header />
            <GroupSearchBox />
            <div className="container -mt-40 px-0 md:px-10">
                <div className="w-full bg-white rounded-3xl">
                    <div className="w-full lg:grid grid-cols-12">
                        <div className="hidden lg:flex flex-col gap-4 col-span-3 border-l border-slate-300 p-4 lg:p-6">
                            <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <RequestExpertise
                                data={categories}
                                searchTerm={searchTerm}
                                setFilter={changeFilterHandler}
                            />
                        </div>
                        <div className="lg:col-span-9 p-4 lg:p-6">
                            <RequestFilter
                                categories={categories}
                                filterObj={filterObj}
                                changeFilterHandler={changeFilterHandler}
                            />
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-6">
                                {!isGetRequests && resRequests?.map((item, index) => (
                                    <IncomingCallingItem key={index} data={item} isPublic />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
