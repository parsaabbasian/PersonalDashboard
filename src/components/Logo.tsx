import React from 'react'

export default function Logo({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(262.1, 83.3%, 57.8%)" />
                    <stop offset="100%" stopColor="hsl(290, 70%, 50%)" />
                </linearGradient>
            </defs>
            <path
                d="M12 2L4 7V17L12 22L20 17V7L12 2Z"
                stroke="url(#logo-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 22V12M12 12L20 7M12 12L4 7"
                stroke="url(#logo-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
            />
            <path
                d="M12 6L16 8.5V13.5L12 16L8 13.5V8.5L12 6Z"
                fill="url(#logo-gradient)"
            />
        </svg>
    )
}
