// All content translated from the source documents & infographics.

export interface Quote {
  text: string
  by: string
}

export interface Value {
  he: string
  en: string
  essence: string
  body: string
  quotes: Quote[]
  icon: string
}

export const VALUES: Value[] = [
  {
    he: 'חמלה',
    en: 'Compassion',
    essence: 'The benefit of the doubt — for myself and for others.',
    body:
      'I give myself and others the benefit of the doubt. I recognize how fragile the human mind is, and I understand that people — myself included — suffer and cause suffering out of ignorance. I accept the humanity in me and in others, and I am free to be human.',
    quotes: [
      { text: 'Compassion for others begins with kindness to ourselves.', by: 'Pema Chödrön' },
    ],
    icon: 'heart-handshake',
  },
  {
    he: 'אומץ',
    en: 'Courage',
    essence: 'I dare to be who I truly want to be.',
    body:
      'I dare to think differently, speak differently, and act differently — I dare to be who I truly want to be. I welcome the price of judgment, criticism and rejection, and I part in peace from the ignorance of the herd. I face my problems with a straight back and a level gaze, and I will never again live in retreat.',
    quotes: [
      {
        text: "You can't swim for new horizons until you have courage to lose sight of the shore.",
        by: 'William Faulkner',
      },
    ],
    icon: 'flame',
  },
  {
    he: 'כנות',
    en: 'Honesty',
    essence: 'My truth, spoken plainly — no varnish, no disguise.',
    body: 'I know myself, and I express the truth that is in me plainly — no varnish, no disguise.',
    quotes: [{ text: "If you tell the truth, you don't have to remember anything.", by: 'Mark Twain' }],
    icon: 'scale',
  },
  {
    he: 'ענווה',
    en: 'Humility',
    essence: 'Sure of my worth, free of the hunger for glory.',
    body:
      'I know my worth and recognize my abilities — and in equal measure I know my flaws, and honor the worth and talents of others. I stand above no one, and I ask the world for no fame or honor. I aim only to do what is right and worthy, by the values of the Illuminated Self.',
    quotes: [
      { text: "Humility is not thinking less of yourself, it's thinking of yourself less.", by: 'C.S. Lewis' },
      { text: 'Pride makes us artificial and humility makes us real.', by: 'Thomas Merton' },
    ],
    icon: 'feather',
  },
  {
    he: 'קבלה',
    en: 'Acceptance',
    essence: 'Wu wei · 無為 — non-forcing. I move with life, not against it.',
    body:
      'I release the illusion of control. I allow life to unfold at its own gentle rhythm, and I magnetize opportunities for action toward me — in the right place, at the right time.',
    quotes: [
      {
        text: 'The only way to make sense of change is to plunge into it, move with it, and join the dance.',
        by: 'Alan Watts',
      },
    ],
    icon: 'waves',
  },
  {
    he: 'אחריות',
    en: 'Accountability',
    essence: 'I choose my fate. All the responsibility — and all the power — is mine.',
    body:
      'I choose my destiny. All of the responsibility is mine, and all of the power rests in my hands.',
    quotes: [
      {
        text:
          "The confidence I built didn't come from a perfect family or God-given talent. It came from personal accountability, which brought me self-respect — and self-respect will always light a way forward.",
        by: 'David Goggins',
      },
    ],
    icon: 'compass',
  },
  {
    he: 'הומור',
    en: 'Humor',
    essence: 'Life is not that serious.',
    body:
      'I laugh hard and often through the day — laughter that carries a liberating truth, not a rehearsed joke. Life is not that serious, and I love to play and simply live in good spirits.',
    quotes: [
      { text: 'People rarely succeed unless they have fun in what they are doing.', by: 'Dale Carnegie' },
    ],
    icon: 'smile',
  },
  {
    he: 'חריצות',
    en: 'Diligence',
    essence: 'Steady, earnest, energetic effort.',
    body:
      'Steady, earnest, energetic effort; devoted, meticulous work, and full engagement in the doing.',
    quotes: [
      {
        text: "The depth of a person's involvement in a deed is the depth of that deed's meaning in their eyes.",
        by: 'Yigal Allon',
      },
    ],
    icon: 'hammer',
  },
  {
    he: 'חסד',
    en: 'Kindness',
    essence: 'A life of giving, with nothing asked in return.',
    body:
      'I carry gratitude for what God has given me as a gift, and for how much others have done for me. I am glad to live in a posture of giving at every opportunity, and I cherish the privilege of giving with nothing asked in return. I am happiest being the one who brings good to my friends and multiplies good in the world.',
    quotes: [{ text: 'A life of blessing is led by kindness.', by: 'Proverb' }],
    icon: 'gift',
  },
]

export interface Pillar {
  he: string
  en: string
  sub: string
  points: string[]
  icon: string
}

export const MORNING: Pillar[] = [
  {
    he: 'שחרית',
    en: 'Shacharit',
    sub: 'Consciousness & faith',
    points: ['Positive thinking', 'Personal affirmations', 'Focus'],
    icon: 'sunrise',
  },
  {
    he: 'מדיטציה',
    en: 'Meditation',
    sub: 'An inner moment',
    points: ['Deep breathing', 'Quieting the thoughts', 'Calm'],
    icon: 'wind',
  },
  {
    he: 'קריאה והשראה',
    en: 'Reading & Inspiration',
    sub: 'Empowerment, wider horizons',
    points: ['Enriching study', 'Deep understanding', 'Inner inspiration'],
    icon: 'book-open',
  },
  {
    he: 'הודיה וחיבה',
    en: 'Gratitude & Affection',
    sub: 'Connection, a sense of belonging',
    points: ['Counting blessings', 'Connecting with nature', 'Self-love'],
    icon: 'heart',
  },
]

export interface FoodItem {
  name: string
  detail: string
}

export interface FoodGroup {
  title: string
  he: string
  icon: string
  note?: string
  items: FoodItem[]
}

export const PROTEIN_ROTATION = [
  { name: 'Beef sirloin', detail: '300 g', icon: 'beef' },
  { name: 'Chicken breast', detail: '300 g', icon: 'drumstick' },
  { name: 'Salmon fillet', detail: '300 g', icon: 'fish' },
]

export const NUTRITION: FoodGroup[] = [
  {
    title: 'Daily protein base',
    he: 'חלבון ובסיס יומי',
    icon: 'egg',
    items: [
      { name: '5 XL eggs', detail: 'whole eggs' },
      { name: 'Pro yogurt cup', detail: '25 g protein' },
      { name: 'Protein drink bottle', detail: '25 g protein' },
    ],
  },
  {
    title: 'Carbohydrates',
    he: 'פחמימות',
    icon: 'wheat',
    items: [
      { name: 'Cooked white rice', detail: '300 g' },
      { name: 'Green apple', detail: 'medium' },
      { name: 'Banana', detail: 'medium' },
    ],
  },
  {
    title: 'Fats & antioxidants',
    he: 'שומנים ונוגדי חמצון',
    icon: 'sprout',
    items: [
      { name: 'Avocado', detail: 'half, medium' },
      { name: 'Walnuts', detail: '5 halves' },
      { name: 'Blueberries', detail: '50 g' },
    ],
  },
  {
    title: 'Vegetables & fluids',
    he: 'ירקות ונוזלים',
    icon: 'carrot',
    items: [
      { name: 'Broccoli', detail: '200 g · steamed' },
      { name: 'Cucumber', detail: '1 unit' },
      { name: 'Tomato', detail: '1 unit' },
      { name: 'Lettuce', detail: 'daily portion' },
      { name: 'Squeezed lemon', detail: '50 ml · dressing or drink' },
      { name: 'Water only', detail: 'unlimited' },
    ],
  },
]

export interface Session {
  time: string
  title: string
  detail: string
  icon: string
}

export interface TrainingDay {
  en: string
  he: string
  short: string
  rest?: boolean
  sessions: Session[]
}

export const WEEK: TrainingDay[] = [
  {
    en: 'Sunday',
    he: 'ראשון',
    short: 'Sun',
    sessions: [
      { time: '06:00', title: 'Core', detail: '30 minutes of abs', icon: 'zap' },
      { time: '12:00', title: 'Legs', detail: 'Quads & calves', icon: 'dumbbell' },
    ],
  },
  {
    en: 'Monday',
    he: 'שני',
    short: 'Mon',
    sessions: [
      { time: '06:00', title: 'Run', detail: '60 minutes of endurance', icon: 'footprints' },
      { time: '12:00', title: 'Chest', detail: 'Strength session', icon: 'dumbbell' },
    ],
  },
  {
    en: 'Tuesday',
    he: 'שלישי',
    short: 'Tue',
    sessions: [
      { time: '06:00', title: 'Core', detail: '60 minutes of abs', icon: 'zap' },
      { time: '12:00', title: 'Shoulders', detail: 'Strength session', icon: 'dumbbell' },
    ],
  },
  {
    en: 'Wednesday',
    he: 'רביעי',
    short: 'Wed',
    sessions: [
      { time: '06:00', title: 'Run', detail: '60 minutes of endurance', icon: 'footprints' },
      { time: '12:00', title: 'Back', detail: 'Strength session', icon: 'dumbbell' },
    ],
  },
  {
    en: 'Thursday',
    he: 'חמישי',
    short: 'Thu',
    sessions: [
      { time: '06:00', title: 'Core', detail: '30 minutes of abs', icon: 'zap' },
      { time: '12:00', title: 'Legs', detail: 'Glutes & hamstrings', icon: 'dumbbell' },
    ],
  },
  {
    en: 'Friday',
    he: 'שישי',
    short: 'Fri',
    sessions: [
      { time: '06:00', title: 'Run', detail: '60 minutes of endurance', icon: 'footprints' },
      { time: '12:00', title: 'Arms', detail: 'Strength session', icon: 'dumbbell' },
    ],
  },
  {
    en: 'Saturday',
    he: 'שבת',
    short: 'Sat',
    rest: true,
    sessions: [{ time: 'All day', title: 'Rest', detail: 'The body has earned it too ♡', icon: 'sun' }],
  },
]

export interface Supplement {
  name: string
  purpose: string
}

export interface SupplementGroup {
  title: string
  when: string
  icon: string
  items: Supplement[]
}

export const SUPPLEMENTS: SupplementGroup[] = [
  {
    title: 'Morning',
    when: 'With a meal that contains fat',
    icon: 'sunrise',
    items: [
      { name: 'K2 + D3', purpose: 'Bone & muscle health' },
      { name: 'Omega-3', purpose: 'Heart & brain health' },
      { name: 'Tongkat Ali', purpose: 'Energy & vitality' },
      { name: 'Black Maca', purpose: 'Hormonal balance' },
    ],
  },
  {
    title: 'Evening',
    when: 'Before sleep',
    icon: 'moon',
    items: [
      { name: 'Magnesium bisglycinate', purpose: 'Deeper sleep & relaxation' },
      { name: 'Ashwagandha', purpose: 'Less stress & anxiety' },
    ],
  },
  {
    title: 'Flexible',
    when: 'Any time · after training',
    icon: 'dumbbell',
    items: [
      { name: 'Zinc picolinate', purpose: 'Immune support' },
      { name: 'Creatine · 7 g', purpose: 'Performance & muscle growth' },
    ],
  },
]

export interface Practice {
  he: string
  en: string
  sub: string
  keywords: string[]
}

export const FAITH: Practice[] = [
  {
    he: 'תפילין',
    en: 'Tefillin',
    sub: 'A personal bond',
    keywords: ['Morning prayer', 'Binding', 'Intention'],
  },
  {
    he: 'פרשת שבוע',
    en: 'Weekly Torah portion',
    sub: 'Study & depth',
    keywords: ['Inquiry', 'Meaning', 'Symbol'],
  },
  {
    he: 'ברכת המזון',
    en: 'Grace after meals',
    sub: 'Gratitude & thanksgiving',
    keywords: ['Abundance', 'Nourishment', 'Kavanah'],
  },
  {
    he: 'נרות שבת',
    en: 'Shabbat candles',
    sub: 'A symbol of peace at home',
    keywords: ['Lighting', 'Light', 'Atmosphere'],
  },
  {
    he: 'בית כנסת בשבת',
    en: 'Synagogue on Shabbat',
    sub: 'Communal connection',
    keywords: ['Prayer', 'Torah reading', 'Together'],
  },
]

export const INSIGHTS: string[] = [
  'A salary is the drug your employer gives you so you forget your dreams.',
  'If you keep waiting for the right moment, you will keep waiting — and your life will be over faster than you expect.',
  'Even when you deeply trust the people closest to you, keep your cards to yourself.',
  'You lose a lot of friends when you start improving your life.',
  'You will be far happier once you forgive your parents and stop blaming them for your problems.',
  'You become far more mature when you train yourself to take nothing personally.',
  'The hardest task in life is to stay focused on what truly matters to you — and the easiest escape from that difficulty is to complain.',
  'From age 30, your focus should be on earning money, building your body, and building a family.',
  'People stay in toxic relationships because they are afraid of being alone.',
]

export const VISION: string[] = [
  'I walk like a peacock down the stream, shirtless — with greater muscle mass and a chiseled core.',
  'I have created and built a partnership in which we are happy together, with a future that is beautiful and warm.',
  'I have received letters, gifts and heartfelt thanks from my students — for being a principled, meaningful and professional teacher who led them to success, to values, and by personal example.',
  'I have successfully launched MediLab — science, short and to the point.',
  'I live with a calm and a clarity that recall the pure days after the first lockdown.',
  'I have finished writing “A Brief History of Humankind and Israel.”',
  'I have established a morning routine that begins at 05:30.',
  'I keep to proper nutrition, following the scientific menu I built.',
  'I have stopped watching pornography.',
  'I have stepped out of the media — and out of the hypnosis of the social networks.',
]

export const NAV = [
  { id: 'values', num: 'I', label: 'The Nine Values', scale: 'The ground' },
  { id: 'morning', num: 'II', label: 'Morning Ritual', scale: 'The day' },
  { id: 'nutrition', num: 'III', label: 'Daily Fuel', scale: 'The day' },
  { id: 'supplements', num: 'IV', label: 'Supplements', scale: 'The day' },
  { id: 'training', num: 'V', label: 'The Training Week', scale: 'The week' },
  { id: 'faith', num: 'VI', label: 'Faith & Jewish Life', scale: 'The week' },
  { id: 'insights', num: 'VII', label: 'Nine Insights', scale: 'The mind' },
  { id: 'vision', num: 'VIII', label: 'Vision 38', scale: 'The life' },
]
