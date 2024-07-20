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

		default:
			return msg;
	}
};
