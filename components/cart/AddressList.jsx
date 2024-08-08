import useProfile, { useGetAddress } from "@/hooks/useProfile";
import Loading from "@/tools/Loading";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import Modal from "../Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/tools/Input";
import { useGetCity, useGetProvinces } from "@/hooks/useCity";
import Select from "@/tools/Select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUserAddress } from "@/services/authService";
import toast from "react-hot-toast";
import { MdAdd, MdOutlinePhoneIphone, MdOutlineSubtitles } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";

export default function AddressList() {
    const { addressList, isLoading } = useGetAddress();
    const [open, setOpen] = useState(false);

    const deleteAddressHandler = () => {

    }

    if (isLoading) return (
        <div className="w-full flex items-center justify-center py-4">
            <Loading customeColor="#15aa7f" />
        </div>
    )

    return (
        <div className="w-full border border-slate-300 rounded-xl p-6">
            <Modal open={open} onClose={() => setOpen(false)} title="آدرس جدید">
                <CreateAddressForm onClose={() => setOpen(false)} />
            </Modal>
            <div>
                <span className="text-xs text-gray-500">
                    آدرس تحویل سفارش
                </span>
            </div>
            <div className="mt-2 space-y-6 lg:max-h-[350px] lg:overflow-y-auto lg:pl-6">
                {addressList.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 border-b border-gray-300 pb-6 last:pb-0 last:border-0">
                        <div className={`w-5 h-5 p-[3px] mt-[2px] border rounded-full ${item.defaultaddress === "1" ? "border-gray-500 bg-transparent" : "border-primary-01"}`}>
                            {item.defaultaddress === "1" &&
                                <div className="w-full h-full bg-primary-01 rounded-full"></div>
                            }
                        </div>
                        <div className="flex flex-col gap-5 flex-1">
                            <p className="text-gray-800">
                                {item.address}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 ">
                                    <MdOutlineSubtitles className="text-gray-400" />
                                    <span className="text-xs text-gray-600">
                                        {item.title || "بدون عنوان"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <HiOutlineMail className="text-gray-400" />
                                    <span className="text-xs text-gray-600">
                                        {item.postalcode || "---"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <MdOutlinePhoneIphone className="text-gray-400" />
                                    <span className="text-xs text-gray-600">
                                        {item.phone || "---"}
                                    </span>
                                </div>
                            </div>

                            <div className="w-full flex justify-end">
                                <button className="text-error text-sm font-medium flex items-center gap-1">
                                    <HiOutlineTrash className="w-5 h-5" />
                                    حذف آدرس
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full mt-4">
                <button onClick={() => setOpen(true)} className="w-full flex items-center justify-center gap-1 text-primary-01 pt-4 mt-5 border-t border-t-slate-300 font-bold">
                    آدرس جدید
                    <MdAdd className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}


function CreateAddressForm({ onClose }) {
    const initialValues = {
        title: "",
        address: "",
        postalcode: "",
        ostan: "",
        shahr: "",
        phone: "",
        defaultaddress: "1"
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("عنوان آدرس را وارد نمایید"),
        address: Yup.string().required("آدرس را وارد نمایید"),
        postalcode: Yup.string().required("کد پستی را وارد نمایید"),
        ostan: Yup.string().required("استان را انتخاب نمایید"),
        shahr: Yup.string().required("شهر را انتخاب نمایید"),
        phone: Yup.string().required("شماره تماس را وارد کنید"),
    })

    const { mutate, isPending } = useMutation({ mutationFn: setUserAddress });
    const { user } = useProfile();
    const queryClient = useQueryClient();

    const onSubmit = (values) => {
        const addressData = {
            title: values.title,
            address: values.address,
            postalcode: values.postalcode,
            ostan: values.ostan,
            shahr: values.shahr,
            phone: values.phone,
            defaultaddress: "1",
            lat: "35.25",
            lng: "36.55"
        }

        if (user) {
            const formData = new FormData();
            for (const key in addressData) {
                formData.append(key, addressData[key]);
            }

            mutate(formData, {
                onSuccess: ({ data }) => {
                    if (data.status === 200) {
                        toast.success("آدرس با موفقیت اضافه شد");
                        queryClient.invalidateQueries({ queryKey: ["get-user-address"] });
                        onClose();
                    }
                },
                onError: (error) => {
                    toast.error("خطایی رخ داده است!");
                }
            })
        } else {
            window.location.reload();
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const { transformProvinces } = useGetProvinces();
    const { transformCity, isLoading: isGetCity } = useGetCity(formik.values.ostan);


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
                <Input
                    type="text"
                    name="title"
                    formik={formik}
                    label="عنوان آدرس"
                />
                <Input
                    type="text"
                    name="address"
                    formik={formik}
                    label="آدرس"
                />
                <Input
                    type="number"
                    name="postalcode"
                    formik={formik}
                    label="کد پستی"
                />
                <Select
                    name="ostan"
                    formik={formik}
                    label="استان"
                    options={[{ id: -1, value: "", label: "استان را انتخاب کنید" }, ...transformProvinces || []]}
                />
                <Select
                    name="shahr"
                    formik={formik}
                    label="شهر"
                    disabled={!formik.values.ostan}
                    options={[{ id: -1, value: "", label: "شهر را انتخاب کنید" }, ...transformCity || []]}
                />
                <Input
                    type="text"
                    name="phone"
                    formik={formik}
                    label="شماره تماس"
                />
            </div>

            <div className="flex items-center gap-4 pt-4">
                <button type="submit" className="btn btn--primary w-full">
                    {isPending ? <Loading /> : "ثبت"}
                </button>
                <button type="button" onClick={onClose} className="btn btn--secondary w-full">
                    لغو
                </button>
            </div>
        </form>
    )
}