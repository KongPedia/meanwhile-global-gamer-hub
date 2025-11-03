import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
				discord: {
					DEFAULT: 'hsl(var(--discord))',
					foreground: 'hsl(var(--discord-foreground))'
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
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-hero': 'var(--gradient-hero)'
			},
			boxShadow: {
				'neon': 'var(--shadow-neon)',
				'neon-pink': 'var(--shadow-neon-pink)',
				'gaming': 'var(--shadow-card)'
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
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'pulse-neon': {
					'0%, 100%': {
						boxShadow: 'var(--shadow-neon)'
					},
					'50%': {
						boxShadow: '0 0 30px hsl(var(--primary) / 0.8)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'slide-in-1': {
					'0%': {
						opacity: '0',
						transform: 'rotate(-6deg) scale(1.2) translateY(20%)'
					},
					'100%': {
						opacity: '0.2',
						transform: 'rotate(-6deg) scale(1.2) translateY(10%)'
					}
				},
				'slide-in-2': {
					'0%': {
						opacity: '0',
						transform: 'rotate(-4deg) scale(1.15) translateY(15%)'
					},
					'100%': {
						opacity: '0.3',
						transform: 'rotate(-4deg) scale(1.15) translateY(5%)'
					}
				},
				'slide-in-3': {
					'0%': {
						opacity: '0',
						transform: 'rotate(-2deg) scale(1.1) translateY(10%)'
					},
					'100%': {
						opacity: '0.4',
						transform: 'rotate(-2deg) scale(1.1) translateY(2%)'
					}
				},
				'card-fall-1': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-50%) translateY(-100px) rotate(-6deg) scale(0.8)'
					},
					'60%': {
						transform: 'translateX(-50%) translateY(25px) rotate(-6deg) scale(1.02)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(-50%) translateY(20px) rotate(-6deg) scale(1)'
					}
				},
				'card-fall-2': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-50%) translateY(-100px) rotate(-3deg) scale(0.8)'
					},
					'60%': {
						transform: 'translateX(-50%) translateY(18px) rotate(-3deg) scale(1.02)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(-50%) translateY(15px) rotate(-3deg) scale(1)'
					}
				},
				'card-fall-3': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-50%) translateY(-100px) rotate(0deg) scale(0.8)'
					},
					'60%': {
						transform: 'translateX(-50%) translateY(12px) rotate(0deg) scale(1.02)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(-50%) translateY(10px) rotate(0deg) scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.4s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'slide-in-1': 'slide-in-1 1.2s ease-out forwards',
				'slide-in-2': 'slide-in-2 1s ease-out 0.2s forwards',
				'slide-in-3': 'slide-in-3 0.8s ease-out 0.4s forwards',
				'card-fall-1': 'card-fall-1 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards',
				'card-fall-2': 'card-fall-2 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards',
				'card-fall-3': 'card-fall-3 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1s forwards'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
