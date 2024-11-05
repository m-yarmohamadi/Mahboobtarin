import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import Baner from "@/components/Baner";
import Services from "@/components/Services";
import PopularMounth from "@/components/PopularMounth";
import Baner02 from "@/components/Baner02";
import FrequentSearches from "@/components/FrequentSearches";
import Baner03 from "@/components/Baner03";
import Recommended from "@/components/Recommended";
import News from "@/components/News";
import Baner04 from "@/components/Baner04";
import Store from "@/components/Store";
import Resume from "@/components/Resume";
import useMainPage from "@/hooks/useMainPage";
import LoadingPage from "@/components/LoadingPage";
import LatestRegistrations from "@/components/LatestRegistrations";

const Index = () => {
  const { isLoading } = useMainPage();
  const [isContentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 300); // زمان تاخیر برای افکت
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="w-full max-w-full h-full max-h-full box-content">
      {/* لایه موقت */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
          <LoadingPage />
        </div>
      )}

      {/* محتوای اصلی */}
      <div
        className={`transition-opacity duration-1000 ${isContentVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <Header />
        <Slider />
        <Baner />
        <PopularMounth />
        <Services />
        <Baner02 />
        <FrequentSearches />
        <Baner03 />
        <Recommended />
        <News />
        <Baner04 />
        <LatestRegistrations />
        {/* <Store /> */}
        <Resume />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
