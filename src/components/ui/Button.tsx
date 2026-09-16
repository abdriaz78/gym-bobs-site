import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-ember-light to-ember text-white shadow-[0_8px_24px_-6px_rgba(255,59,31,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:brightness-110',
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
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-base tracking-wider transition-all duration-200 ease-out active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
