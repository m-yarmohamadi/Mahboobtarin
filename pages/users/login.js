import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useState } from 'react';
import { BiFontSize } from 'react-icons/bi';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const login = () => {
  const [phone, setPhone] = useState('');

  return (
    <div className='mt-20'>
      <Header />
      <div className='px-10 container flex flex-col justify-center items-center w-full h-96 bg-primary-01 bg-opacity-10'>
        <div className='w-full container text-lg font-bold mx-auto flex justify-center items-center py-5'>
          <span>لطفا جهت ورود به وبسایت و استفاده از امکانات بیشتر شماره تلفن همراه خود را وارد کنید.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <PhoneInput
            defaultCountry='ir'
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputStyle={{ fontSize: '26px', width: '250px', height:'50px' }}
			style={{height:'50px'}}
			sele
          />
        </div>
        {phone}
      </div>
      <Footer />
    </div>
  );
};

export default login;
