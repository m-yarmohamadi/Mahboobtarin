import http from './httpService';

export function login(data) {
	return http.post('/api/v1/login', data).then(({ data }) => data.data);
}
export function register(data) {
	return http.post('/api/v1/register', data);
}
