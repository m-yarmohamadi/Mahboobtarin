import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const app = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

app.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 429 && !originalConfig._retry) {
      originalConfig._retry = true;
      toast.error("تلاش های بیش از حد. لطفا چند لحظه دیگر مجدد تلاش فرمایید");

      setTimeout(() => {
        window.location.reload();
      }, 30000);
      return app(originalConfig);
    }

    return Promise.reject(err);
  }
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};
export default http;
