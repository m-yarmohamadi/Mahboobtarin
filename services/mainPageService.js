import http from "./httpService";

export function getAllSettings() {
	return http.get('/api/v1/get-setting').then(({ data }) => data);
}