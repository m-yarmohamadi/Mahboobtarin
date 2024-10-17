import Header from "@/components/Header";
import Login2 from "@/components/Login/Login2";
import Head from "next/head";

const login = () => {
  return (
    <div>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | ورود به سایت`}</title>
      </Head>
      <Header />
      <div className="w-full h-full p-4 md:p-10  transition-all duration-1000 ease-in-out">
        <div className="w-full lg:w-1/2 mx-auto h-full bg-white rounded-md shadow-md dark:shadow-darkMd p-4">
          <div className="w-full  border border-primary-01 shadow-xl  h-full px-10 pt-10 mx-auto flex flex-col justify-between items-center rounded-lg  bg-primary-01 bg-opacity-10">
            <Login2 />
          </div>
        </div>
        <div className="w-1/2 mx-auto flex justify-end items-end pt-1">
          <span className="text-xs text-slate-400">
            کلیه حقوق این سرویس (وبسایت و اپلیکیشن های موبایل) محفوظ و متعلق به
            شرکت هنر ایرانیان می باشد
          </span>
        </div>
      </div>
    </div>
  );
};

export default login;
