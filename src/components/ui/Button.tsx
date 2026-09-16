import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-brass-light to-brass text-ink shadow-[0_8px_24px_-8px_rgba(201,162,39,0.5),inset_0_1px_0_rgba(255,255,255,0.4)] hover:brightness-105',
  secondary: 'bg-bone text-ink hover:bg-white',
  ghost: 'bg-transparent text-bone border border-bone/30 hover:border-bone/70 hover:bg-bone/5',
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-200 ease-out active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
