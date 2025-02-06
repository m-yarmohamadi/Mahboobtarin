import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import RegisterModal from "./Register/registermodal";
import Cookies from "js-cookie";
import { BiLogOut } from "react-icons/bi";
import LoginRegister from "./LoginRegister";
import useLogout from "@/hooks/useLogout";
import { FaLayerGroup } from "react-icons/fa";
import useAllSettings from "@/hooks/useAllSettings";
import Categories from "./Categories";
import useMainPage, { useCategoryChild } from "@/hooks/useMainPage";
import { getCategoryChild } from "@/services/mainPageService";
import MobileMenu from "./MobileMenu";
import useProfile from "@/hooks/useProfile";

const products = [
  {
    name: "پزشکان",
    description: "مشاهده بهترین پزشکان در حوزه های مختلف",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "هنرمندان",
    description: "مشاهده بهترین هنرمندان در حوزه های مختلف",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "ورزشکاران",
    description: "مشاهده بهترین ورزشکاران در حوزه های مختلف",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "خبرنگاران",
    description: "مشاهده بهترین خبرنگاران در حوزه های مختلف",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "کارمندان",
    description: "مشاهده بهترین کارمندان در حوزه های مختلف",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const menu = [
  // { id: 1, title: "آموزشگاه", link: "/academy" },
  // { id: 2, title: "محبوب مال", link: "/shop" },
  // { id: 3, title: "فراخوان", link: "/requests" },
  { id: 5, title: "مجله محبوب‌ترین", link: "/magazine" },
];

const callsToAction = [
  { name: "درباره ما", href: "#", icon: PlayCircleIcon },
  { name: "تماس با ما", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ isShowMobileMenu = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [token, setToken] = useState("");
  const [cateDesk, setCateDesk] = useState(false);
  const logout = useLogout();
  const data = useAllSettings();
  const { categories, isLoading } = useMainPage();
  const { user, isLoading: isLoadingUser } = useProfile();

  useEffect(() => {
    const tokenCooke = Cookies.get("accessToken")
      ? Cookies.get("accessToken")
      : null;
    setToken(tokenCooke);
  }, []);

  return (
    <div className="w-full bg-primary-02 z-50 sticky shadow-md dark:shadow-darkMd  top-0 left-0 right-0 header-primary">
      <header className="w-full md:mx-auto flex justify-center items-between md:container">
        <Dialog
          className={`lg:hidden`}
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 " />
          <DialogPanel
            className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
          >
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto dark:brightness-200"
                  src={data ? data.logo : "/images/logo.png"}
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50">
                          <div className="flex items-center gap-2">
                            <span className="text-lg text-primary-01">
                              <FaLayerGroup />
                            </span>
                            دسته بندی ها
                          </div>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {!isLoading &&
                            categories
                              .filter((c) => c.parent_id === 0)
                              .map((item) => (
                                <CateMobileItem key={item.id} category={item} />
                              ))}
                          <div className="w-full  bg-primary-01 h-1"></div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                  {menu.map((item) => {
                    return (
                      <Link
                        key={item.id}
                        href={item?.link || "#"}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="pt-20">
              <LoginRegister
                setOpenRegisterModal={setOpenRegisterModal}
                handleLogOut={logout}
                size="sm"
                user={user}
                isLoading={isLoadingUser}
              />
            </div>
          </DialogPanel>
        </Dialog>
        <nav
          className="w-full max-w-full mx-auto flex  items-center justify-between p-2"
          aria-label="Global"
        >
          <div className="w-2/4 flex">
            <Link href="/">
              <span className="sr-only">محبوب‌ترین</span>

              <img
                className="w-48 dark:brightness-200"
                src={data ? data.logo : "/images/logo.png"}
                alt="محبوب‌ترین"
              />
            </Link>
          </div>
          <div className=" px-4  lg:hidden gap-3">
            <button
              type="button"
              className="w-full inline-flex items-center justify-end rounded-md p-1 text-slate-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:w-full  lg:flex gap-x-2 lg:gap-x-4">
            <Popover className=" flex justify-start items-center category group ps-10">
              <button
                onClick={() => setCateDesk(!cateDesk)}
                className=" flex justify-center items-center truncate gap-x-1 text-xs xl:text-sm font-semibold leading-6 text-slate-900"
              >
                <span className="text-lg text-primary-01">
                  <FaLayerGroup />
                </span>
                دسته بندی ها
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-slate-600"
                  aria-hidden="true"
                />
              </button>
              <Categories
                isOpen={cateDesk}
                setIsOpen={() => setCateDesk(false)}
                categories={categories}
                isLoading={isLoading}
              />
            </Popover>

            {menu.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item?.link || "#"}
                  className="text-sm xl:text-base whitespace-nowrap py-4 px-2 text-textDefault relative before:duration-200 before:ease-out cursor-pointer before:h-1 before:w-0 before:rounded-t-full hover:before:w-full before:absolute before:-bottom-2 before:right-0 before:bg-primary-01"
                >
                  {item.title}
                </Link>
              );
            })}
          </PopoverGroup>
          <div className="hidden lg:w-full lg:flex">
          <LoginRegister
            setOpenRegisterModal={setOpenRegisterModal}
            handleLogOut={logout}
            user={user}
            isLoading={isLoadingUser}
          />
          </div>
        </nav>

      </header>
      {isShowMobileMenu && <MobileMenu user={user} isLoading={isLoadingUser} />}
      <RegisterModal
        openRegisterModal={openRegisterModal}
        setOpenRegisterModal={setOpenRegisterModal}
      />
    </div>
  );
}

function CateMobileItem({ category }) {
  // const { categoryChilds, isGetCateChild } = useCategoryChild(category.id);

  return (
    <Disclosure as="div" className="pl-5">
      {({ open }) => (
        <>
          <DisclosureButton className="flex w-full items-center justify-between rounded-lg p-2 font-semibold leading-7 text-slate-900 hover:bg-slate-50 text-sm">
            <Link
              href={`/group/${category.id}`}
              className="flex items-center gap-2"
            >
              {category.name}
            </Link>
            <ChevronDownIcon
              className={classNames(
                open ? "rotate-180" : "",
                "h-5 w-5 flex-none"
              )}
            />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 space-y-4">
            {category &&
              category?.children_recursive?.map((item) => (
                // <div
                //   key={item.id}
                //   className="flex items-center gap-2 text-slate-800 font-semibold pr-3 text-xs"
                // >
                //   {item.name}
                // </div>
                <CateMobileItem category={item} />
              ))}
            <div className="w-full  bg-primary-01 h-1"></div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
