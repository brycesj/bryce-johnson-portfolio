import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        graphite: "#344054",
        circuit: "#0f766e",
        copper: "#c8793a",
        mist: "#eef7f6"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.10)",
        lift: "0 24px 70px rgba(15, 23, 42, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
