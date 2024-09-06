import Modal from "@/components/Modal";
import Input from "@/tools/Input";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CreateInterestForm({ open, onClose, setList }) {

    const onSubmit = (values, {resetForm}) => {
        onClose();
        setList((prev) => [...prev, { id: Date.now(), value: values.value, label: values.label }]);
        resetForm();
    }

    const formik = useFormik({
        initialValues: { label: "", value: "" },
        onSubmit,
        validationSchema: Yup.object({
            label: Yup.string().required("نوع علاقه خود را وارد نمایید"),
            value: Yup.string().required("علاقه خود را وارد نمایید"),
        })
    })

    return (
        <Modal title="ایجاد علاقه جدید" open={open} onClose={onClose}>
            <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
                <Input
                    name="label"
                    label="نوع علاقه"
                    formik={formik}
                />
                <Input
                    name="value"
                    label="علاقه شما"
                    formik={formik}
                />
                <div className="w-full grid grid-cols-2 gap-4">
                    <button className="btn btn--primary">
                        تایید
                    </button>
                    <button onClick={onClose} type="button" className="btn btn--outline">
                        لغو
                    </button>
                </div>
            </form>
        </Modal>
    )
}
