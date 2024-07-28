import Alert from "@/components/Alert";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoNotificationsOutline, IoWarningOutline } from "react-icons/io5";
import { PiWarningBold } from "react-icons/pi";
import State from "./dashboard/State";
import VisitChart from "./dashboard/VisitChart";
import ServicesChart from "./dashboard/ServicesChart";
import IncomeChart from "./dashboard/IncomeChart";


export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-start p-6 gap-2 bg-orange-300/40 rounded-lg">
                <span>
                    <BiInfoCircle className="w-6 h-6"/>
                </span>
                <div className="text-sm lg:text-base text-orange-500 leading-6">
                    <span className="font-bold">
                        توجه:
                    </span>
                    &nbsp;
                     سطح کاربری شما نقره ای میباشد. شما می توانید با تکمیل اطلاعات خود و سایر موارد درخواستی ضمن مساعدت به ارتقای بخش دانشنامه و سطح کاربری تان از امکانات و خدمات بیشتر سامانه برخوردار شوید.                
                </div>
            </div>

            <Alert>
                <div className="w-full flex items-start gap-2">
                    <span>
                        <HiOutlineUserCircle className="w-10 h-10"/>
                    </span>
                    <div className="space-y-3">
                        <h4 className="lg:text-lg font-bold text-gray-700">
                            تکمیل اطلاعات حساب کاربری
                        </h4>
                        <p className="text-gray-700 text-sm lg:text-base">
                            جهت ارتقای سطح حساب کاربری اطلاعات خود را تکمیل کنید
                        </p>
                        <button className="btn btn--danger rounded-full">
                            تکمیل حساب کاربری
                        </button>
                    </div>
                </div>
            </Alert>


            <Alert>
                <div className="space-y-4">
                    <div className="w-full flex flex-col gap-4 items-center sm:flex-row sm:items-start">
                        <span className="w-20 h-20 rounded-full bg-red-600/30 text-red-600 flex items-center justify-center">
                            <IoWarningOutline className="w-10 h-10"/>
                        </span>
                        <div className="space-y-4 flex-1">
                            <h4 className=" font-bold text-gray-700">
                                شماره تماس اضطراری خود را ثبت کنید
                            </h4>
                            <p className="text-gray-700 text-sm lg:text-base">
                                در مواردی که شماره تماس اصلی در دسترسی نباشد، پشتیبانی با شماره تماس اضطراری تماس خواهد گرفت.
                            </p>
                        </div>
                    </div>
                    <button className="btn btn--danger w-full">
                        ثبت شماره تماس اضطراری
                    </button>
                </div>
            </Alert>


            <Alert>
                <div className="w-full flex flex-col gap-4 items-center sm:flex-row sm:items-start">
                    <span className="w-20 h-20 rounded-full bg-red-600/30 text-red-600 flex items-center justify-center">
                        <IoNotificationsOutline className="w-10 h-10"/>
                    </span>
                    <div className="space-y-4 flex-1">
                        <h4 className=" font-bold text-gray-700">
                            اجازه ارسال اعلانات
                        </h4>
                        <p className="text-gray-700 text-sm lg:text-base">
                            برای دریافت اعلان سفارشات، فراخوان ها و سایر موارد لطفا کلیک کنید و گزینه اجازه دادن (Allow) را انتخاب کنید
                        </p>
                    </div>
                </div>
            </Alert>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                <VisitChart />
                <State />
                <ServicesChart />
                <IncomeChart />
            </div>
        </div>
    )
}

