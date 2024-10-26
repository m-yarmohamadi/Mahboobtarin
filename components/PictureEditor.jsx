import { useRef } from "react"
import Modal from "./Modal"
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PictureEditor({ open, onClose, image, onCrop }) {
    const cropperRef = useRef(null);

    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                const croppedFile = new File([blob], image.name, { type: image.type });
                onCrop(croppedFile);
                onClose();
            }, 'image/jpeg');
        }
    };

    return (
        <Modal title={'انتخاب تصویر'} open={open} onClose={onClose}>
            <div className="w-full relative rounded-lg overflow-hidden">
                {image &&
                    <Cropper
                        src={URL.createObjectURL(image)}
                        style={{ height: 400, width: "100%" }}
                        initialAspectRatio={1 / 1}
                        guides={false}
                        ref={cropperRef}
                        viewMode={1}
                        dragMode="none"
                        cropBoxResizable={false}
                    />
                }
            </div>
            <div className="grid grid-cols-2 gap-4 w-full pt-4">
                <button onClick={handleCrop} className="btn btn--primary">
                    تایید
                </button>
                <button onClick={onClose} className="btn btn--outline">
                    لغو
                </button>
            </div>
        </Modal>
    )
}
