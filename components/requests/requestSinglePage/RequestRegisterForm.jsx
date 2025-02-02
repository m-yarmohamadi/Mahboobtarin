import Modal from "@/components/Modal";
import { useRegisterRequest } from "@/hooks/expertHooks/useCalling";
import Loading from "@/tools/Loading";
import RadioButton from "@/tools/RadioButton";
import { useState } from "react";

export default function RequestRegisterForm({ open, onClose, id }) {
    const { mutateRegisterReqeust, isPending } = useRegisterRequest();
    const [showMobile, setShowMobile] = useState(true);

    const registerRequestHandler = () => {
        mutateRegisterReqeust({ id, show_mobile: showMobile }, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    return (
        <Modal title="تایید فراخوان" open={open} onClose={onClose}>
            <div>
                <div className="pb-6 text-sm font-medium text-error flex flex-col items-center gap-2 text-center">
                    <p>
                        آیا شماره تلفن همراه شما برای ارائه دهنده فراخوان نمایش داده شود؟
                    </p>
                    <p>
                        در صورت عدم تایید، ارتباط شما از طریق پیام می باشد و در اعلانات شما قابل مشاهده خواهد بود
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <RadioButton
                        label="شماره تلفن من برای ارائه دهنده فراخوان نمایش داده شود"
                        name="show_mobile"
                        id="show"
                        checked={showMobile}
                        onChecked={() => setShowMobile(true)}
                    />
                    <RadioButton
                        label="شماره تلفن من برای ارائه دهنده فراخوان نمایش داده نشود"
                        name="show_mobile"
                        id="notShow"
                        checked={!showMobile}
                        onChecked={() => setShowMobile(false)}
                    />
                </div>

                <div className="pt-6 w-full grid grid-cols-2 gap-4">
                    <button onClick={registerRequestHandler} className="btn btn--primary">
                        {isPending ? <Loading width={40} /> : "ثبت"}
                    </button>
                    <button onClick={onClose} className="btn btn--secondary">
                        لغو
                    </button>
                </div>
            </div>
        </Modal>
    )
}
