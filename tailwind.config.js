/** @type {import('tailwindcss').Config} */
export const content = [
	'./pages/**/*.{js,ts,jsx,tsx,mdx}', 
	'./components/**/*.{js,ts,jsx,tsx,mdx}', 
	'./app/**/*.{js,ts,jsx,tsx,mdx}'
];
export const theme = {
	extend: {
		fontFamily: {
			sans: ['IRANSans'],
		},
		colors: {
			tertiary: {
				'01': '#f1be49',
				'02': '#dc2626',
			},
			secondary: {
				'01': '#15aa7f',
				'02': '#15aa7f',
			},
			primary: {
				'01': '#0693a4',
				'02': '#eff0f2',
				'03': '#cbcbcb',
				'04': '#dc2626',
				'05': '#ededed',
			},
			oorange: '#FF0000',
			error: '#dc2626',
		},
		screens: {
			xs: '475px',
		},
	},
	container: {
		center: true,
		padding: '1rem',
	},
};
export const plugins = [require('tailwind-scrollbar')];
