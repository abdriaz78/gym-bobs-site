import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

const items = [
  { type: 'video', src: '/media/gym-clip-1.mp4', span: 'sm:col-span-2 sm:row-span-2' },
  { type: 'image', src: '/media/mascot-blue.png', span: '' },
  { type: 'video', src: '/media/gym-clip-2.mp4', span: '' },
  { type: 'image', src: '/media/mascot-brown.png', span: 'sm:col-span-2' },
  { type: 'video', src: '/media/hero-video.mp4', span: '' },
] as const

export function Gallery() {
  return (
    <section id="gallery" className="bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Gallery" heading="Inside Gym Bob's" />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <Card key={item.src + i} index={i} className={`overflow-hidden ${item.span}`}>
              {item.type === 'video' ? (
                <video
                  className="h-64 w-full object-cover sm:h-full"
                  src={item.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
              ) : (
                <img src={item.src} alt="" className="h-64 w-full object-cover sm:h-full" loading="lazy" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
