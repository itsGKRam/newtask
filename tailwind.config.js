module.exports = {
    prefix: 'smv-',
    corePlugins: {
        preflight: false,
    },
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
