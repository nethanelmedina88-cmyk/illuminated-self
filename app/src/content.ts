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

/* Words for the dawn — Rav Kook and other souls of depth */

export interface DawnQuote {
  en: string
  he?: string
  by: string
}

export const DAWN_QUOTES: DawnQuote[] = [
  {
    en: 'The old shall be renewed, and the new shall be sanctified.',
    he: 'הישן יתחדש והחדש יתקדש',
    by: 'Rav Avraham Yitzchak HaCohen Kook',
  },
  {
    en: 'The purely righteous do not complain about darkness — they add light.',
    he: 'הצדיקים הטהורים אינם קובלים על החושך, אלא מוסיפים אור',
    by: 'Rav Avraham Yitzchak HaCohen Kook',
  },
  {
    en: 'The soul is always praying.',
    he: 'הנשמה היא תמיד מתפללת',
    by: 'Rav Avraham Yitzchak HaCohen Kook',
  },
  {
    en: 'I do not speak because I have the power to speak; I speak because I do not have the power to stay silent.',
    he: 'איני מדבר מפני שיש בכוחי לדבר, אלא מפני שאין בכוחי לשתוק',
    by: 'Rav Avraham Yitzchak HaCohen Kook',
  },
  {
    en: 'Every person must know and understand: a candle burns within them, and their candle is like no other.',
    he: 'צריך שכל איש ידע ויבין, שבתוך תוכו דולק נר, ואין נרו שלו כנר חברו',
    by: 'Rav Avraham Yitzchak HaCohen Kook',
  },
  {
    en: 'The whole world is a very narrow bridge — and the essential thing is not to fear at all.',
    he: 'כל העולם כולו גשר צר מאוד, והעיקר לא לפחד כלל',
    by: 'Rebbe Nachman of Breslov',
  },
  {
    en: 'Just to be is a blessing. Just to live is holy.',
    by: 'Abraham Joshua Heschel',
  },
  {
    en: 'If I am not for myself, who will be for me? And when I am only for myself, what am I? And if not now — when?',
    he: 'אם אין אני לי, מי לי? וכשאני לעצמי, מה אני? ואם לא עכשיו, אימתי?',
    by: 'Hillel the Elder · Pirkei Avot',
  },
  {
    en: 'Who is mighty? The one who conquers his own impulse.',
    he: 'איזהו גיבור? הכובש את יצרו',
    by: 'Ben Zoma · Pirkei Avot',
  },
  {
    en: 'When we are no longer able to change a situation, we are challenged to change ourselves.',
    by: 'Viktor Frankl',
  },
  {
    en: 'When you arise in the morning, think of what a precious privilege it is to be alive — to breathe, to think, to enjoy, to love.',
    by: 'Marcus Aurelius',
  },
  {
    en: 'All journeys have secret destinations of which the traveler is unaware.',
    by: 'Martin Buber',
  },
]

/* Nutrition — the daily menu with nutritional data per component */

export interface FoodItem {
  id: string
  name: string
  detail: string
  emoji: string
  kcal: number
  protein: number
  fat: number
  carbs: number
  micros: string[]
}

export interface FoodGroup {
  title: string
  he: string
  items: FoodItem[]
}

export const PROTEIN_ROTATION: FoodItem[] = [
  {
    id: 'beef',
    name: 'Beef sirloin',
    detail: '300 g',
    emoji: '🥩',
    kcal: 530,
    protein: 78,
    fat: 24,
    carbs: 0,
    micros: ['Iron', 'Zinc', 'Vitamin B12', 'Creatine'],
  },
  {
    id: 'chicken',
    name: 'Chicken breast',
    detail: '300 g',
    emoji: '🍗',
    kcal: 495,
    protein: 93,
    fat: 11,
    carbs: 0,
    micros: ['Vitamin B6', 'Niacin', 'Selenium', 'Phosphorus'],
  },
  {
    id: 'salmon',
    name: 'Salmon fillet',
    detail: '300 g',
    emoji: '🐟',
    kcal: 600,
    protein: 61,
    fat: 38,
    carbs: 0,
    micros: ['Omega-3', 'Vitamin D', 'Vitamin B12', 'Selenium'],
  },
]

export const NUTRITION: FoodGroup[] = [
  {
    title: 'Daily protein base',
    he: 'חלבון ובסיס יומי',
    items: [
      {
        id: 'eggs',
        name: '5 XL eggs',
        detail: 'whole',
        emoji: '🥚',
        kcal: 390,
        protein: 33,
        fat: 27,
        carbs: 2,
        micros: ['Vitamin B12', 'Vitamin D', 'Vitamin A', 'Choline', 'Selenium', 'Iron'],
      },
      {
        id: 'yogurt',
        name: 'Pro yogurt cup',
        detail: '25 g protein',
        emoji: '🥛',
        kcal: 155,
        protein: 25,
        fat: 3,
        carbs: 9,
        micros: ['Calcium', 'Vitamin B12'],
      },
      {
        id: 'shake',
        name: 'Protein drink',
        detail: '25 g protein',
        emoji: '🥤',
        kcal: 140,
        protein: 25,
        fat: 2,
        carbs: 6,
        micros: ['Calcium'],
      },
    ],
  },
  {
    title: 'Carbohydrates',
    he: 'פחמימות',
    items: [
      {
        id: 'rice',
        name: 'White rice, cooked',
        detail: '300 g',
        emoji: '🍚',
        kcal: 390,
        protein: 8,
        fat: 1,
        carbs: 84,
        micros: ['Manganese', 'Folate'],
      },
      {
        id: 'apple',
        name: 'Green apple',
        detail: 'medium',
        emoji: '🍏',
        kcal: 95,
        protein: 0,
        fat: 0,
        carbs: 25,
        micros: ['Vitamin C', 'Potassium', 'Fiber'],
      },
      {
        id: 'banana',
        name: 'Banana',
        detail: 'medium',
        emoji: '🍌',
        kcal: 105,
        protein: 1,
        fat: 0,
        carbs: 27,
        micros: ['Potassium', 'Vitamin B6', 'Vitamin C'],
      },
    ],
  },
  {
    title: 'Fats & antioxidants',
    he: 'שומנים ונוגדי חמצון',
    items: [
      {
        id: 'avocado',
        name: 'Avocado',
        detail: 'half, medium',
        emoji: '🥑',
        kcal: 160,
        protein: 2,
        fat: 15,
        carbs: 9,
        micros: ['Potassium', 'Vitamin E', 'Vitamin K', 'Folate', 'Fiber'],
      },
      {
        id: 'walnuts',
        name: 'Walnuts',
        detail: '5 halves',
        emoji: '🌰',
        kcal: 130,
        protein: 3,
        fat: 13,
        carbs: 3,
        micros: ['Omega-3', 'Copper', 'Magnesium'],
      },
      {
        id: 'blueberries',
        name: 'Blueberries',
        detail: '50 g',
        emoji: '🫐',
        kcal: 29,
        protein: 0,
        fat: 0,
        carbs: 7,
        micros: ['Vitamin C', 'Vitamin K', 'Antioxidants'],
      },
    ],
  },
  {
    title: 'Vegetables & fluids',
    he: 'ירקות ונוזלים',
    items: [
      {
        id: 'broccoli',
        name: 'Broccoli',
        detail: '200 g · steamed',
        emoji: '🥦',
        kcal: 68,
        protein: 6,
        fat: 1,
        carbs: 13,
        micros: ['Vitamin C', 'Vitamin K', 'Folate', 'Fiber'],
      },
      {
        id: 'cucumber',
        name: 'Cucumber',
        detail: '1 unit',
        emoji: '🥒',
        kcal: 30,
        protein: 1,
        fat: 0,
        carbs: 7,
        micros: ['Vitamin K'],
      },
      {
        id: 'tomato',
        name: 'Tomato',
        detail: '1 unit',
        emoji: '🍅',
        kcal: 22,
        protein: 1,
        fat: 0,
        carbs: 5,
        micros: ['Vitamin C', 'Lycopene', 'Potassium'],
      },
      {
        id: 'lettuce',
        name: 'Lettuce',
        detail: 'daily portion',
        emoji: '🥬',
        kcal: 15,
        protein: 1,
        fat: 0,
        carbs: 3,
        micros: ['Vitamin K', 'Vitamin A', 'Folate'],
      },
      {
        id: 'lemon',
        name: 'Squeezed lemon',
        detail: '50 ml',
        emoji: '🍋',
        kcal: 11,
        protein: 0,
        fat: 0,
        carbs: 4,
        micros: ['Vitamin C'],
      },
      {
        id: 'water',
        name: 'Water only',
        detail: 'unlimited',
        emoji: '💧',
        kcal: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        micros: ['Hydration'],
      },
    ],
  },
]

export const VITAMINS = [
  'Vitamin A',
  'Vitamin B6',
  'Vitamin B12',
  'Vitamin C',
  'Vitamin D',
  'Vitamin E',
  'Vitamin K',
  'Folate',
  'Niacin',
  'Choline',
]

export const MINERALS = [
  'Iron',
  'Zinc',
  'Calcium',
  'Selenium',
  'Potassium',
  'Magnesium',
  'Manganese',
  'Copper',
  'Phosphorus',
]

/* Training */

export interface Session {
  time: string
  title: string
  detail: string
  icon: string
  plan: string[]
}

export interface TrainingDay {
  en: string
  he: string
  short: string
  rest?: boolean
  sessions: Session[]
}

const CORE_30 = ['Plank · 3×60s', 'Hanging knee raises · 3×12', 'Cable crunch · 3×15', 'Side plank · 2×45s']
const CORE_60 = [
  'Circuit ×4 — rest 90s between rounds:',
  'Plank · 60s',
  'Leg raises · 15',
  'Russian twists · 20',
  'Dead bug · 12',
  'Ab-wheel rollout · 10',
]
const RUN_60 = ['10 min easy warm-up', '40 min steady zone-2 pace', '10 min cool-down', 'Full-body stretch']

export const WEEK: TrainingDay[] = [
  {
    en: 'Sunday',
    he: 'ראשון',
    short: 'Sun',
    sessions: [
      { time: '06:00', title: 'Core', detail: '30 minutes of abs', icon: 'zap', plan: CORE_30 },
      {
        time: '12:00',
        title: 'Legs',
        detail: 'Quads & calves',
        icon: 'dumbbell',
        plan: [
          'Back squat · 4×8',
          'Leg press · 3×12',
          'Walking lunges · 3×20',
          'Leg extension · 3×15',
          'Standing calf raise · 4×15',
        ],
      },
    ],
  },
  {
    en: 'Monday',
    he: 'שני',
    short: 'Mon',
    sessions: [
      { time: '06:00', title: 'Run', detail: '60 minutes of endurance', icon: 'footprints', plan: RUN_60 },
      {
        time: '12:00',
        title: 'Chest',
        detail: 'Strength session',
        icon: 'dumbbell',
        plan: ['Bench press · 4×8', 'Incline dumbbell press · 3×10', 'Cable fly · 3×12', 'Dips · 3×max', 'Push-up finisher'],
      },
    ],
  },
  {
    en: 'Tuesday',
    he: 'שלישי',
    short: 'Tue',
    sessions: [
      { time: '06:00', title: 'Core', detail: '60 minutes of abs', icon: 'zap', plan: CORE_60 },
      {
        time: '12:00',
        title: 'Shoulders',
        detail: 'Strength session',
        icon: 'dumbbell',
        plan: ['Overhead press · 4×8', 'Lateral raises · 4×12', 'Rear-delt fly · 3×15', 'Front raise · 3×12', 'Shrugs · 3×12'],
      },
    ],
  },
  {
    en: 'Wednesday',
    he: 'רביעי',
    short: 'Wed',
    sessions: [
      { time: '06:00', title: 'Run', detail: '60 minutes of endurance', icon: 'footprints', plan: RUN_60 },
      {
        time: '12:00',
        title: 'Back',
        detail: 'Strength session',
        icon: 'dumbbell',
        plan: ['Pull-ups · 4×max', 'Barbell row · 4×8', 'Lat pulldown · 3×10', 'Seated cable row · 3×12', 'Face pulls · 3×15'],
      },
    ],
  },
  {
    en: 'Thursday',
    he: 'חמישי',
    short: 'Thu',
    sessions: [
      { time: '06:00', title: 'Core', detail: '30 minutes of abs', icon: 'zap', plan: CORE_30 },
      {
        time: '12:00',
        title: 'Legs',
        detail: 'Glutes & battle ropes',
        icon: 'dumbbell',
        plan: [
          'Hip thrust · 4×10',
          'Romanian deadlift · 4×8',
          'Bulgarian split squat · 3×10',
          'Leg curl · 3×12',
          'Battle ropes · 5×30s',
        ],
      },
    ],
  },
  {
    en: 'Friday',
    he: 'שישי',
    short: 'Fri',
    sessions: [
      { time: '06:00', title: 'Run', detail: '60 minutes of endurance', icon: 'footprints', plan: RUN_60 },
      {
        time: '12:00',
        title: 'Arms',
        detail: 'Strength session',
        icon: 'dumbbell',
        plan: ['Barbell curl · 4×10', 'Skull crushers · 4×10', 'Hammer curl · 3×12', 'Rope pushdown · 3×12', '21s finisher'],
      },
    ],
  },
  {
    en: 'Saturday',
    he: 'שבת',
    short: 'Sat',
    rest: true,
    sessions: [
      {
        time: 'All day',
        title: 'Rest',
        detail: 'The body has earned it too ♡',
        icon: 'sun',
        plan: ['Shabbat — full rest for body and soul'],
      },
    ],
  },
]

/* Supplements — split along the arc of the day */

export interface Supplement {
  name: string
  purpose: string
}

export const SUPPLEMENTS_MORNING: Supplement[] = [
  { name: 'K2 + D3', purpose: 'Bone & muscle health' },
  { name: 'Omega-3', purpose: 'Heart & brain health' },
  { name: 'Tongkat Ali', purpose: 'Energy & vitality' },
  { name: 'Black Maca', purpose: 'Hormonal balance' },
]

export const SUPPLEMENTS_EVENING: Supplement[] = [
  { name: 'Magnesium bisglycinate', purpose: 'Deeper sleep & relaxation' },
  { name: 'Ashwagandha', purpose: 'Less stress & anxiety' },
]

export const SUPPLEMENTS_TRAINING: Supplement[] = [
  { name: 'Zinc picolinate', purpose: 'Immune support' },
  { name: 'Creatine · 7 g', purpose: 'Performance & muscle growth' },
]

/* Faith — six practices around the circle */

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
    he: 'חברותא',
    en: 'Chavruta',
    sub: 'Learning in partnership · once a week',
    keywords: ['A partner', 'A sugya', 'Friendship'],
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

/* Vision 38 — goals, not checkboxes */

export interface Goal {
  text: string
  icon: string
}

export const VISION: Goal[] = [
  {
    text: 'I walk like a peacock down the stream, shirtless — with greater muscle mass and a chiseled core.',
    icon: 'dumbbell',
  },
  {
    text: 'I have created and built a partnership in which we are happy together, with a future that is beautiful and warm.',
    icon: 'heart',
  },
  {
    text: 'I have received letters, gifts and heartfelt thanks from my students — for being a principled, meaningful and professional teacher who led them to success, to values, and by personal example.',
    icon: 'graduation-cap',
  },
  {
    text: 'I have successfully launched MediLab — science, short and to the point.',
    icon: 'flask',
  },
  {
    text: 'I live with a calm and a clarity that recall the pure days after the first lockdown.',
    icon: 'waves',
  },
  {
    text: 'I have finished writing “A Brief History of Humankind and Israel.”',
    icon: 'book-open',
  },
  {
    text: 'I have established a morning routine that begins at 05:30.',
    icon: 'sunrise',
  },
  {
    text: 'I keep to proper nutrition, following the scientific menu I built.',
    icon: 'salad',
  },
  {
    text: 'I have stopped watching pornography.',
    icon: 'shield-check',
  },
  {
    text: 'I have stepped out of the media — and out of the hypnosis of the social networks.',
    icon: 'phone-off',
  },
]

/* More projects — links in the rail */

export interface Project {
  he: string
  en: string
  url: string
  icon: string
}

export const PROJECTS: Project[] = [
  {
    he: 'האני המואר',
    en: 'Daily affirmations',
    url: 'https://nethanelmedina88-cmyk.github.io/haani-hamuar/',
    icon: 'sparkles',
  },
  {
    he: 'MediLab מעקב',
    en: 'Training tracker',
    url: 'https://nethanelmedina88-cmyk.github.io/coach-medina/',
    icon: 'activity',
  },
  {
    he: 'MediLab חדר בקרה',
    en: 'Launch mission control',
    url: 'https://nethanelmedina88-cmyk.github.io/medilab-mission-control/',
    icon: 'table',
  },
]

/* Navigation — the arc of the day */

export const NAV = [
  { id: 'values', num: 'I', label: 'The Ground', he: 'הקרקע', time: 'Always', mark: 'mountain' },
  { id: 'dawn', num: 'II', label: 'Dawn', he: 'שחר', time: '05:30', mark: 'sunrise' },
  { id: 'morning', num: 'III', label: 'Morning', he: 'בוקר', time: '06:00–09:00', mark: 'sun' },
  { id: 'noon', num: 'IV', label: 'Noon', he: 'צהריים', time: '12:00', mark: 'sun' },
  { id: 'afternoon', num: 'V', label: 'Afternoon', he: 'אחר הצהריים', time: '16:00', mark: 'cloud-sun' },
  { id: 'evening', num: 'VI', label: 'Evening', he: 'ערב', time: '19:00', mark: 'sunset' },
  { id: 'night', num: 'VII', label: 'Night', he: 'לילה', time: '22:00', mark: 'moon-star' },
]
