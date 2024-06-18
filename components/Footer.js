import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaGooglePlay, FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
	return (
		<div className=' '>
			<div className=' md:container px-8 md:px-0'>
				<div className='grid md:grid-cols-3 md:gap-16 grid-cols-1'>
					<div className=' w-full col-span-2 '>
						<div className='py-8 flex justify-start items-center justify-items-start w-full'>
							<img
								className=' w-56'
								src='/images/logo.webp'
								alt=''
							/>
						</div>
						<div>
							<p className=' text-justify'>محبوبترین سامانه جامع معرفی و ارائه خدمات هوشمند برترین های هنر، ورزش، سلامت، گردشگری، فناوری، اقتصاد، اندیشه، فرهنگ، ادب و غیره می باشد. این سامانه درصدد است تا ضمن معرفی دقیق مفاخر حوزه های مختلف در قالب دانشنامه چندرسانه ای خوداظهار، بستری برای ارتباط آسان بین مردم و برترینها به منظور مشاوره و ارائه خدمات آنلاین باشد</p>
						</div>
						<div className='grid grid-cols-2 justify-start w-full text-lg font-medium py-8'>
							<div className='flex flex-col justify-start items-start w-full gap-2'>
								<span>ارتباط با ما</span>
								<span>درباره ما</span>
								<span>مجله محبوب ترین</span>
								<span>ثبت نام کاربران</span>
								<span>ثبت نام متخصصان</span>
							</div>
							<div className='flex flex-col justify-start items-start w-full gap-2'>
								<span>سوالات متداول</span>
								<span>دسته بندی محبوبترین</span>
								<span>قوانین و مقررات</span>
								<span>راهنمای عضویت</span>
								<span>خط و مشی محبوبترین</span>
							</div>
						</div>
					</div>
					<div className=' flex flex-col justify-center items-center gap-y-8 w-full '>
						<div className='w-full flex flex-col justify-center items-center'>
							<div className='w-full flex justify-center items-center  p-2 font-bold'>دریافت اتاقک</div>
							<div className=' w-full grid grid-cols-2 gap-y-2 gap-x-4 text-sm font-bold  justify-between items-center'>
								<div className='w-full bg-white p-2 rounded-md flex justify-between items-center shadow-sm hover:text-primary-01 hover:cursor-pointer hover:shadow-md'>
									<span>دریافت از بازار</span>
									<span>
										<FaGooglePlay />
									</span>
								</div>
								<div className='w-full bg-white p-2 rounded-md flex justify-between items-center shadow-sm hover:text-primary-01 hover:cursor-pointer hover:shadow-md'>
									<span>دریافت از گوگل پلی</span>
									<span>
										<FaGooglePlay />
									</span>
								</div>
								<div className='w-full bg-white p-2 rounded-md flex justify-between items-center shadow-sm hover:text-primary-01 hover:cursor-pointer hover:shadow-md'>
									<span>دریافت از مایکت</span>
									<span>
										<FaGooglePlay />
									</span>
								</div>
								<div className='w-full bg-white p-2 rounded-md flex justify-between items-center shadow-sm hover:text-primary-01 hover:cursor-pointer hover:shadow-md'>
									<span>دریافت مستقیم</span>
									<span>
										<FaGooglePlay />
									</span>
								</div>
							</div>
						</div>
						<div className='flex justify-start items-center text-3xl gap-4 py-4 text-gray-500'>
							<span className=' hover:text-primary-01 hover:cursor-pointer'>
								<FaWhatsapp />
							</span>
							<span className=' hover:text-primary-01 hover:cursor-pointer'>
								<FaTelegram />
							</span>
							<span className=' hover:text-primary-01 hover:cursor-pointer'>
								<FaInstagram />
							</span>
							<span className=' hover:text-primary-01 hover:cursor-pointer'>
								<FaTwitter />
							</span>
						</div>

						<div className='flex justify-between items-center w-full gap-x-2'>
							<div className=' p-3 '>
								<img
									className=' h-16 hover:grayscale'
									src='/images/gardeshgari.png'
									alt=''
								/>
							</div>
							<div className=' p-3 '>
								<img
									className=' h-16 hover:grayscale'
									src='/images/eNamad.png'
									alt=''
								/>
							</div>
							<div className=' p-3 '>
								<img
									className=' h-16 hover:grayscale'
									src='/images/samandehi.png'
									alt=''
								/>
							</div>
							<div className=' p-3 '>
								<img
									className=' h-16 hover:grayscale'
									src='/images/Lisence002.png'
									alt=''
								/>
							</div>
							<div className=' p-3 '>
								<img
									className=' h-16 hover:grayscale'
									src='/images/Lisence003.png'
									alt=''
								/>
							</div>
						</div>
					</div>
				</div>
				<div className=' justify-items-center flex justify-center items-center text-xs md:text-sm md:font-bold text-gray-500 border-t-2  border-white py-4'>
					<p>کلیه حقوق این سرویس (وبسایت و اپلیکیشن های موبایل) محفوظ و متعلق به شرکت هنر ایرانیان می باشد </p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
