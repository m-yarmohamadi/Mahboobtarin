import { ThreeDots } from 'react-loader-spinner';
import React from 'react';

const Loading = () => {
	return (
        <>
		<ThreeDots
			visible={true}
			height='20'
			width='100'
			color='#ffffff'
			radius='9'
			ariaLabel='three-dots-loading'
			wrapperStyle={{}}
			wrapperClass=''
		/><ThreeDots
        visible={true}
        height='20'
        width='100'
        color='#ffffff'
        radius='9'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClass=''
    /></>
	);
};

export default Loading;
