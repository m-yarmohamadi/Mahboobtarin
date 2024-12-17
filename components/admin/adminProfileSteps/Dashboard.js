import Alert from "@/components/Alert";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoNotificationsOutline, IoWarningOutline } from "react-icons/io5";
import { PiWarningBold } from "react-icons/pi";
import State from "./dashboard/State";
import VisitChart from "./dashboard/VisitChart";
import ServicesChart from "./dashboard/ServicesChart";
import IncomeChart from "./dashboard/IncomeChart";
import Link from "next/link";
import { useDashboardInfo } from "@/hooks/useDashboard";
import LoadingAdmin from "../LoadingAdmin";

export default function Dashboard() {
  const { infoData, isLoading } = useDashboardInfo();
  const { chart, summary } = infoData || {};

  if (isLoading) return <LoadingAdmin />;

  return (
    <div className="space-y-6">
      <div className="flex items-start p-6 gap-2 bg-orange-300/40 rounded-lg">
        <span>
          <BiInfoCircle className="w-6 h-6 text-textDefault" />
        </span>
        <div className="text-sm lg:text-base text-orange-500 leading-6">
          <span className="font-bold">توجه:</span>
          کاربر گرامی! شما با تکمیل دقیق اطالعات عمومی حساب کاربری تان به
          تحقق اولی ن دانشنامه ی خود ناظر مفاخر، مشاهیر و محبوبترین ها یاری می
          رسانید. همچنین شما می توانید با فعالیت هرچه بیشتر در این سامانه، سطح
          کاربری خود را ارتقا داده و از امکانات و خدمات آن بهره مند شوید
        </div>
      </div>

      <Alert>
        <div className="w-full flex items-start gap-2">
          <span>
            <HiOutlineUserCircle className="w-10 h-10 text-slate-700" />
          </span>
          <div className="space-y-3">
            <h4 className="lg:text-lg font-bold text-slate-700">
              تکمیل اطلاعات حساب کاربری
            </h4>
            <p className="text-slate-700 text-sm lg:text-base">
              جهت ارتقای سطح حساب کاربری اطلاعات خود را تکمیل کنید
            </p>
            <Link
              href={"/admin/personalInfo"}
              className="btn btn--danger rounded-full"
            >
              تکمیل حساب کاربری
            </Link>
          </div>
        </div>
      </Alert>
      <Alert>
        <Link
          href={"/admin/settings"}
          className="w-full flex flex-col gap-4 items-center sm:flex-row sm:items-start"
        >
          <span className="w-20 h-20 rounded-full bg-red-600/30 text-red-600 flex items-center justify-center">
            <IoNotificationsOutline className="w-10 h-10" />
          </span>
          <div className="space-y-4 flex-1">
            <h4 className=" font-bold text-slate-700">اجازه ارسال اعلانات</h4>
            <p className="text-slate-700 text-sm lg:text-base">
              برای دریافت اعلان سفارشات، فراخوان ها و سایر موارد لطفا کلیک کنید
              و گزینه اجازه دادن (Allow) را انتخاب کنید
            </p>
          </div>
        </Link>
      </Alert>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <VisitChart
          visits={chart.number_views_pages}
          state={summary.total_views}
        />
        <State summaryData={summary} />
        <ServicesChart
          services={chart.number_successful_services}
          state={summary.successful_services}
        />
        <IncomeChart incomes={chart.income} state={summary.total_income} />
      </div>
    </div>
  );
}
