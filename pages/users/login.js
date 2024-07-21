import Header from '@/components/Header';
import Login from '@/Login/Login';
import Login2 from '@/Login/Login2';

const login = () => {
	return (
		<div>
			<Header />
					<div className='w-full h-screen p-4 md:p-24  transition-all duration-1000 ease-in-out'>
			<div className='w-full h-full bg-white rounded-md shadow-md p-4'>
				<div className='w-full md:w-1/2  border-4 border-double border-primary-04 shadow-sm shadow-primary-01 h-full px-10 pt-10 mx-auto flex flex-col justify-between items-center rounded-lg  bg-primary-01 bg-opacity-10'>
					<Login2 />
				</div>
			</div>
			<div className='w-full flex justify-end items-end pt-1'>
							<span className='text-xs font-bold text-primary-06 text-opacity-30'>کلیه حقوق این سرویس (وبسایت و اپلیکیشن های موبایل) محفوظ و متعلق به شرکت هنر ایرانیان می باشد

</span>

			</div>
		</div>

		</div>
	);
};

export default login;
