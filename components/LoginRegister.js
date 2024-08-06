import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { BiDockBottom, BiEditAlt, BiLeftArrow, BiLogOut, BiUser } from 'react-icons/bi';
import Link from 'next/link';
import { useUserDataContext } from '@/context/UserDataContext';
import { FaAnglesLeft } from 'react-icons/fa6';
import useProfile from '@/hooks/useProfile';

const LoginRegister = ({ token, setOpenRegisterModal, handleLogOut, size }) => {
	const { user, isLoading } = useProfile();
	const [openMenuOptions, setOpenMenuOptions] = useState(false);
	const menuOptionsRef = useRef(null);

	useEffect(() => {
		function closeMenuHandler(e) {
			if (menuOptionsRef.current && !menuOptionsRef.current.contains(e.target)) {
				setOpenMenuOptions(false);
			}
		}

		document.addEventListener('click', closeMenuHandler, true);

		return () => document.removeEventListener('click', closeMenuHandler, true);
	}, [setOpenMenuOptions]);


	return (
		<div className={`${isLoading ? "blur-sm opacity-45" : ""} duration-100`}>
			{token ? (
				<div className={`${size==='sm' ?  `block` :  `hidden md:flex md:flex-1 md:justify-start`} relative  bg-primary-01 text-primary-02  p-2 rounded-lg  justify-center items-center  w-full`}>
					<button
						onClick={() => setOpenMenuOptions(!openMenuOptions)}
						className='w-full flex justify-between items-center text-center text-sm px-2'>
						<FaAnglesLeft className={`${!openMenuOptions && `-rotate-90`} mx-2`} />
						{user?.gender === 'man' ? 'جناب آقای' : 'سرکار خانم'}
						&nbsp;
						<span className='font-bold text-white'>
							{user?.name} {user?.lastname}
						</span>
						&nbsp;
						خوش آمدید
					</button>
					<MenuOptions
						ref={menuOptionsRef}
						open={openMenuOptions}>
						{user?.type !== "user" &&
							<MenuOptionsItem
								link={`/profile/${user?.id}`}
								text='پروفایل'
								icon={<BiUser className='w-6 h-6' />}
							/>
						}
						<MenuOptionsItem 
							link={user?.type === "user" ? "/user/profile" : "/admin/dashboard"} 
							text="داشبورد"
							icon={<BiEditAlt className='w-6 h-6'/>}
						/>
						<button
							onClick={handleLogOut}
							className='px-4 hover:bg-gray-200 duration-200 group'>
							<div className='text-gray-800 flex items-center gap-3 text-sm'>
								<BiLogOut className='w-6 h-6' />
								<span className='border-b text-right border-gray-200 flex-1 py-3 group-last:border-none'>خروج از حساب کاربری</span>
							</div>
						</button>
					</MenuOptions>
				</div>
			) : (
				<Link href="/auth" className={`${size==='sm' ?  `w-full flex flex-col  justify-center  text-center gap-1` :  `hidden md:flex md:flex-1 md:justify-start`}  w-full bg-primary-01 hover:opacity-95 cursor-pointer py-2 px-5 rounded-xl text-white  text-sm`}>
					ورود | ثبت نام
				</Link>
			)}
		</div>
	);
};

export default LoginRegister;


const MenuOptions = forwardRef(function MenuOptionsComponent({children, open}, ref){
	if(open) return(
		<div ref={ref} className='absolute top-12 w-60 overflow-hidden left-0 bg-white shadow-2xl rounded-md'>
			<ul className='flex flex-col'>
				{children}
			</ul>
		</div>
	)
})

function MenuOptionsItem({ text, link, icon }) {
	return (
		<li className='px-4 hover:bg-gray-200 duration-200 group'>
			<Link
				href={link}
				className='text-gray-800 flex items-center gap-3 text-sm'>
				{icon}
				<span className='border-b border-gray-200 flex-1 py-3 group-last:border-none'>{text}</span>
			</Link>
		</li>
	);
}
