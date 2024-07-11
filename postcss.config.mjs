/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
  experimental: {
    // Enable server actions if you're using them
    serverActions: true,
  },
  
};

export default config;
