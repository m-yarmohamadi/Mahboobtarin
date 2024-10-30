/** @type {import('tailwindcss').Config} */
export const content = [
	'./pages/**/*.{js,ts,jsx,tsx,mdx}', 
	'./components/**/*.{js,ts,jsx,tsx,mdx}', 
	'./app/**/*.{js,ts,jsx,tsx,mdx}',
	'./tools/**/*.{js,ts,jsx,tsx,mdx}'
];

export const darkMode = "class";

export const theme = {
	extend: {
		fontFamily: {
			sans:  "var(--font-primary)",
		},
		colors: {
			tertiary: {
				'01': 'var(--tertiary-01)',
				'02': 'var(--tertiary-02)',
			},
			secondary: {
				'01': 'var(--secondary-01)',
				'02': 'var(--secondary-02)',
			},
			primary: {
				'01': 'var(--primary-01)',
				'02': 'var(--primary-02)',
				'03': 'var(--primary-03)',
				'04': 'var(--primary-04)',
				'05': 'var(--primary-05)',
			},
			slate: {
				'50': 'var(--color-slate-50)',
				'100': 'var(--color-slate-100)',
				'200': 'var(--color-slate-200)',
				'300': 'var(--color-slate-300)',
				'400': 'var(--color-slate-400)',
				'500': 'var(--color-slate-500)',
				'600': 'var(--color-slate-600)',
				'700': 'var(--color-slate-700)',
				'800': 'var(--color-slate-800)',
				'900': 'var(--color-slate-900)',
				'950': 'var(--color-slate-950)',
			},
			oorange: 'var(--orange)',
			error: 'var(--error)',
			white: 'var(--white)',
			textDefault: {
				DEFAULT: 'var(--text-color)', 
			},
		},
		boxShadow: {
			sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
			md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
			darkSm: '0 1px 2px 0 rgba(255, 255, 255, 0.1)', 
			darkMd: '0 4px 6px -1px rgba(255, 255, 255, 0.1)',
			darkLg: '0 10px 15px -3px rgba(255, 255, 255, 0.2)',
		},
		screens: {
			xs: '475px',
			xxs: '375px'
		},
	},
	container: {
		center: true,
		padding: '1rem',
	},
};
export const plugins = [
	require('tailwind-scrollbar'),
	require('@tailwindcss/aspect-ratio'),
	require("@tailwindcss/forms")({
		strategy: 'class',
	  }),
];
