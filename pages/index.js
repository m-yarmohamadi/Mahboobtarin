// import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Slider from '@/components/Slider';
import Baner from '@/components/Baner';
import Services from '@/components/Services';
import PopularMounth from '@/components/PopularMounth';
import Baner02 from '@/components/Baner02';
import FrequentSearches from '@/components/FrequentSearches';
import Baner03 from '@/components/Baner03';
import Recommended from '@/components/Recommended';
import News from '@/components/News';
import Baner04 from '@/components/Baner04';
import Store from '@/components/Store';
import Resume from '@/components/Resume';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

const index = () => {
	return (
		<>
			<div className='w-full  max-w-full h-full max-h-full box-content mt-20 transition-all duration-1000 ease-in-out'>
				<Header />
				<Slider />
				<Baner />
				<PopularMounth />
				<Services />
				<Baner02 />
				<FrequentSearches />
				<Baner03 />
				<Recommended />
				<News />
				<Baner04 />
				<Store />
				<Resume />
				<Footer />
			</div>
		</>
	);
};

export default index;
