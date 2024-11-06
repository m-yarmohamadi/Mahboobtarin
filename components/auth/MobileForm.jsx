import SendMobile from '@/components/auth/SendMobile';
import Header from '../Header';
import useAllSettings from '@/hooks/useAllSettings';
import Loading from '@/tools/Loading';
import Link from 'next/link';

export default function MobileForm({ mobile, setMobile, onSubmit, isLoading, setCountryCode, countryCode }) {
	const data = useAllSettings();

	return (
		<>
			{!data && (
				<div className='w-full h-full gap-3 font-bold backdrop-blur-sm text-xl  flex-col fixed top-0 right-0 flex items-center justify-center bg-white bg-opacity-80 z-[60]'>
					<Loading customeColor='#15aa7f' />
				</div>
			)}

			<div className='w-full flex flex-col pt-12'>
				<div className='flex items-center justify-center'>
					<div className='w-full h-auto p-7 bg-white rounded-lg shadow-s max-w-lg gap-7 mx-auto flex items-center justify-center flex-col'>
						<div className='w-full'>
							<Link href='/'>
								<img
									src={data?.logo}
									alt=''
									className='max-w-[170px] mx-auto'
								/>
							</Link>
						</div>

						<SendMobile
							loading={isLoading}
							value={mobile}
							onChange={(e) => setMobile(e.target.value)}
							handleSubmitMobile={onSubmit}
							countryCode={countryCode}
							setCountryCode={setCountryCode}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
