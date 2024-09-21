import Header from "@/components/Header";
import MainProfile from "@/components/Profile/Main/MainProfile";
import ProfileSearchBox from "@/components/Profile/profileSearchBox";
import useGetExpertiseUser from "@/hooks/useExpertiseUser";
import Loading from "@/tools/Loading";
import { Footer } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const { query } = useRouter();
  const { data, isLoading } = useGetExpertiseUser(query.expertiseId);

  if (isLoading && !data)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading customeColor="#0693a4" />
      </div>
    );

  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | پروفایل ${data?.user?.name} ${data?.user?.lastname}`}</title>
      </Head>
      <Header />
      <ProfileSearchBox />
      <div className="md:!pr-8 !p-0 container">
        <MainProfile
          userData={data?.user}
          isFollow={data?.is_follow}
          isLike={data?.is_favorit}
        />
      </div>
      <Footer />
    </>
  );
}
