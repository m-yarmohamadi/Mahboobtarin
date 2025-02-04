import Header from "@/components/Header";
import MainProfile from "@/components/Profile/Main/MainProfile";
import ProfileSearchBox from "@/components/Profile/profileSearchBox";
import http from "@/services/httpService";
import Loading from "@/tools/Loading";
import { Footer } from "flowbite-react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function ProfilePage({ user }) {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loading customeColor="#0693a4" />
            </div>
        );

    return (
        <>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | پروفایل ${user?.user?.name} ${user?.user?.lastname}`}</title>
            </Head>
            <Header />
            <ProfileSearchBox user={user?.user} />
            <div className="md:!pr-8 !p-0 container">
                <MainProfile
                    userData={user?.user}
                    isFollow={user?.is_follow}
                    isLike={user?.is_favorit}
                    isMarked={user?.is_mark}
                    popularList={user?.popular_list}
                    starsData={user?.stars}
                    commentsData={user?.comments_count}

          
                />
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps(ctx) {
    const { query, req } = ctx;

    try {
        const userToken = req.cookies.accessToken;

        let user;

        if (userToken) {
            const { data: userData } = await http.get(`/api/v1/user`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            user = userData.user;
        }

        const { data } = await http.get(
            `/api/v1/users/expertise/list/${query.expertUsername}${user ? `/${user.id}` : ""
            }`
        );

        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                user: data,
            },
        };

    } catch (error) {
        return {
            notFound: true,
        };
    }
}
