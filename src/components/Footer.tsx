import { brand, navLinks } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink/95 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="flex flex-col items-center gap-3 lg:items-start">
          <img src="/media/logo.png" alt={brand.name} className="h-16 w-auto" />
          <p className="max-w-xs text-xs text-bone/50">
            {brand.address} &middot; {brand.phone}
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm tracking-wide text-bone/60 hover:text-bone"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-2 lg:items-end">
          <div className="flex gap-4 text-xs text-bone/50">
            <a href="#" className="hover:text-bone">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-bone">
              Terms
            </a>
          </div>
          <p className="text-xs text-bone/40">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
