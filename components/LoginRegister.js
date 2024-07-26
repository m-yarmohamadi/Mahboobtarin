import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { BiEditAlt, BiLogOut, BiUser } from 'react-icons/bi';
import Link from 'next/link';
import { useUserDataContext } from '@/context/UserDataContext';

const LoginRegister = ({ token ,setOpenRegisterModal,handleLogOut}) => {
	const { userData } = useUserDataContext();
	const [openMenuOptions, setOpenMenuOptions] = useState(false);
	const menuOptionsRef = useRef(null);

	useEffect(()=>{
		function closeMenuHandler (e) {
			if(menuOptionsRef.current && !menuOptionsRef.current.contains(e.target)){
				setOpenMenuOptions(false);
			}
		}

		document.addEventListener("click", closeMenuHandler, true);

		return () => document.removeEventListener("click", closeMenuHandler, true);
	},[setOpenMenuOptions])

	return (
		<div>
			{token ? (
				<div className='hidden relative md:flex md:flex-1 md:justify-end bg-primary-01 text-primary-02 ms-10 py-2 rounded-md  justify-center items-center  w-full'>
					<button onClick={()=>setOpenMenuOptions(!openMenuOptions)} className='w-full text-center text-md'>
						{userData?.gender === "مرد" ? "جناب آقای" : "سرکار خانوم"} <span className='font-bold text-white'>{userData?.name} {userData?.lastname}</span> خوش آمدید
					</button>
					<MenuOptions ref={menuOptionsRef} open={openMenuOptions}>
						<MenuOptionsItem 
							link="/profile" 
							text="پروفایل"
							icon={<BiUser className='w-6 h-6'/>}
						/>
						<MenuOptionsItem 
							link="/" 
							text="ویرایش پروفایل"
							icon={<BiEditAlt className='w-6 h-6'/>}
						/>
						<button onClick={handleLogOut} className='px-4 hover:bg-gray-200 duration-200 group'>
							<div className='text-gray-800 flex items-center gap-3'>
								<BiLogOut className='w-6 h-6'/>
								<span className='border-b text-right border-gray-200 flex-1 py-3 group-last:border-none'>
									خروج از حساب کاربری
								</span>
							</div>
						</button>
					</MenuOptions>
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


const MenuOptions = forwardRef(function MenuOptionsComponent({children, open}, ref){
	if(open) return(
		<div ref={ref} className='absolute top-12 w-60 overflow-hidden right-0 bg-white shadow-2xl rounded-md'>
			<ul className='flex flex-col'>
				{children}
			</ul>
		</div>
	)
})

function MenuOptionsItem({text, link, icon}){
	return(
		<li className='px-4 hover:bg-gray-200 duration-200 group'>
			<Link href={link} className='text-gray-800 flex items-center gap-3'>
				{icon}
				<span className='border-b border-gray-200 flex-1 py-3 group-last:border-none'>
					{text}
				</span>
			</Link>
		</li>
	)
}