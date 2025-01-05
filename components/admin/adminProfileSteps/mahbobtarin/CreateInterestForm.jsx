import CheckBoxInput from "@/components/CheckBoxInput";
import Modal from "@/components/Modal";
import { usePopularFavorites } from "@/hooks/expertHooks/useFavorites";
import { addNewFavorite } from "@/services/expertApi/favoritesService";
import Input from "@/tools/Input";
import Loading from "@/tools/Loading";
import Select from "@/tools/Select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function CreateInterestForm({ open, onClose, setList }) {
    const { popularList, isGetPopular } = usePopularFavorites();
    const { mutateAsync, isPending } = useMutation({ mutationFn: addNewFavorite });
    const queryClient = useQueryClient();
    const [isCustomeLabel, setIsCustomeLabel] = useState(false);

    const onSubmit = async (values, { resetForm }) => {
        let newFavorite;

        if (isCustomeLabel) {
            newFavorite = { popular_title: values.customeLabel, value: values.value };
        } else {
            newFavorite = { popular_id: values.label, value: values.value };
        }

        try {
            const { data } = await mutateAsync(newFavorite);
            if (data) {
                onClose();
                resetForm();
                queryClient.invalidateQueries({ queryKey: ['get-user-favorites'] });
            }

        } catch (error) {
            if (error?.response?.data?.message[0] === "popular id for this user exist!") {
                toast.error("برای این علاقه قبلا مقداری ثبت کرده اید");
                return;
            }
            toast.error("خطایی رخ داده است")
        }
    }

    const formik = useFormik({
        initialValues: { label: "", value: "", customeLabel: "" },
        onSubmit,
        validationSchema: Yup.object({
            // label: Yup.string().required("نوع علاقه خود را وارد نمایید"),
            value: Yup.string().required("علاقه خود را وارد نمایید"),
        })
    })

    useEffect(() => {
        formik.setFieldValue("label", "");
    }, [isCustomeLabel])

    return (
        <Modal title="ایجاد علاقه جدید" open={open} onClose={onClose}>
            <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
                {
                    !isCustomeLabel ?
                        <Select
                            name="label"
                            label="نوع علاقه"
                            formik={formik}
                            options={!isGetPopular ? [{ value: "", label: "یک گزینه را انتخاب کنید" }, ...popularList] : []}
                        />
                        :
                        <Input
                            name="customeLabel"
                            label="نوع علاقه دلخواه"
                            formik={formik}
                        />
                }

                <CheckBoxInput
                    name={'isCustomeLabel'}
                    label={'نوع علاقه دلخواه'}
                    checked={isCustomeLabel}
                    onChecked={(e) => setIsCustomeLabel(e.target.checked)}
                />
                <Input
                    name="value"
                    label="علاقه شما"
                    formik={formik}
                />
                <div className="w-full grid grid-cols-2 gap-4">
                    <button type="submit" className="btn btn--primary">
                        {!isPending ? "تایید" : <Loading />}
                    </button>
                    <button onClick={onClose} type="button" className="btn btn--outline">
                        لغو
                    </button>
                </div>
            </form>
        </Modal>
    )
}
