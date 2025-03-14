import Head from "next/head";
import GroupSearchBox from "../Group/GroupSearchBox";
import GroupFilters, { Search } from "./filters/GroupFilters";
import GroupExpertises from "./GroupExpertises";
import Loading from "@/tools/Loading";
import News from "../News";
import OthersExpertises from "./OthersExpertises";
import useMainPage from "@/hooks/useMainPage";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import http from "@/services/httpService";
import GroupUserItem from "./GroupUserItem";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";

export default function Groups({ groupData, expertiseId }) {
    const { categories, isLoading } = useMainPage();
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState(groupData.data);
    const [currentPage, setCurrentPage] = useState(groupData.pagination.current_page);
    const [hasMore, setHasMore] = useState(groupData.pagination.current_page < groupData.pagination.last_page);
    const searchParams = useSearchParams();
    const filters = Object.fromEntries(searchParams.entries());

    const loadMoreUsers = async () => {
        const nextPage = currentPage + 1;

        try {
            const { data: newData } = await http.get(`/api/v1/users/experts/${expertiseId}?page=${nextPage}&${queryString.stringify(filters)}`);
            setUsers((prevUsers) => [...prevUsers, ...newData.data]);
            setCurrentPage(nextPage);
            setHasMore(nextPage < newData.pagination.last_page);
        } catch (error) {
            console.error("Error loading more products:", error);
        }
    };

    useEffect(() => {
        setUsers(groupData.data);
        setCurrentPage(groupData.pagination.current_page);
        setHasMore(groupData.pagination.current_page < groupData.pagination.last_page);
    }, [expertiseId, filters?.order])

    if (isLoading) return (
        <div className="w-full h-screen flex items-center justify-center">
            <Loading customeColor={'#0693a4'} />
        </div>
    );

    return (
        <>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | گروه ها`}</title>
            </Head>
            <GroupSearchBox />
            <div className="container -mt-40 px-0 md:px-10">
                <div className="w-full bg-white rounded-3xl">
                    <div className="w-full lg:grid grid-cols-12 items-start border-b border-b-slate-300 relative">
                        <div className="hidden lg:sticky top-[76px] right-0 lg:flex flex-col gap-4 col-span-3 border-l border-slate-300 p-4 lg:p-6">
                            <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <GroupExpertises data={categories} searchTerm={searchTerm} />
                        </div>
                        <div className="lg:col-span-9 p-4 lg:p-6">
                            <GroupFilters expertiseId={expertiseId} categories={categories} />
                            <div className="w-full pt-6">
                                <InfiniteScroll
                                    dataLength={users.length}
                                    next={loadMoreUsers}
                                    hasMore={hasMore}
                                    loader={
                                        <div className="w-full py-16 flex items-center justify-center">
                                            <Loading width={50} customeColor={"#0693a4"} />
                                        </div>
                                    }
                                    scrollThreshold={0.5}
                                >
                                    <div className="w-full flex flex-col gap-4">
                                        {
                                            users && users.length ?
                                                users.map((user, index) => (
                                                    <GroupUserItem key={index} user={user} />
                                                ))
                                                :
                                                <div className="w-full py-28 flex flex-col gap-4 items-center justify-center">
                                                    <img src="/images/emptyList.png" alt="" />
                                                    <div className="text-slate-800 font-medium">
                                                        متخصصی یافت نشد!
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </InfiniteScroll>
                            </div>

                        </div>
                    </div>
                    <div className="p-4 lg:p-6">
                        <News />
                    </div>
                    <div className="p-4 lg:p-6">
                        <OthersExpertises />
                    </div>
                    {/* <div className="p-4 lg:p-6">
                        <LoginregisterProfile />
                    </div> */}
                </div>
            </div>
        </>
    )
}
