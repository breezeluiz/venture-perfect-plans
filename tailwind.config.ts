import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Geist', 'Inter', 'system-ui', 'sans-serif'],
				'mono': ['JetBrains Mono', 'monospace'],
				'display': ['Geist', 'Inter', 'sans-serif'],
				'body': ['Inter', 'system-ui', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				nexus: {
					primary: 'hsl(var(--nexus-primary))',
					'primary-light': 'hsl(var(--nexus-primary-light))',
					'primary-dark': 'hsl(var(--nexus-primary-dark))',
					secondary: 'hsl(var(--nexus-secondary))',
					'secondary-light': 'hsl(var(--nexus-secondary-light))',
					accent: 'hsl(var(--nexus-accent))',
					neutral: 'hsl(var(--nexus-neutral))',
					'neutral-dark': 'hsl(var(--nexus-neutral-dark))',
					surface: 'hsl(var(--nexus-surface))',
					'surface-elevated': 'hsl(var(--nexus-surface-elevated))',
					'text-primary': 'hsl(var(--nexus-text-primary))',
					'text-secondary': 'hsl(var(--nexus-text-secondary))',
					'text-inverse': 'hsl(var(--nexus-text-inverse))'
				},
				venture: {
					coral: 'hsl(var(--venture-coral))',
					'coral-light': 'hsl(var(--venture-coral-light))',
					ocean: 'hsl(var(--venture-ocean))',
					'ocean-light': 'hsl(var(--venture-ocean-light))',
					gold: 'hsl(var(--venture-gold))',
					cream: 'hsl(var(--venture-cream))',
					sand: 'hsl(var(--venture-sand))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-sunset': 'var(--gradient-sunset)',
				'gradient-ocean': 'var(--gradient-ocean)', 
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-surface': 'var(--gradient-surface)',
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)'
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'strong': 'var(--shadow-strong)',
				'glow': 'var(--shadow-glow)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
