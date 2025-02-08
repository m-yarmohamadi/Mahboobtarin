import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export async function goPaymentService(orderid) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dopayment-service`,
      { orderid },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    if (data) {
      window.location.href = data.redirect_to;
    }
  } catch (error) {
    console.log(error);

    toast.error("خطا در درگاه پرداخت!");
  }
}
