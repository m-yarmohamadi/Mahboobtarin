import CheckBoxInput from "@/components/CheckBoxInput";
import Modal from "@/components/Modal";
import { LanguagesData } from "@/data/LanguagesData";
import { useGetExpertisesList } from "@/hooks/useExpertiseUser";
import React, { useState } from "react";
import { BiSearch, BiSlider } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex justify-center items-center bg-white rounded-full cursor-pointer">
      <div className="w-full text-slate-400 dark:text-slate-500 p-3 flex justify-between items-center ">
        <div className=" text-sm w-full border-none focus:border-none ring-0 focus:ring-0 bg-transparent outline-none">
          جستجو در{" "}
          <span className="text-primary-01 font-bold text-base">
            محبوب‌ترین‌
          </span>
        </div>

        <IoSearch className="w-6 h-6" />
      </div>

      <div className="w-full h-full fixed top-0 right-0 bg-black/40 z-50"></div>
      <div className="w-full px-6 fixed z-[999] top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
        <div className="w-full mx-auto p-4 max-w-screen-md bg-white rounded-xl">
          <div className="w-full  h-12 gap-4 flex items-center justify-between">
            {/* filter button */}
            <button
              onClick={() => setOpen(true)}
              className="text-primary-01 px-4 h-full bg-slate-200 rounded-lg flex justify-center items-center text-sm font-bold gap-1"
            >
              <span className="rotate-90">
                <BiSlider className="w-5 h-5"/>
              </span>
              <span>فیلترها</span>
            </button>

            {/* search box */}
            <div className="w-full h-full px-4 flex items-center justify-between bg-slate-200 rounded-lg">
              <input
                placeholder="جستجو"
                className="w-full h-full bg-transparent border-0 outline-0 appearance-none text-sm text-slate-900"
              />
              <div>
                <FaArrowLeft className="w-5 h-5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FilterModal open={open} onClose={() => setOpen(false)} />
      {/* <div className="w-full rounded-e-full flex justify-end items-center gap-2  p-1 text-slate-400 dark:text-slate-600">
        <button
          onClick={() => setOpen(true)}
          className="flex justify-center items-center text-xl font-bold gap-1"
        >
          <span className=" rotate-90">
            <BiSlider />
          </span>
          <span>فیلترها</span>
        </button>
        <FilterModal open={open} onClose={() => setOpen(false)} />
        <div className=" hover:bg-opacity-80 bg-primary-01 rounded-full p-2 text-white font-bold text-2xl ">
          <BiSearch />
        </div>
      </div> */}
    </div>
  );
};

export default SearchBox;

function FilterModal({ open, onClose }) {
  const [openFilter, setOpenFilter] = useState();

  return (
    <Modal title="فیلتر ها" open={open} onClose={onClose} className="!z-[9999]">
      <div className="max-h-[300px] overflow-y-auto pl-3">
        <ExpertiseFilter
          show={openFilter}
          setShow={setOpenFilter}
          name="expertiseFilter"
        />
        <ServicesFilter
          show={openFilter}
          setShow={setOpenFilter}
          name="servicesFilter"
        />
        <CityFilter
          show={openFilter}
          setShow={setOpenFilter}
          name="cityFilter"
        />
        <GenderFilter
          show={openFilter}
          setShow={setOpenFilter}
          name="genderFilter"
        />
        <LanguageFilter
          show={openFilter}
          setShow={setOpenFilter}
          name="languageFilter"
        />
      </div>
      <div className="flex items-center gap-4 mt-3">
        <button className="w-1/2 btn btn--primary" onClick={onClose}>
          تایید
        </button>
        <button className="w-1/2 btn btn--outline" onClick={onClose}>
          لغو
        </button>
      </div>
    </Modal>
  );
}

function ExpertiseFilter({ show, setShow, name }) {
  const { data, isLoading } = useGetExpertisesList();

  return (
    <div
      className={`w-full overflow-hidden ${
        show === name ? "my-3 rounded-t-lg" : "my-2 rounded-lg"
      }`}
    >
      <button
        onClick={() => setShow(show === name ? "" : name)}
        className="w-full flex items-center justify-between p-3 bg-slate-200 text-slate-800 font-semibold"
      >
        حوزه تخصصی
        <FaAngleDown
          className={`w-4 h-4 duration-200 ${show === name && "rotate-180"}`}
        />
      </button>
      <div
        className={`w-full bg-slate-100 rounded-b-lg px-4 ${
          show === name ? "max-h-screen" : "max-h-0"
        } duration-300 ease-in-out`}
      >
        {!isLoading && (
          <ul>
            {data.map((item, index) => (
              <li
                key={index}
                className="w-full py-3 border-b border-b-slate-200 last:border-b-0"
              >
                <CheckBoxInput label={item.title} name={item.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ServicesFilter({ show, setShow, name }) {
  return (
    <div
      className={`w-full overflow-hidden ${
        show === name ? "my-3 rounded-t-lg" : "my-2 rounded-lg"
      }`}
    >
      <button
        onClick={() => setShow(show === name ? "" : name)}
        className="w-full flex items-center justify-between p-3 bg-slate-200 text-slate-800 font-semibold"
      >
        نوع خدمات
        <FaAngleDown
          className={`w-4 h-4 duration-200 ${show === name && "rotate-180"}`}
        />
      </button>
      <div
        className={`w-full bg-slate-100 rounded-b-lg px-4 ${
          show === name ? "max-h-screen" : "max-h-0"
        } duration-300 ease-in-out`}
      >
        <ul>
          {Array(4)
            .fill({ title: "تست" })
            .map((item, index) => (
              <li
                key={index}
                className="w-full py-3 border-b border-b-slate-200 last:border-b-0"
              >
                <CheckBoxInput label={item.title} name={`service-${index}`} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

function CityFilter({ show, setShow, name }) {
  return (
    <div
      className={`w-full overflow-hidden ${
        show === name ? "my-3 rounded-t-lg" : "my-2 rounded-lg"
      }`}
    >
      <button
        onClick={() => setShow(show === name ? "" : name)}
        className="w-full flex items-center justify-between p-3 bg-slate-200 text-slate-800 font-semibold"
      >
        شهر
        <FaAngleDown
          className={`w-4 h-4 duration-200 ${show === name && "rotate-180"}`}
        />
      </button>
      <div
        className={`w-full bg-slate-100 rounded-b-lg px-4 ${
          show === name ? "max-h-screen" : "max-h-0"
        } duration-300 ease-in-out`}
      >
        <ul>
          {Array(4)
            .fill({ title: "تست" })
            .map((item, index) => (
              <li
                key={index}
                className="w-full py-3 border-b border-b-slate-200 last:border-b-0"
              >
                <CheckBoxInput label={item.title} name={`city-${index}`} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

function GenderFilter({ show, setShow, name }) {
  const genders = [
    { label: "مرد", value: "man" },
    { label: "زن", value: "woman" },
  ];

  return (
    <div
      className={`w-full overflow-hidden ${
        show === name ? "my-3 rounded-t-lg" : "my-2 rounded-lg"
      }`}
    >
      <button
        onClick={() => setShow(show === name ? "" : name)}
        className="w-full flex items-center justify-between p-3 bg-slate-200 text-slate-800 font-semibold"
      >
        جنسیت
        <FaAngleDown
          className={`w-4 h-4 duration-200 ${show === name && "rotate-180"}`}
        />
      </button>
      <div
        className={`w-full bg-slate-100 rounded-b-lg px-4 ${
          show === name ? "max-h-screen" : "max-h-0"
        } duration-300 ease-in-out`}
      >
        <ul>
          {genders.map((item, index) => (
            <li
              key={index}
              className="w-full py-3 border-b border-b-slate-200 last:border-b-0"
            >
              <CheckBoxInput label={item.label} name={item.value} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LanguageFilter({ show, setShow, name }) {
  return (
    <div
      className={`w-full overflow-hidden ${
        show === name ? "my-3 rounded-t-lg" : "my-2 rounded-lg"
      }`}
    >
      <button
        onClick={() => setShow(show === name ? "" : name)}
        className="w-full flex items-center justify-between p-3 bg-slate-200 text-slate-800 font-semibold"
      >
        زبان
        <FaAngleDown
          className={`w-4 h-4 duration-200 ${show === name && "rotate-180"}`}
        />
      </button>
      <div
        className={`w-full bg-slate-100 rounded-b-lg px-4 ${
          show === name ? "max-h-screen" : "max-h-0"
        } duration-300 ease-in-out`}
      >
        <ul>
          {LanguagesData.map((item, index) => (
            <li
              key={index}
              className="w-full py-3 border-b border-b-slate-200 last:border-b-0"
            >
              <CheckBoxInput label={item.label} name={item.value} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WorkAddressFilter({ show, setShow, name }) {
  return (
    <div
      className={`w-full overflow-hidden ${
        show === name ? "my-3 rounded-t-lg" : "my-2 rounded-lg"
      }`}
    >
      <button
        onClick={() => setShow(show === name ? "" : name)}
        className="w-full flex items-center justify-between p-3 bg-slate-200 text-slate-800 font-semibold"
      >
        محل کار
        <FaAngleDown
          className={`w-4 h-4 duration-200 ${show === name && "rotate-180"}`}
        />
      </button>
      <div
        className={`w-full bg-slate-100 rounded-b-lg px-4 ${
          show === name ? "max-h-screen" : "max-h-0"
        } duration-300 ease-in-out`}
      >
        <ul>
          {Array(4)
            .fill({ title: "تست" })
            .map((item, index) => (
              <li
                key={index}
                className="w-full py-3 border-b border-b-slate-200 last:border-b-0"
              >
                <CheckBoxInput label={item.title} name={`city-${index}`} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
