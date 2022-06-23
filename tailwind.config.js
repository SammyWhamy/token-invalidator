module.exports = {
    mode: 'jit',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        fontSize: {
            '4xs': '.25rem',
            '3xs': '.375rem',
            '2xs': '.7rem',
            'xs': '.75rem',
            'sm': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '5xl': '3rem',
            '6xl': '4rem',
        },
        fontFamily: {
            sans: ['Times new roman']
        },
        extend: {
            colors: {
                dark: '#000',
                white: '#fff',
                lightText: '#76797d',
                bgDark: '#2E3440',
                cardDark: '#434C5E',
                butDark: '#5E81AC',
                bgLight: '#D8DEE9',
                cardLight: '#E5E9F0',
                butLight: '#81A1C1',
                discordDark: '#1E1E23',
                blue: {
                    101: '#0F7BFF'
                },
                fuchsia: {
                    101: '#F47BFF'
                }
            },
            keyframes: {
                slideIn: {
                    '0%': {
                        opacity: '0%'
                    },
                    '100%': {
                        opacity: '100%'
                    },
                },
                spinner: {
                  '0%': {
                    transform: 'rotate(0turn)'
                  },
                  '100%': {
                    transform: 'rotate(1turn)'
                  }
                }
            },
            animation: {
                'slide': 'slideIn 1s ease-out 0s 1',
                'spinner': 'spin 2000ms infinite'
            }
        }
    },
    variants: {
        backgroundColor: ({
            after
        }) => after(["disabled"]),
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ]
};
