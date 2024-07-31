import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import path from 'node:path'; 

export default {
  content: [
    "./src/**/*.tsx",
    path.join(path.dirname(require.resolve('@coinbase/onchainkit')), '**/*.js'),
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--bg-primary)',
      },
      borderRadius: {
        button: '4px',
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config;
