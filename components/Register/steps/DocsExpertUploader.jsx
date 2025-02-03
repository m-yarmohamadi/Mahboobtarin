import { uploadDocumentsApi } from "@/services/authService";
import Loading from "@/tools/Loading";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function DocsExpertUploader({ formikStep3, userId }) {
    const { mutateAsync: mutateUplaodDocs, isPending: isUploading } = useMutation({ mutationFn: uploadDocumentsApi });

    const updloadDocsHandler = async (file) => {
        const maxSizeInMB = 3;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
            toast.error(`حجم فایل نباید بیشتر از ${maxSizeInMB} مگابایت باشد`);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', userId);

        try {
            const res = await mutateUplaodDocs(formData);

            if (res) {
                formikStep3.setFieldValue("documents", [...formikStep3.values.documents, { id: Date.now(), file }])
                formikStep3.setFieldValue("documents_id", [...formikStep3.values.documents_id, res.photo_id])
            }

        } catch (error) {
            if (error?.response?.status === 401) {
                window.location.reload();
                return;
            }
            toast.error("خطا در بارگزاری تصویر");
        }
    }

    return (
        <div className="pt-7">
            <div className="font-bold text-textDefault flex items-center gap-1.5">
                مدارک شغلی
                <span className="text-xs">
                    (اختیاری)
                </span>
            </div>

            <div className="w-full flex items-center flex-wrap gap-4 pt-4">
                {formikStep3.values.documents.map((item, index) => (
                    <div key={index} className="w-[160px] h-[100px] relative">
                        <img src={URL.createObjectURL(item.file)} alt="" className="w-full h-full object-cover object-center rounded-xl" />
                    </div>
                ))}

                {
                    !isUploading ?
                        <>
                            <label htmlFor="select-docs" className="w-[160px] h-[100px] inline-block border border-primary-01 rounded-xl">
                                <div className="w-full h-full flex items-center justify-center">
                                    <IoMdAddCircleOutline className="w-8 h-8 text-primary-01 opacity-50" />
                                </div>
                            </label>
                            <input
                                type="file"
                                name="select-docs"
                                id="select-docs"
                                hidden
                                accept="image/*"
                                onChange={({ target }) => updloadDocsHandler(target.files[0])}
                            />
                        </>
                        :
                        <div className="w-[160px] h-[100px] flex items-center justify-center">
                            <Loading width={50} customeColor={'#0693a4'} />
                        </div>
                }
            </div>
        </div>
    )
}
