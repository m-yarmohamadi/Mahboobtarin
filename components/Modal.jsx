import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function Modal({ children, open, onClose, title }) {
    return (
        <Dialog open={open} as="div" className="relative z-50 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="w-full fixed top-0 right-0 h-full bg-black/50"></div>
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-primary-02 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-slate-800 border-b border-slate-300 dark:border-slate-500 pb-4 mb-4">
                            {title}
                        </DialogTitle>
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
