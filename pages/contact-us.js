import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MdContactPhone } from "react-icons/md";
import useAllSettings from "@/hooks/useAllSettings";
import ContactUsForm from "@/components/contactUs/ContactUsForm";

const contactUs = () => {
  const data = useAllSettings();

  return (
    <div>
      <Header />
      <div>
        <div className="w-full bg-primary-01 p-4 my-4  font-black text-white text-xl drop-shadow-xl flex justify-center items-center gap-1">
          <span className="text-2xl text-primary-02">
            <MdContactPhone />
          </span>
          <span>تماس با ما</span>
        </div>
        <div className=" container w-full flex flex-col justify-center items-start gap-4 py-8">
          <p className="w-full font-black text-3xl flex justify-center items-center">
            {data?.title}
          </p>

          <p className="w-full flex justify-center items-center font-bold text-xl py-8">
            کاربر گرامی! شما می توانید همه روزه از ساعت 8 الی 22 از طریق شماره
            تماس 02182800011 با پشتیبانی محبوب‌ترین تماس حاصل نمایید.
          </p>
          <p>{data?.address}</p>
          <p className="font-bold">
            <span className="font-normal">{`شماره تماس:`} </span>

            {data?.phones}
          </p>
          <p className="font-bold">
            <span className="font-normal ">{`شماره موبایل:`} </span>

            {data?.mobile}
          </p>
        </div>

        <ContactUsForm />
      </div>
      <Footer />
    </div>
  );
};

export default contactUs;
