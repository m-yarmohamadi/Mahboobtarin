import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginregisterProfile from "@/components/Profile/Main/LoginregisterProfile";
import MainProfile from "@/components/Profile/Main/MainProfile";
import ProfileSearchBox from "@/components/Profile/profileSearchBox";
import Head from "next/head";
import React from "react";

const profile = () => {
  return (
    <div>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | پروفایل`}</title>
      </Head>
      <Header />
      <ProfileSearchBox />
      <MainProfile />
      <Footer />
    </div>
  );
};

export default profile;
