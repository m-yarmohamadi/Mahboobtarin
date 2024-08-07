import Cookies from 'js-cookie';
import http from './httpService';

export function login(data) {
	return http.post('/api/v1/login', data)
}
export function register(data) {
	return http.post('/api/v1/register', data);
}

export function getProfile() {
	return http.get('/api/v1/user', {
		headers:{
			Authorization: `Bearer ${Cookies.get("accessToken")}`
		}
	});
}

export function getMainPage() {
	return http.get('/api/v1/main-page', {
		headers:{
			Authorization: `Bearer ${Cookies.get("accessToken")}`
		}
	});
}

export function updateProfile(formData) {
	return http.post('/api/v1/users/update', formData,{
		headers:{
			Authorization: `Bearer ${Cookies.get("accessToken")}`,
		}
	});
}

export function forgetPassword(data) {
	return http.post('/api/v1/send-forgotpass-sms', data);
}

export function changePassword(data) {
	return http.post('/api/v1/changepass', data);
}

