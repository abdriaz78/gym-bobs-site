// All editable site copy lives here. Swap placeholder text/numbers freely —
// components just read from this file.

export const brand = {
  name: "Gym Bob's of Texas",
  tagline: 'Train Like a Texan. Transform Like a Champion.',
  phone: '(512) 555-0142',
  email: 'hello@gymbobstexas.com',
  address: '2428 Main St, Vernon, TX 76384',
  hours: [
    { days: 'Mon – Fri', time: '5:00 AM – 11:00 PM' },
    { days: 'Saturday', time: '7:00 AM – 8:00 PM' },
    { days: 'Sunday', time: '8:00 AM – 6:00 PM' },
  ],
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
  },
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Online Coaching', href: '#online-coaching' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Results', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: 8500, suffix: '+', label: 'Members Trained' },
  { value: new Date().getFullYear() - 1996, suffix: '', label: 'Years Open' },
  { value: 1, suffix: '', label: 'Texas Location' },
  { value: 96, suffix: '%', label: 'Member Retention' },
]

export const about = {
  eyebrow: 'Why Gym Bob’s',
  heading: 'Built By Texans, For Anyone Chasing A Stronger Life',
  body: "Gym Bob's has been training Vernon since 1996 — decades before \"hybrid\" was a buzzword. What started as a single squat rack and a promise (no fluff, just results) has grown into a full hybrid model that meets you wherever you train: walk onto our floor for hands-on coaching, or log in from anywhere in the world for the same programming, accountability, and intensity. Whichever way you show up, the standard doesn't change.",
  points: [
    'In-person + online hybrid membership, one account',
    'Certified strength & conditioning coaches on every floor',
    'Custom programming, not cookie-cutter classes',
  ],
}

export type Program = {
  id: string
  title: string
  description: string
  icon: 'dumbbell' | 'user' | 'laptop' | 'video' | 'leaf'
  image: string
}

export const programs: Program[] = [
  {
    id: 'membership',
    title: 'In-Gym Membership',
    description:
      'Full access to every Gym Bob’s floor — free weights, machines, turf, and recovery bay.',
    icon: 'dumbbell',
    image: '/media/programs/membership.jpg',
  },
  {
    id: 'personal-training',
    title: 'Personal Training',
    description: '1-on-1 coaching built around your goals, schedule, and starting point.',
    icon: 'user',
    image: '/media/programs/personal-training.jpg',
  },
  {
    id: 'online-coaching',
    title: 'Online Coaching',
    description: 'Custom programming, weekly check-ins, and form review from anywhere.',
    icon: 'laptop',
    image: '/media/programs/online-coaching.jpg',
  },
  {
    id: 'virtual-classes',
    title: 'Virtual Group Classes',
    description: 'Live-streamed strength, conditioning, and mobility classes daily.',
    icon: 'video',
    image: '/media/programs/virtual-classes.jpg',
  },
  {
    id: 'nutrition',
    title: 'Nutrition Coaching',
    description: 'Macro coaching and habit-based nutrition plans that fit real life.',
    icon: 'leaf',
    image: '/media/programs/nutrition.jpg',
  },
]

export const onlineCoaching = {
  eyebrow: 'Online Coaching Spotlight',
  heading: 'Real Coaching. Zero Commute.',
  body: `Every online member gets a custom training block inside the Gym Bob’s
  app, a coach who reviews your check-in videos, and weekly adjustments based on
  how you're actually recovering — not a generic template.`,
  steps: [
    { title: 'Onboard', description: 'Tell us your goals, equipment, and schedule.' },
    { title: 'Train', description: 'Follow your custom plan in the app, log every session.' },
    { title: 'Check In', description: 'Submit weekly video + progress check-ins.' },
    { title: 'Adjust', description: 'Your coach tweaks the plan based on real data.' },
  ],
}

export type Trainer = {
  name: string
  specialty: string
  bio: string
  photo: string
}

export const trainers: Trainer[] = [
  {
    name: 'Marcus Reyes',
    specialty: 'Strength & Powerlifting',
    bio: '10 years coaching competitive lifters and first-timers alike.',
    photo: '/media/trainers/marcus-reyes.jpg',
  },
  {
    name: 'Dana Whitfield',
    specialty: 'Online Coaching Lead',
    bio: 'Runs our remote programming team; certified in nutrition coaching.',
    photo: '/media/trainers/dana-whitfield.jpg',
  },
  {
    name: 'Ty Okafor',
    specialty: 'Conditioning & Athletics',
    bio: 'Former college athlete specializing in speed and conditioning work.',
    photo: '/media/trainers/ty-okafor.jpg',
  },
  {
    name: 'Priya Nair',
    specialty: 'Mobility & Recovery',
    bio: 'Blends physical-therapy background with strength coaching.',
    photo: '/media/trainers/priya-nair.jpg',
  },
]
// Trainer photos are curated open-source (Unsplash, free-to-use) stand-ins —
// swap in real staff photos in public/media/trainers/ whenever ready.

export type Testimonial = {
  name: string
  result: string
  quote: string
  photo: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Chris M.',
    result: 'Lost 42 lbs in 7 months',
    quote:
      'The online coaching kept me accountable even when I was traveling for work every other week.',
    photo: '/media/testimonials/chris-m.jpg',
  },
  {
    name: 'Alyssa T.',
    result: 'Added 80 lbs to her deadlift',
    quote: 'Coming from a gym with zero coaching, having someone actually check my form changed everything.',
    photo: '/media/testimonials/alyssa-t.jpg',
  },
  {
    name: 'James O.',
    result: 'First powerlifting meet at 38',
    quote: 'Never thought I’d compete. Marcus had a plan for that from week one.',
    photo: '/media/testimonials/james-o.jpg',
  },
]
// Member photos are curated open-source (Unsplash, free-to-use) stand-ins —
// swap in real member photos in public/media/testimonials/ whenever ready.

export type PricingTier = {
  id: string
  name: string
  price: number
  billing: 'mo'
  description: string
  features: string[]
  featured?: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 39,
    billing: 'mo',
    description: 'Gym floor access, no frills.',
    features: ['Full gym floor access', 'Locker room access', 'Free fitness assessment'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 89,
    billing: 'mo',
    description: 'The full in-gym experience.',
    features: [
      'Everything in Basic',
      'Unlimited group classes',
      '2 personal training sessions / mo',
      'Recovery bay access',
    ],
    featured: true,
  },
  {
    id: 'online-only',
    name: 'Online-Only',
    price: 59,
    billing: 'mo',
    description: 'Train anywhere, fully coached.',
    features: ['Custom programming app', 'Weekly coach check-ins', 'Live virtual classes'],
  },
  {
    id: 'all-access',
    name: 'All-Access',
    price: 149,
    billing: 'mo',
    description: 'Every service, fully unlocked.',
    features: [
      'Everything in Premium',
      'Online coaching included',
      'Nutrition coaching included',
      'Priority booking',
    ],
  },
]

export const faqs = [
  {
    question: 'Do I have to sign a long-term contract?',
    answer:
      'No. All memberships are month-to-month. Cancel anytime from your account with 30 days’ notice.',
  },
  {
    question: 'Can I switch between in-gym and online plans?',
    answer:
      'Yes — you can upgrade, downgrade, or switch plan types at any time; changes apply on your next billing date.',
  },
  {
    question: 'How does online coaching check-in work?',
    answer:
      'You submit a short video and a quick progress form each week through the app. Your coach reviews it and adjusts your plan within 48 hours.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes, every new member gets one free trial class or consultation — grab it from the banner on this page or the pricing section.',
  },
  {
    question: 'What’s your cancellation policy?',
    answer:
      'Cancel anytime with 30 days’ notice, no cancellation fee. Refunds for unused prepaid annual plans are prorated.',
  },
]
