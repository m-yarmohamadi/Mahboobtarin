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

export function updateProfile(data) {
	return http.post('/api/v1/users/update', data,{
		headers:{
			Authorization: `Bearer ${Cookies.get("accessToken")}`
		}
	});
}

