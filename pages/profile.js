import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MainProfile from '@/components/Profile/Main/MainProfile';
import ProfileSearchBox from '@/components/Profile/profileSearchBox';
import React from 'react';

const profile = () => {
	return (
		<div>
			<Header />
			<ProfileSearchBox />
			<MainProfile />

			<Footer />
		</div>
	);
};

export default profile;
