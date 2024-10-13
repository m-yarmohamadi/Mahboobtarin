export const enToFaMessages = (msg) => {
	switch (msg) {
		case 'The mobile has already been taken.':
			return 'شماره موبایل وارد شده قبلاً ثبت نام کرده است.';
		case 'The passport number field is required.':
			return 'درج شماره پاسپورت الزامی است.';
		case 'The national code has already been taken.':
			return 'کدملی وارد شده قبلاً ثبت نام کرده است.';
		case 'The national code field is required.':
			return 'درج کدملی الزامی است.';
		case 'user not found':
			return 'کاربری با این شماره یافت نشد.';
		case 'OPT sent':
			return 'کد تأیید به تلفن همراه شما ارسال گردید.';
		case 'Unauthorized':
			return 'کلمه عبور اشتباه می باشد.';
		case 'The mobile format is invalid.':
			return 'شماره موبایل را وارد نمایید';
		case 'user not found or otp expire':
			return 'کد تایید وارد شده نادرست است';
		case 'verifycode not valid':
			return 'کد تایید وارد شده نادرست است';
		case 'The unique url id has already been taken.':
			return 'نام کاربری قبلا انتخاب شده است';

		default:
			return msg;
	}
};
