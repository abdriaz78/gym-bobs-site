import { Mail, MapPin, Phone } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { brand } from '../../data/content'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons'

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Mock submission — no backend wired up yet.
    // TODO: point this at a real form endpoint (e.g. Formspree, a serverless
    // function, or your CRM) when ready.
    setSent(true)
  }

  return (
    <section id="contact" className="bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Visit Us" heading="Find Gym Bob's" />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-bone/10">
              <iframe
                title="Gym Bob's of Texas location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(brand.address)}&output=embed`}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-ember-light" />
                <p className="text-sm text-bone/80">{brand.address}</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-ember-light" />
                <p className="text-sm text-bone/80">{brand.phone}</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-ember-light" />
                <p className="text-sm text-bone/80">{brand.email}</p>
              </div>
              <div className="flex flex-col gap-1 text-sm text-bone/80">
                {brand.hours.map((h) => (
                  <p key={h.days}>
                    <span className="font-bold text-bone">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <a href={brand.social.instagram} className="text-bone/60 hover:text-ember-light">
                <InstagramIcon size={22} />
              </a>
              <a href={brand.social.facebook} className="text-bone/60 hover:text-ember-light">
                <FacebookIcon size={22} />
              </a>
              <a href={brand.social.youtube} className="text-bone/60 hover:text-ember-light">
                <YoutubeIcon size={22} />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-bone/10 bg-charcoal-2 p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <h3 className="font-display text-2xl uppercase text-bone">Message Sent</h3>
                <p className="mt-2 text-sm text-bone/70">
                  Thanks — a member of our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-bone/60">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-ember"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-bone/60">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-ember"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-bone/60">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-ember"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
