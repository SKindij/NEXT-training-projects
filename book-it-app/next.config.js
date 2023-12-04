/** @type {import('next').NextConfig} */
const nextConfig = {
  // змінні середовища для використання в клієнтській та серверній частині
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/bookit",
    DB_URI: "",
  },
  // налаштування для оптимізованого завантаження зображень
  images: {
    // довірений домен для завантаження зображень
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
