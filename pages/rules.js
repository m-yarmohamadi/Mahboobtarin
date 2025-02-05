import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FcAbout } from "react-icons/fc";
import useAllSettings from "@/hooks/useAllSettings";
import { FaQuestion, FaRegQuestionCircle } from "react-icons/fa";

const rules = () => {
  const data = useAllSettings();

  return (
    <div>
      <Header />
      <div>
        <div className="w-full bg-primary-01 p-4 my-4  font-black text-white text-xl drop-shadow-xl flex justify-center items-center gap-1">
          <span className="text-2xl text-primary-02">
            <FaRegQuestionCircle />
          </span>
          <span>قوانین و مقررات</span>
        </div>
        <div className=" container w-full flex flex-col justify-center items-start gap-4 py-4 text-justify">
          <p
            className="w-full  flex  flex-col justify-center items-start gap-4 text-justify text-primary-01 "
            dangerouslySetInnerHTML={{ __html: data?.rules }}
          ></p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default rules;
