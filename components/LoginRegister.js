import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { BiDockBottom, BiEditAlt, BiLeftArrow, BiLogOut, BiUser } from 'react-icons/bi';
import Link from 'next/link';
import { useUserDataContext } from '@/context/UserDataContext';
import { FaAnglesLeft } from 'react-icons/fa6';

const LoginRegister = ({ token, setOpenRegisterModal, handleLogOut, size }) => {
	const { userData } = useUserDataContext();
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
		<div>
			{token ? (
				<div className={`${size==='sm' ?  `block` :  `hidden md:flex md:flex-1 md:justify-start`} relative  bg-primary-01 text-primary-02  p-2 rounded-md  justify-center items-center  w-full`}>
					<button
						onClick={() => setOpenMenuOptions(!openMenuOptions)}
						className='w-full flex justify-between items-center text-center text-md'>
						<FaAnglesLeft className={`${!openMenuOptions && `-rotate-90`} mx-2`} />
						{userData?.gender === 'مرد' ? 'جناب آقای' : 'سرکار خانم'}{' '}
						<span className='font-bold text-white'>
							{userData?.name} {userData?.lastname}
						</span>{' '}
						خوش آمدید
					</button>
					<MenuOptions
						ref={menuOptionsRef}
						open={openMenuOptions}>
						<MenuOptionsItem
							link='/profile'
							text='پروفایل'
							icon={<BiUser className='w-6 h-6' />}
						/>
						<MenuOptionsItem 
							link="/" 
							text="ویرایش پروفایل"
							icon={<BiEditAlt className='w-6 h-6'/>}
						/>
						<button
							onClick={handleLogOut}
							className='px-4 hover:bg-gray-200 duration-200 group'>
							<div className='text-gray-800 flex items-center gap-3'>
								<BiLogOut className='w-6 h-6' />
								<span className='border-b text-right border-gray-200 flex-1 py-3 group-last:border-none'>خروج از حساب کاربری</span>
							</div>
						</button>
					</MenuOptions>
				</div>
			) : (
				<div className={`${size==='sm' ?  `w-full flex flex-col  justify-center  text-center gap-1` :  `hidden md:flex md:flex-1 md:justify-start`}  w-full`}>
					<Link href='/users/login'>
						<div className='py-2 rounded-ss-3xl bg-primary-01 text-white font-bold px-3 hover:opacity-95 cursor-pointer'>ورود</div>
					</Link>
					<Link href={'/users/registerType'}>
					<div
						className='py-2 rounded-ee-3xl bg-primary-01 text-white font-bold px-3 hover:opacity-95 cursor-pointer'>
						ثبت نام
					</div>
					</Link>
				</div>
			)}
		</div>
	);
};

export default LoginRegister;


const MenuOptions = forwardRef(function MenuOptionsComponent({children, open}, ref){
	if(open) return(
		<div ref={ref} className='absolute top-12 w-60 overflow-hidden right-0 bg-white shadow-2xl rounded-md'>
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
				className='text-gray-800 flex items-center gap-3'>
				{icon}
				<span className='border-b border-gray-200 flex-1 py-3 group-last:border-none'>{text}</span>
			</Link>
		</li>
	);
}
