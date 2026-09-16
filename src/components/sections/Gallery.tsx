import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

// Real Gym Bob's footage plus curated open-source gym photos (Unsplash,
// free-to-use license) so the gallery doesn't just repeat imagery already
// used in the Hero/Trainers/Online Coaching sections above.
const items = [
  { type: 'video', src: '/media/gym-clip-1.mp4', span: 'sm:col-span-2 sm:row-span-2' },
  { type: 'image', src: '/media/gallery/deadlift-closeup.jpg', span: '' },
  { type: 'image', src: '/media/gallery/dumbbell-rack.jpg', span: '' },
  { type: 'video', src: '/media/gym-clip-2.mp4', span: 'sm:col-span-2' },
  { type: 'image', src: '/media/gallery/dark-gym-floor.jpg', span: '' },
  { type: 'image', src: '/media/gallery/spotter-bench.jpg', span: 'sm:col-span-2' },
  { type: 'image', src: '/media/gallery/loading-plates.jpg', span: '' },
  { type: 'image', src: '/media/gallery/back-extension.jpg', span: '' },
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
