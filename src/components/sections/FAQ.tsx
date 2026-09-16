import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'

export function FAQ() {
  return (
    <section id="faq" className="bg-ink/95 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading align="center" eyebrow="FAQ" heading="Common Questions" />

        <Accordion.Root type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <Accordion.Item
              key={faq.question}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-bone/10 bg-charcoal-2"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-5 text-left font-display text-lg tracking-wide text-bone">
                  {faq.question}
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-bone/50 transition-transform duration-300 group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden px-6 text-sm leading-relaxed text-bone/70 data-[state=open]:pb-5 data-[state=open]:animate-fade-up">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
