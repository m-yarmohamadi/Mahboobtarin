import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const app = axios.create({
	baseURL: BASE_URL,
	// withCredentials: true,
});



const http = {
	get: app.get,
	post: app.post,
	delete: app.delete,
	put: app.put,
	patch: app.patch,
};
export default http;
