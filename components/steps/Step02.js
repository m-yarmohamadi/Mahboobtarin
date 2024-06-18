import Input from '@/tools/Input';
import Select from '@/tools/Select';
import React from 'react';

const Step02 = () => {
	return (
		<div>
			<form className='w-full  '>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
					<Input
						name={'country'}
						title={'کشور محل سکونت'}
						type={'text'}
					/>
					<Input
						name={'state'}
						title={'استان محل سکونت'}
						type={'text'}
					/>
					<Input
						name={'city'}
						title={'شهر محل سکونت'}
						type={'text'}
					/>
					<Input
						name={'posrcode'}
						title={'کدپستی'}
						type={'text'}
					/>
					<Input
						name={'homeAddress'}
						title={'آدرس محل سکونت'}
						type={'text'}
					/>
					<Input
						name={'officeAddress'}
						title={'آدرس محل کار'}
						type={'text'}
					/>
				</div>
			</form>
		</div>
	);
};

export default Step02;
