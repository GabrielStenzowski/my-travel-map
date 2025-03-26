/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'Head-table': '#c2c2c2',
        'Head-Title-Table': '#353535',
        'Daju-Hiper': '#00b0f0',
        Dark900: '#353535',
        Gray800: '#808080',
        Gray700: '#999898',
        Gray600: '#c1c1c1',
        Gray500: '#c2c2c2',
        Gray200: '#f5f5f5',
        Blue700: '#0071e3',
        Blue800: '#0069d9',
        Blue300: '#a4c8de',
        Green900: '#00875f',
        Green400: '#31bb00',
        Yellow900: '#f49024',
        Yellow600: '#ffc047',
        Red600: '#ef4444',
        Purple900: '#731b57',
        Red800: '#FF0000',
        Red100: '#ff8989',
        Pink100: '#F28CCF',
        YellowPastel: '#FDFD96',
        OrangePastel: '#F4A460',
        RedPastel: '#FA8072',
        PinkPastel: '#FFB6C1',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        cmvIsGood: '#37d67f',
        cmvIsOk: '#fcf22d',
        cmvIsBad: '#ff0000ab',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  safelist: [
    'text-Dark900',
    'text-Red800',
    'text-Green400',
    'text-green-700',
    'text-green-400',
  ],
  plugins: [require('tailwindcss-animate')],
}
export default config
