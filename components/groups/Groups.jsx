import Head from "next/head";
import GroupSearchBox from "../Group/GroupSearchBox";
import GroupFilters, { Search } from "./filters/GroupFilters";
import GroupsList from "./GroupsList";
import GroupExpertises from "./GroupExpertises";
import Loading from "@/tools/Loading";
import { useGetExpertisesList } from "@/hooks/useExpertiseUser";
import News from "../News";
import OthersExpertises from "./OthersExpertises";
import LoginregisterProfile from "../Profile/Main/LoginregisterProfile";

export default function Groups() {
    const { data, isLoading } = useGetExpertisesList();

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
                    <div className="w-full lg:grid grid-cols-12 border-b border-b-slate-300">
                        <div className="hidden lg:flex flex-col gap-4 col-span-3 border-l border-slate-300 p-4 lg:p-6">
                            <Search />
                            <GroupExpertises data={data} />
                        </div>
                        <div className="lg:col-span-9 p-4 lg:p-6">
                            <GroupFilters />
                            <GroupsList />
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
