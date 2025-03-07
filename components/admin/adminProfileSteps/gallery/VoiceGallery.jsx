import useGetExpertiseUser from "@/hooks/useExpertiseUser";
import { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
import GalleryItem from "./GalleryItem";
import Modal from "@/components/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGallery } from "@/services/expertApi/galleryService";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import TabGroup from "@/tools/TabGroup";
import * as Yup from "yup";
import Loading from "@/tools/Loading";
import { GoPlusCircle } from "react-icons/go";
import Input from "@/tools/Input";
import { BiEditAlt } from "react-icons/bi";

export default function VoiceGallery({ user }) {
    const [open, setOpen] = useState(false);
    const { data, isLoading: isGetGallery } = useGetExpertiseUser(user?.unique_url_id);
    const { gallery } = data?.user || {};
    const galleryData = gallery && gallery.filter((g) => g.type === "gallery-audio");

    if (isGetGallery) return null;

    return (
        <div>
            <div className='w-full flex items-end justify-between mb-7 pb-1'>
                <button
                    onClick={() => setOpen(true)}
                    className='w-28 btn btn--primary px-3 flex justify-between items-center'>
                    <span>افزودن</span>
                    <FaImages className='w-5 h-5' />
                </button>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4'>
                {galleryData?.map((item, index) => (
                    <GalleryItem
                        key={index}
                        data={item}
                    />
                ))}
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title='فایل صوتی جدید'
            >
                <CreateVoiceForm
                    onClose={() => setOpen(false)}
                />
            </Modal>
        </div>
    )
}

function CreateVoiceForm({ onClose }) {
    const { mutateAsync: mutateAddGallery, isPending } = useMutation({ mutationFn: addGallery });
    const queryClient = useQueryClient();


    const onSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append("title", values.title);

        if (values.src) {
            formData.append("file", values.src);
        } else {
            formData.append("script", values.script);
        }

        formData.append("type", "audio");

        try {
            const { data } = await mutateAddGallery(formData);
            if (data) {
                toast.success("با موفقیت اضافه شد");
                onClose();
                queryClient.invalidateQueries({ queryKey: ["get-expertise-user-by-id"] });
                resetForm();
            }

        } catch (error) {
            if (error?.response?.status === 413) {
                toast.error("حجم فایل بالاست");
            }


            if (error?.response?.status === 401) {
                toast.error("وارد حساب کاربری خود شوید");
                window.location.reload();
            }
        }
    };

    const importFileHandler = (e) => {
        const file = e.target.files[0];
        const maxVoiceSizeInMB = 10;
        const maxVoiceSizeInBytes = maxVoiceSizeInMB * 1024 * 1024;

        if (file.size > maxVoiceSizeInBytes) {
            toast.error(`حجم فایل صوتی نباید بیشتر از ${maxVoiceSizeInMB} مگابایت باشد`);
            return;
        }

        formik.setFieldValue('src', file);
    }

    const formik = useFormik({
        initialValues: { title: '', src: '' },
        onSubmit,
        validationSchema: Yup.object({
            title: Yup.string().required('عنوان را وارد کنید'),
            src: Yup.string().test(
                'src-or-script',
                'فایل صوتی را انتخاب کنید',
                function (value) {
                    return value || this.parent.script;
                }
            ),
            script: Yup.string().test(
                'src-or-script',
                'لینک فایل صوتی را انتخاب کنید',
                function (value) {
                    return value || this.parent.src;
                }
            ),
        }),
    });

    return (
        <form
            className='w-full space-y-4'
            onSubmit={formik.handleSubmit}
        >
            <TabGroup
                tabs={[
                    { label: "انتخاب فایل صوتی" },
                    { label: "وارد کردن لینک" },
                ]}
                handler={() => {
                    formik.setFieldValue("src", "");
                    formik.setFieldValue("script", "");
                }}
            >
                <TabGroup.Item>
                    <UploadVoice formik={formik} importFileHandler={importFileHandler} />
                </TabGroup.Item>
                <TabGroup.Item>
                    <AddLinkVoice formik={formik} />
                </TabGroup.Item>
            </TabGroup>

            <Input
                label='عنوان'
                type='text'
                name='title'
                formik={formik}
            />
            <div className='w-full flex items-center gap-4'>
                <button
                    type='submit'
                    className='btn btn--primary flex-1'>
                    {isPending ? <Loading /> : "ثبت"}
                </button>
                <button
                    onClick={() => onClose()}
                    type='button'
                    className='btn btn--outline flex-1'>
                    لغو
                </button>
            </div>
        </form>
    )
}

function UploadVoice({ importFileHandler, formik }) {
    return (
        <div>
            <input
                type='file'
                hidden
                id='src-gallery'
                accept='audio/*'
                onChange={importFileHandler}
            />
            {formik.values.src ? (
                <div className="flex flex-col gap-2 items-start">
                    <audio controls className="w-full">
                        <source src={URL.createObjectURL(formik.values.src)} type="audio/mpeg" />
                        مرورگر شما پخش صوت را پشتیبانی نمی‌کند.
                    </audio>
                    <label
                        htmlFor='src-gallery'
                        className='btn btn--secondary cursor-pointer !p-2 !w-auto'>
                        <BiEditAlt className='w-5 h-5' />
                    </label>
                </div>
            ) : (
                <>
                    <label
                        htmlFor='src-gallery'
                        className='text-primary-01 cursor-pointer text-xs font-semibold w-full flex flex-col justify-center items-center gap-2 py-7 border border-dashed border-slate-400 rounded-lg'>
                        <GoPlusCircle className='w-12 h-12' />
                        برای افزودن فایل صوتی کلیک کنید
                    </label>
                    <div className='w-full flex justify-start items-start mt-2'>{formik?.errors.src && formik?.touched.src && <p className='error_Message'>{formik?.errors.src}</p>}</div>
                </>
            )}
        </div>
    )
}

function AddLinkVoice({ formik }) {
    return (
        <Input
            label='لینک فایل'
            type='text'
            name={'script'}
            formik={formik}
        />
    )
}