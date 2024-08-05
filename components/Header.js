import { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react';
import { ArrowPathIcon, Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import RegisterModal from './Register/registermodal';
import Cookies from 'js-cookie';
import { BiLogOut } from 'react-icons/bi';
import LoginRegister from './LoginRegister';
import useLogout from '@/hooks/useLogout';
import { FaLayerGroup } from 'react-icons/fa';
import useAllSettings from '@/hooks/useAllSettings';

const products = [
	{
		name: 'پزشکان',
		description: 'مشاهده بهترین پزشکان در حوزه های مختلف',
		href: '#',
		icon: ChartPieIcon,
	},
	{
		name: 'هنرمندان',
		description: 'مشاهده بهترین هنرمندان در حوزه های مختلف',
		href: '#',
		icon: CursorArrowRaysIcon,
	},
	{
		name: 'ورزشکاران',
		description: 'مشاهده بهترین ورزشکاران در حوزه های مختلف',
		href: '#',
		icon: FingerPrintIcon,
	},
	{
		name: 'خبرنگاران',
		description: 'مشاهده بهترین خبرنگاران در حوزه های مختلف',
		href: '#',
		icon: SquaresPlusIcon,
	},
	{
		name: 'کارمندان',
		description: 'مشاهده بهترین کارمندان در حوزه های مختلف',
		href: '#',
		icon: ArrowPathIcon,
	},
];
const menu = [
	{ id: 1, title: 'آموزشگاه' },
	{ id: 2, title: 'محبوب مال' },
	{ id: 3, title: 'فراخوان' },
	{ id: 4, title: 'لینکدونی' },
	{ id: 5, title: 'مجله محبوب ترین' },
];

const callsToAction = [
	{ name: 'درباره ما', href: '#', icon: PlayCircleIcon },
	{ name: 'تماس با ما', href: '#', icon: PhoneIcon },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [openRegisterModal, setOpenRegisterModal] = useState(false);
	const [token, setToken] = useState('');
	const logout = useLogout();
	const data = useAllSettings();

	useEffect(() => {
		const tokenCooke = Cookies.get('accessToken') ? Cookies.get('accessToken') : null;
		setToken(tokenCooke);
	}, []);

	return (
		<div className='w-full bg-primary-02 z-50 sticky shadow-md  top-0 left-0 right-0'>
			<header className=' md:mx-auto md:container'>
				<nav
					className='w-full mx-auto flex max-w-full items-center justify-between p-2 '
					aria-label='Global'>
					<div className='flex '>
						<Link href='/'>
							<span className='sr-only'>محبوبترین</span>

							<img
								className='h-12 w-auto'
								src={data? data.logo: '/images/logo.png'}
								alt=''
							/>
						</Link>
					</div>
					<div className='flex justify-end px-4 items-center w-full md:hidden'>
						<button
							type='button'
							className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
							onClick={() => setMobileMenuOpen(true)}>
							<span className='sr-only'>Open main menu</span>
							<Bars3Icon
								className='h-6 w-6'
								aria-hidden='true'
							/>
						</button>
					</div>
					<PopoverGroup className='hidden md:flex md:gap-x-4'>
						<Popover className='relative flex justify-center items-center'>
							<PopoverButton className='flex justify-center items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900'>
								<span className='text-lg text-primary-01'>
									<FaLayerGroup />
								</span>
								دسته بندی ها
								<ChevronDownIcon
									className='h-5 w-5 flex-none text-gray-400'
									aria-hidden='true'
								/>
							</PopoverButton>

							<Transition
								enter='transition ease-out duration-200'
								enterFrom='opacity-0 translate-y-1'
								enterTo='opacity-100 translate-y-0'
								leave='transition ease-in duration-150'
								leaveFrom='opacity-100 translate-y-0'
								leaveTo='opacity-0 translate-y-1'>
								<PopoverPanel className='z-20 absolute -left-8 top-full  mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'>
									<div className='p-4'>
										{products.map((item) => (
											<div
												key={item.name}
												className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50'>
												<div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
													<item.icon
														className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
														aria-hidden='true'
													/>
												</div>
												<div className='flex-auto'>
													<a
														href={item.href}
														className='block font-semibold text-gray-900'>
														{item.name}
														<span className='absolute inset-0' />
													</a>
													<p className='mt-1 text-gray-600'>{item.description}</p>
												</div>
											</div>
										))}
									</div>
									<div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50'>
										{callsToAction.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className='flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100'>
												<item.icon
													className='h-5 w-5 flex-none text-gray-400'
													aria-hidden='true'
												/>
												{item.name}
											</a>
										))}
									</div>
								</PopoverPanel>
							</Transition>
						</Popover>

						{menu.map((item) => {
							return (
								<a
									key={item.id}
									href='#'
									className='py-4 px-2 relative before:duration-200 before:ease-out cursor-pointer before:h-1 before:w-0 before:rounded-t-full hover:before:w-full before:absolute before:-bottom-2 before:right-0 before:bg-primary-01'>
									{item.title}
								</a>
							);
						})}
					</PopoverGroup>

					<LoginRegister
						token={token}
						setOpenRegisterModal={setOpenRegisterModal}
						handleLogOut={logout}
					/>
				</nav>
				<Dialog
					className='md:hidden'
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}>
					<div className='fixed inset-0 z-10' />
					<DialogPanel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
						<div className='flex items-center justify-between'>
							<a
								href='#'
								className='-m-1.5 p-1.5'>
								<span className='sr-only'>Your Company</span>
								<img
									className='h-8 w-auto'
									src={data? data.logo: '/images/logo.png'}
									alt=''
								/>
							</a>
							<button
								type='button'
								className='-m-2.5 rounded-md p-2.5 text-gray-700'
								onClick={() => setMobileMenuOpen(false)}>
								<span className='sr-only'>Close menu</span>
								<XMarkIcon
									className='h-6 w-6'
									aria-hidden='true'
								/>
							</button>
						</div>
						<div className='mt-6 flow-root'>
							<div className='-my-6 divide-y divide-gray-500/10'>
								<div className='space-y-2 py-6'>
									<Disclosure
										as='div'
										className='-mx-3'>
										{({ open }) => (
											<>
												<DisclosureButton className='flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
													<span className='text-lg text-primary-01'>
														<FaLayerGroup />
													</span>
													دسته بندی ها
													<ChevronDownIcon
														className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
														aria-hidden='true'
													/>
												</DisclosureButton>
												<DisclosurePanel className='mt-2 space-y-2'>
													{[...products, ...callsToAction].map((item) => (
														<DisclosureButton
															key={item.name}
															as='a'
															href={item.href}
															className='block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
															{item.name}
														</DisclosureButton>
													))}
													<div className='w-full  bg-primary-01 h-1'></div>
												</DisclosurePanel>
											</>
										)}
									</Disclosure>
									{menu.map((item) => {
										return (
											<a
												key={item.id}
												href='#'
												className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
												{item.title}
											</a>
										);
									})}
								</div>
							</div>
						</div>
						<div className='pt-20'>
												<LoginRegister
							token={token}
							setOpenRegisterModal={setOpenRegisterModal}
							handleLogOut={logout}
							size={"sm"}
						/>
	
						</div>
						
					</DialogPanel>
				</Dialog>
			</header>
			<RegisterModal
				openRegisterModal={openRegisterModal}
				setOpenRegisterModal={setOpenRegisterModal}
			/>
		</div>
	);
}
