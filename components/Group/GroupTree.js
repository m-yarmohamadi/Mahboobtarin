import React, { useState } from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';

const GroupTree = ({ label, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='ml-4'>
			<div
				className='flex items-center cursor-pointer'
				onClick={toggleOpen}>
				<span className={`mr-2 ${isOpen ? '-rotate-90' : ''} flex gap-3`}>
					<FaAngleDoubleLeft />
				</span>
				<span>{label}</span>
			</div>
			{isOpen && <div className='ms-4'>{children}</div>}
		</div>
	);
};

export default GroupTree;
