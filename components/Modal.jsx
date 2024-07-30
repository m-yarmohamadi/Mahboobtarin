import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function Modal({ children, open, onClose, title }) {
    return (
        <Dialog open={open} as="div" className="relative z-50 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-50 w-screen overflow-y-auto  bg-gray-900/70">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-gray-800 border-b border-gray-300 pb-4 mb-4">
                            {title}
                        </DialogTitle>
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
