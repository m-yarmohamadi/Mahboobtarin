import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useRouter } from 'next/router';


const RegisterModal = ({ openRegisterModal, setOpenRegisterModal }) => {
	const router = useRouter();
	const handleClickRegisterSpecialists =()=>{
		router.push('/users/register')
		setOpenRegisterModal(false)

	}

	return (
		<Dialog
			open={openRegisterModal}
			onClose={setOpenRegisterModal}
			className='relative z-10 transition-all duration-1000 ease-in-out'>
			<DialogBackdrop
				transition
				className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
			/>

			<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
				<div className='flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0'>
					<DialogPanel
						transition
						className='h-32  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'>
						<div className='py-4 flex justify-center items-center w-full'>
							<span className='font-bold text-primary-01'>لطفاٌ بر اساس نیاز خود یکی از مدلهای زیر را انتخاب کنید:</span>
						</div>
						<div className='flex justify-around items-center gap-3'>
							<button onClick={handleClickRegisterSpecialists}
								className='bg-primary-01 shadow-md hover:bg-opacity-90 text-white font-bold px-4 py-2 rounded-md'
								type=''>
								ثبت نام متخصصین
							</button>
							<button
								className='bg-primary-01 shadow-md hover:bg-opacity-90 text-white font-bold px-4 py-2 rounded-md'
								type=''>
								ثبت نام کاربران
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default RegisterModal;
