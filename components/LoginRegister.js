import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import Link from 'next/link';


const LoginRegister = ({ token ,setOpenRegisterModal,handleLogOut}) => {
	return (
		<div>
			{token ? (
				<div className='hidden md:flex md:flex-1 md:justify-end bg-primary-01 text-primary-02 ms-10 py-2 rounded-md  justify-center items-center  w-full'>
					<span className='w-full text-center text-md'>
						جناب آقای <span className='font-bold text-white'></span> خوش آمدید
					</span>
					<span
						onClick={() => {
							handleLogOut();
						}}
						className='text-white text-2xl px-2 hover:cursor-pointer '>
						<BiLogOut />
					</span>
				</div>
			) : (
				<div className='hidden md:flex md:flex-1 md:justify-end  w-full'>
					<Link href='/users/login'>
						<div className='py-2 rounded-ss-3xl bg-primary-01 text-white font-bold px-3 hover:opacity-95 cursor-pointer'>ورود</div>
					</Link>
					<div
						onClick={() => {
							setOpenRegisterModal(true);
						}}
						className='py-2 rounded-ee-3xl bg-primary-01 text-white font-bold px-3 hover:opacity-95 cursor-pointer'>
						ثبت نام
					</div>
				</div>
			)}
		</div>
	);
};

export default LoginRegister;
