import Input from "@/tools/Input";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";

export default function WorkAddress({ formik }) {
    const [addressText, setAddressText] = useState("");
    const { workAddress } = formik.values;

    const addAddressHandler = () => {
        if (addressText) {
            formik.setFieldValue("workAddress", [...workAddress, {address:addressText}]);
            setAddressText("");
        }
    }

    const removeAddressHandler = (value) => {
        formik.setFieldValue("workAddress", workAddress.filter((i) => workAddress.indexOf(i) !== workAddress.indexOf(value)))
    }

    return (
        <div className="lg:col-span-2">
            <div className="flex items-end gap-4">
                <Input
                    label="آدرس محل کار"
                    name="address"
                    value={addressText}
                    onChange={(e) => setAddressText(e.target.value)}
                />
                <button onClick={addAddressHandler} type="button" className="btn btn--outline !p-2 !rounded-full mb-1">
                    <IoMdAdd className="w-6 h-6" />
                </button>
            </div>
            {workAddress.length !== 0 &&
                <div className="w-full border border-slate-300 rounded-md mt-3">
                    {workAddress.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 p-3 border-b border-slate-300 last:border-0">
                            <p className="flex-1 text-xs truncate">
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
