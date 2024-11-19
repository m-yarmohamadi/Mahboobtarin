import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { FcAbout } from "react-icons/fc";
import useAllSettings from '@/hooks/useAllSettings';

const about = () => {
	const data = useAllSettings();

	return (
		<div>
			<Header />
			<div>
				<div className='w-full bg-primary-01 p-4 my-4  font-black text-white text-xl drop-shadow-xl flex justify-center items-center gap-1'>
					<span className='text-2xl text-primary-02'>
						<FcAbout />
					</span>
					<span>درباره ما</span>
				</div>
				<div className=' container w-full flex flex-col justify-center items-start gap-4 py-8 text-justify'>
					<p className='w-full font-bold flex justify-center items-center'
						dangerouslySetInnerHTML={{ __html: data?.about }}
					></p>

				</div>
			</div>
			<Footer />
		</div>
	);
};

export default about;