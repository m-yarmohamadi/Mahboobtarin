import Map from "@/components/mapComponent/Map";
import Input from "@/tools/Input";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";

export default function WorkAddress({ formik, name }) {
    const [addressText, setAddressText] = useState("");
    const [coord, setCoord] = useState();
    const { address_work } = formik.values;
    const [openMap, setOpenMap] = useState(false);

    const addAddressHandler = () => {
        if (!addressText) {
            toast.error("ادرس محل کار را وارد کنید");
            return;
        } else {
            if (!coord) {
                toast.error("لوکیشن آدرس را روی نقشه انتخاب کنید");
                return;
            } else {
                formik.setFieldValue("address_work", [...address_work, { address: addressText, lat: coord[0], lng: coord[1] }]);
                setAddressText("");
                setCoord();
            }
        }
    }

    const removeAddressHandler = (value) => {
        formik.setFieldValue("address_work", address_work.filter((i) => address_work.indexOf(i) !== address_work.indexOf(value)))
    }
    console.log(formik.values);


    return (
        <div>
            <div>
                <div className="flex items-end gap-4">
                    <div className="flex-1 flex flex-col items-end sm:flex-row gap-4">
                        <Input
                            label="آدرس محل کار"
                            name="address_work"
                            value={addressText}
                            onChange={(e) => setAddressText(e.target.value)}
                        />
                        <div className="w-full flex-1 pb-3">
                            <button type='button' onClick={() => setOpenMap(true)} className='btn btn--primary w-full !text-xs !h-[42px] !py-2 !whitespace-nowrap !gap-1'>
                                <FaLocationDot className='w-4 h-4' />
                                {coord ? "ویرایش" : "انتخاب لوکیشن"}
                            </button>
                            <Map setCoord={setCoord} title='انتخاب لوکیشن' open={openMap} onClose={() => setOpenMap(false)} />
                        </div>
                    </div>

                    <button onClick={addAddressHandler} type="button" className="btn btn--outline !p-2 !rounded-full mb-1">
                        <IoMdAdd className="w-6 h-6" />
                    </button>
                </div>
                <div className='w-full flex justify-start items-start mt-2'>{formik?.errors[name] && formik?.touched[name] && <p className='error_Message'>{formik?.errors[name]}</p>}</div>

            </div>
            {address_work.length !== 0 &&
                <div className="w-full border border-slate-300 rounded-md mt-3">
                    {address_work.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 p-3 border-b border-slate-300 last:border-0">
                            <p className="flex-1 text-xs truncate text-textDefault">
                                {item.address}
                            </p>
                            <button onClick={() => removeAddressHandler(item)} type="button" >
                                <HiOutlineTrash className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
