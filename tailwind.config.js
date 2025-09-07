  import { heroui } from "@heroui/theme";

  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/entities/**/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "green",
        },
        text: {
          light: "#111827",
          dark: "#f9fafb",
        },
      },
    },
  },
    darkMode: "class",
    plugins: [heroui()],
  };

