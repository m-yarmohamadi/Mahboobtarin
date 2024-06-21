/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['vazir'],
			},
			colors: {
				tertiary: '#f1be49',
				secondary: {
					'01': '#15aa7f',
					'02': '#15aa7f',
				},
				primary: {
					'01': '#0693a4',
					'02': '#eff0f2',
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
	},
	plugins: [require('tailwind-scrollbar')],
};
