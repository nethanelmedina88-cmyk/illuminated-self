import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CloudSun,
  Compass,
  Dumbbell,
  Feather,
  Flame,
  FlaskConical,
  Footprints,
  Gift,
  GraduationCap,
  Hammer,
  Heart,
  HeartHandshake,
  Moon,
  MoonStar,
  Mountain,
  PhoneOff,
  Quote,
  Salad,
  Scale,
  ShieldCheck,
  Smile,
  Sun,
  Sunrise,
  Sunset,
  Waves,
  Wind,
  Zap,
} from 'lucide-react'
import {
  DAWN_QUOTES,
  FAITH,
  INSIGHTS,
  MINERALS,
  MORNING,
  NAV,
  NUTRITION,
  PROTEIN_ROTATION,
  SUPPLEMENTS_EVENING,
  SUPPLEMENTS_MORNING,
  SUPPLEMENTS_TRAINING,
  VALUES,
  VISION,
  VITAMINS,
  WEEK as WEEKDATA,
  type FoodItem,
  type Supplement,
} from './content'

const ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  'heart-handshake': HeartHandshake,
  flame: Flame,
  scale: Scale,
  feather: Feather,
  waves: Waves,
  compass: Compass,
  smile: Smile,
  hammer: Hammer,
  gift: Gift,
  sunrise: Sunrise,
  wind: Wind,
  'book-open': BookOpen,
  heart: Heart,
  zap: Zap,
  dumbbell: Dumbbell,
  footprints: Footprints,
  sun: Sun,
  moon: Moon,
  mountain: Mountain,
  'cloud-sun': CloudSun,
  sunset: Sunset,
  'moon-star': MoonStar,
  'graduation-cap': GraduationCap,
  flask: FlaskConical,
  salad: Salad,
  'shield-check': ShieldCheck,
  'phone-off': PhoneOff,
}

function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const C = ICONS[name] ?? Sun
  return <C size={size} strokeWidth={1.75} className={className} />
}

/* ---------- small hooks & helpers ---------- */

function usePersistedState<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw != null) return JSON.parse(raw) as T
    } catch {
      /* storage unavailable — in-memory only */
    }
    return initial
  })
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
    },
    [key],
  )
  return [state, set]
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-25% 0px -60% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function useCountdownTo0530() {
  const calc = () => {
    const now = new Date()
    const target = new Date(now)
    target.setHours(5, 30, 0, 0)
    if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1)
    return Math.floor((target.getTime() - now.getTime()) / 1000)
  }
  const [left, setLeft] = useState(calc)
  useEffect(() => {
    const t = window.setInterval(() => setLeft(calc()), 1000)
    return () => window.clearInterval(t)
  }, [])
  const h = Math.floor(left / 3600)
  const m = Math.floor((left % 3600) / 60)
  const s = left % 60
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function todayKey() {
  return dateKey(new Date())
}

function weekDates() {
  const now = new Date()
  const sunday = new Date(now)
  sunday.setDate(now.getDate() - now.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday)
    d.setDate(sunday.getDate() + i)
    return d
  })
}

function dayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86400000)
}

function longDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
}

/* ---------- chrome ---------- */

function ThemeToggle() {
  const [mode, setMode] = useState<'light' | 'dark' | null>(() => {
    try {
      const raw = window.localStorage.getItem('theme')
      return raw === 'light' || raw === 'dark' ? raw : null
    } catch {
      return null
    }
  })
  useEffect(() => {
    const root = document.documentElement
    if (mode) {
      root.setAttribute('data-theme', mode)
      try {
        window.localStorage.setItem('theme', mode)
      } catch {
        /* ignore */
      }
    } else {
      root.removeAttribute('data-theme')
    }
  }, [mode])
  const effective =
    mode ?? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const next = effective === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setMode(next)}
      aria-label={next === 'dark' ? 'Switch to night light' : 'Switch to daylight'}
      title={next === 'dark' ? 'Night light · תאורת לילה' : 'Daylight · תאורת יום'}
    >
      {next === 'dark' ? <Moon size={19} strokeWidth={1.75} /> : <Sun size={19} strokeWidth={1.75} />}
    </button>
  )
}

function Rail({ active }: { active: string }) {
  return (
    <nav className="rail" aria-label="Parts of the day">
      <a className="rail-brand" href="#top">
        <SunMark size={22} />
        <span>The Illuminated Self</span>
      </a>
      <ul>
        {NAV.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={active === item.id ? 'is-active' : ''}>
              <span className="rail-num">{item.num}</span>
              <span className="rail-label">
                {item.label}
                <span className="rail-he" lang="he" dir="rtl">
                  {item.he}
                </span>
              </span>
              <span className="rail-time num">{item.time}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="rail-foot" lang="he" dir="rtl">
        האני המואר
      </div>
    </nav>
  )
}

function ChipBar({ active }: { active: string }) {
  return (
    <nav className="chipbar" aria-label="Parts of the day">
      {NAV.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'is-active' : ''}>
          <span className="rail-num">{item.num}</span> {item.label}
        </a>
      ))}
    </nav>
  )
}

function SunMark({ size = 28 }: { size?: number }) {
  return (
    <svg className="sunmark" width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="5.2" fill="currentColor" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        const x1 = 14 + Math.cos(a) * 8.2
        const y1 = 14 + Math.sin(a) * 8.2
        const x2 = 14 + Math.cos(a) * 11.6
        const y2 = 14 + Math.sin(a) * 11.6
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

function Chapter({
  id,
  title,
  he,
  lede,
  children,
  tone,
}: {
  id: string
  title: string
  he: string
  lede?: string
  children: React.ReactNode
  tone?: 'ink' | 'night'
}) {
  const nav = NAV.find((n) => n.id === id)
  return (
    <section id={id} className={`chapter ${tone ? `tone-${tone}` : ''}`}>
      <div className="daymark" aria-hidden="true">
        <span className="daymark-line" />
        <span className="daymark-icon">
          <Icon name={nav?.mark ?? 'sun'} size={19} />
        </span>
        <span className="daymark-time num">{nav?.time}</span>
        <span className="daymark-line" />
      </div>
      <div className="chapter-inner">
        <header className="chapter-head reveal">
          <p className="eyebrow">
            <span className="eyebrow-num">{nav?.num}</span> {nav?.label}
          </p>
          <h2>
            {title}
            <span className="chapter-he" lang="he" dir="rtl">
              {he}
            </span>
          </h2>
          {lede && <p className="lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

function Block({
  title,
  he,
  children,
  className,
}: {
  title: string
  he?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`block ${className ?? ''}`}>
      <div className="block-head reveal">
        <h3>{title}</h3>
        {he && (
          <span lang="he" dir="rtl">
            {he}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-sky" aria-hidden="true">
        <div className="hero-stars" />
        <div className="hero-glow" />
        <div className="hero-horizon" />
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow reveal">
          A personal charter · <span lang="he">מגילת האני</span>
        </p>
        <h1 className="reveal">
          The Illuminated
          <br />
          Self
        </h1>
        <p className="hero-he reveal" lang="he" dir="rtl">
          האני המואר
        </p>
        <p className="hero-lede reveal">
          One day, lived deliberately — from the first light at 05:30 to the last thought before sleep. Nine
          values beneath it, a faithful heart within it, and a horizon called thirty-eight ahead of it.
        </p>
        <dl className="hero-stats reveal">
          <div>
            <dt>Values</dt>
            <dd>9</dd>
          </div>
          <div>
            <dt>Wake</dt>
            <dd>05:30</dd>
          </div>
          <div>
            <dt>Training days</dt>
            <dd>6</dd>
          </div>
          <div>
            <dt>Faith practices</dt>
            <dd>6</dd>
          </div>
          <div>
            <dt>Goals for 38</dt>
            <dd>10</dd>
          </div>
        </dl>
      </div>
      <a className="hero-cue" href="#values" aria-label="Begin the day">
        <ChevronDown size={22} strokeWidth={1.5} />
      </a>
    </header>
  )
}

/* ---------- I · the ground / values ---------- */

function Values() {
  return (
    <div className="values-grid">
      {VALUES.map((v) => (
        <article key={v.en} className="value-card reveal">
          <header>
            <span className="value-icon">
              <Icon name={v.icon} size={20} />
            </span>
            <div className="value-names">
              <span className="value-en">{v.en}</span>
              <span className="value-essence">{v.essence}</span>
            </div>
            <span className="value-he" lang="he" dir="rtl">
              {v.he}
            </span>
          </header>
          <p className="value-body-text">{v.body}</p>
          {v.quotes.map((q) => (
            <blockquote key={q.by + q.text.slice(0, 12)}>
              <p>“{q.text}”</p>
              <cite>{q.by}</cite>
            </blockquote>
          ))}
        </article>
      ))}
    </div>
  )
}

/* ---------- II · dawn ---------- */

function DawnRitual() {
  const countdown = useCountdownTo0530()
  return (
    <div className="morning">
      <aside className="morning-side reveal">
        <div className="clock-card">
          <p className="clock-label">Next dawn in</p>
          <p className="clock-time num">{countdown}</p>
          <p className="clock-sub">Every morning · 05:30</p>
        </div>
        <div className="breath reveal" aria-hidden="true">
          <div className="breath-ring" />
          <p className="breath-word">breathe</p>
        </div>
        <p className="breath-note">Four counts in · four counts out. Nothing to achieve here.</p>
      </aside>
      <div className="pillars-wrap">
        <p className="being-note reveal">
          These are not tasks to check off. They are four ways of <em>being</em> — states to enter, dwell in,
          and carry into the day.
        </p>
        <ol className="pillars">
          {MORNING.map((p) => (
            <li key={p.en} className="pillar reveal">
              <div className="pillar-main">
                <div className="pillar-top">
                  <Icon name={p.icon} size={18} className="pillar-icon" />
                  <h3>
                    {p.en}
                    <span lang="he" dir="rtl">
                      {p.he}
                    </span>
                  </h3>
                </div>
                <p className="pillar-sub">{p.sub}</p>
                <ul>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function DawnWords() {
  const n = DAWN_QUOTES.length
  const [i, setI] = useState(() => dayOfYear() % n)
  const q = DAWN_QUOTES[i]
  return (
    <div className="dawn-words reveal">
      <div className="dawn-quote">
        <Quote size={20} className="dawn-quote-mark" aria-hidden="true" />
        <div className="dawn-quote-body" key={i}>
          {q.he && (
            <p className="dawn-quote-he" lang="he" dir="rtl">
              {q.he}
            </p>
          )}
          <p className="dawn-quote-en">{q.en}</p>
          <p className="dawn-quote-by">{q.by}</p>
        </div>
      </div>
      <div className="deck-nav">
        <button type="button" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous words">
          <ArrowLeft size={18} strokeWidth={1.75} />
        </button>
        <p className="dawn-count num">
          Word {pad(i + 1)} <span>/ {pad(n)}</span> — today’s falls by the date
        </p>
        <button type="button" onClick={() => setI((i + 1) % n)} aria-label="Next words">
          <ArrowRight size={18} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  )
}

/* ---------- shared: supplements & sessions ---------- */

function SuppList({ items }: { items: Supplement[] }) {
  return (
    <ul className="supp-list">
      {items.map((s) => (
        <li key={s.name} className="reveal">
          <strong>{s.name}</strong>
          <span>{s.purpose}</span>
        </li>
      ))}
    </ul>
  )
}

function SessionCard({
  time,
  title,
  detail,
  icon,
  plan,
  done,
  onToggle,
  variant,
  isToday,
}: {
  time: string
  title: string
  detail: string
  icon: string
  plan: string[]
  done?: boolean
  onToggle?: () => void
  variant: 'dawn' | 'noon'
  isToday?: boolean
}) {
  return (
    <div className={`session session-${variant} ${isToday ? 'is-today' : ''}`}>
      <div className="session-head">
        <p className="session-time num">{time}</p>
        {onToggle && (
          <button
            type="button"
            className={`session-done ${done ? 'is-done' : ''}`}
            aria-pressed={done}
            onClick={onToggle}
            title={done ? 'Completed — click to undo' : 'Mark completed'}
          >
            <Check size={13} strokeWidth={2.5} />
            <span>{done ? 'Done' : 'Mark'}</span>
          </button>
        )}
      </div>
      <div className="session-body">
        <Icon name={icon} size={20} className="session-icon" />
        <div>
          <p className="session-title">{title}</p>
          <p className="session-detail">{detail}</p>
        </div>
      </div>
      <ul className="session-plan">
        {plan.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- III · morning ---------- */

function MorningPart({
  done,
  toggle,
}: {
  done: string[]
  toggle: (id: string) => void
}) {
  const t = new Date().getDay()
  const day = WEEKDATA[t]
  const s = day.sessions[0]
  const id = `${t}-0`
  return (
    <>
      <Block title="First training of the day" he="אימון בוקר">
        <div className="today-session reveal">
          {day.rest ? (
            <div className="rest-card">
              <Sun size={22} strokeWidth={1.5} />
              <p>
                Shabbat — no training today. <span lang="he">גם לגוף מגיע ♡</span>
              </p>
            </div>
          ) : (
            <SessionCard
              time={s.time}
              title={s.title}
              detail={s.detail}
              icon={s.icon}
              plan={s.plan}
              variant="dawn"
              isToday
              done={done.includes(id)}
              onToggle={() => toggle(id)}
            />
          )}
        </div>
      </Block>
      <Block title="With breakfast — a meal that contains fat" he="תוספי בוקר">
        <SuppList items={SUPPLEMENTS_MORNING} />
      </Block>
    </>
  )
}

/* ---------- IV · noon: training ---------- */

function Training({ done, toggle }: { done: string[]; toggle: (id: string) => void }) {
  const today = new Date().getDay()
  const [sel, setSel] = useState(today)
  const day = WEEKDATA[sel]
  const dates = weekDates()
  const totalSessions = WEEKDATA.reduce((acc, d) => acc + (d.rest ? 0 : d.sessions.length), 0)
  const doneCount = done.filter((id) => {
    const dIdx = Number(id.split('-')[0])
    return !WEEKDATA[dIdx]?.rest
  }).length
  return (
    <div className="training">
      <div className="train-meter reveal">
        <div className="train-meter-text">
          <p className="card-kicker">This week</p>
          <p>
            <strong className="num">
              {doneCount} / {totalSessions}
            </strong>{' '}
            sessions completed
          </p>
        </div>
        <div className="bar">
          <div className="bar-fill" style={{ width: `${(doneCount / totalSessions) * 100}%` }} />
        </div>
        <p className="train-motto">
          Strength · Endurance · Balance. <em>Commit. Persist. Succeed.</em>
        </p>
      </div>
      <div className="day-chips reveal" role="tablist" aria-label="Training days">
        {WEEKDATA.map((d, i) => (
          <button
            key={d.en}
            role="tab"
            aria-selected={sel === i}
            className={`${sel === i ? 'is-active' : ''} ${d.rest ? 'is-rest' : ''} ${i === today ? 'is-today' : ''}`}
            onClick={() => setSel(i)}
          >
            <span className="chip-date num">{dates[i].getDate()}</span>
            <span className="chip-day">{d.short}</span>
            <span className="chip-he" lang="he">
              {d.he}
            </span>
          </button>
        ))}
      </div>
      <div className={`day-panel reveal ${day.rest ? 'is-rest' : ''}`}>
        <h3>
          {day.en} · <span className="num day-date">{longDate(dates[sel])}</span>
          {sel === today && <span className="chip-today">today</span>}
          <span lang="he" dir="rtl">
            יום {day.he}
          </span>
        </h3>
        <div className="sessions">
          {day.sessions.map((s, si) => {
            const id = `${sel}-${si}`
            return (
              <SessionCard
                key={id}
                time={s.time}
                title={s.title}
                detail={s.detail}
                icon={s.icon}
                plan={s.plan}
                variant={si === 0 ? 'dawn' : 'noon'}
                done={done.includes(id)}
                onToggle={day.rest ? undefined : () => toggle(id)}
              />
            )
          })}
        </div>
        {day.rest && <p className="rest-note">Shabbat — full rest for body and soul.</p>}
      </div>
      <div className="after-training reveal">
        <p className="card-kicker">After training · flexible</p>
        <div className="after-chips">
          {SUPPLEMENTS_TRAINING.map((s) => (
            <span key={s.name} className="after-chip">
              <strong>{s.name}</strong> — {s.purpose}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- IV · noon: fuel / menu builder ---------- */

function macroPct(eaten: number, plan: number) {
  if (plan <= 0) return 0
  return Math.round((eaten / plan) * 100)
}

function Fuel() {
  const [eaten, setEaten] = usePersistedState<string[]>(`eaten-${todayKey()}`, [])
  const [cutId, setCutId] = usePersistedState<string>(`cut-${todayKey()}`, PROTEIN_ROTATION[dayOfYear() % 3].id)
  const cut = PROTEIN_ROTATION.find((p) => p.id === cutId) ?? PROTEIN_ROTATION[0]

  const toggleItem = (id: string) => {
    setEaten((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const planItems: FoodItem[] = useMemo(
    () => [cut, ...NUTRITION.flatMap((g) => g.items)],
    [cut],
  )
  const eatenItems = planItems.filter((it) => eaten.includes(it.id))
  const sum = (items: FoodItem[], k: 'kcal' | 'protein' | 'fat' | 'carbs') =>
    items.reduce((a, it) => a + it[k], 0)
  const plan = {
    kcal: sum(planItems, 'kcal'),
    protein: sum(planItems, 'protein'),
    fat: sum(planItems, 'fat'),
    carbs: sum(planItems, 'carbs'),
  }
  const got = {
    kcal: sum(eatenItems, 'kcal'),
    protein: sum(eatenItems, 'protein'),
    fat: sum(eatenItems, 'fat'),
    carbs: sum(eatenItems, 'carbs'),
  }
  const planMicros = new Set(planItems.flatMap((it) => it.micros))
  const gotMicros = new Set(eatenItems.flatMap((it) => it.micros))
  const vitamins = VITAMINS.filter((v) => planMicros.has(v))
  const minerals = MINERALS.filter((m) => planMicros.has(m))
  const vitPct = vitamins.length ? Math.round((vitamins.filter((v) => gotMicros.has(v)).length / vitamins.length) * 100) : 0
  const minPct = minerals.length ? Math.round((minerals.filter((m) => gotMicros.has(m)).length / minerals.length) * 100) : 0
  const overall = macroPct(got.kcal, plan.kcal)

  const bars = [
    { label: 'Protein', he: 'חלבון', got: got.protein, plan: plan.protein, unit: 'g' },
    { label: 'Essential fats', he: 'שומנים', got: got.fat, plan: plan.fat, unit: 'g' },
    { label: 'Carbohydrates', he: 'פחמימות', got: got.carbs, plan: plan.carbs, unit: 'g' },
    { label: 'Calories', he: 'קלוריות', got: got.kcal, plan: plan.kcal, unit: 'kcal' },
  ]

  return (
    <div className="fuel">
      <p className="fuel-note reveal">
        Tap what you have eaten today — the plate fills, and the day’s nutrition adds itself up below.
      </p>
      <div className="protein-card reveal">
        <div className="protein-head">
          <p className="card-kicker">Main protein · rotates daily</p>
          <button
            type="button"
            className={`eat-toggle ${eaten.includes(cut.id) ? 'is-eaten' : ''}`}
            onClick={() => toggleItem(cut.id)}
          >
            <Check size={13} strokeWidth={2.5} /> {eaten.includes(cut.id) ? 'Eaten' : 'I ate it'}
          </button>
        </div>
        <div className="protein-options" role="group" aria-label="Protein rotation">
          {PROTEIN_ROTATION.map((p) => (
            <button
              key={p.id}
              type="button"
              className={p.id === cut.id ? 'is-active' : ''}
              onClick={() => setCutId(p.id)}
            >
              <span className="food-emoji" aria-hidden="true">
                {p.emoji}
              </span>
              <span>{p.name}</span>
              <span className="num">{p.detail}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="food-grid">
        {NUTRITION.map((g) => (
          <article key={g.title} className="food-card reveal">
            <header>
              <h3>
                {g.title}
                <span lang="he" dir="rtl">
                  {g.he}
                </span>
              </h3>
            </header>
            <ul>
              {g.items.map((it) => {
                const isEaten = eaten.includes(it.id)
                return (
                  <li key={it.id}>
                    <button
                      type="button"
                      className={`food-item ${isEaten ? 'is-eaten' : ''}`}
                      aria-pressed={isEaten}
                      onClick={() => toggleItem(it.id)}
                    >
                      <span className="food-emoji" aria-hidden="true">
                        {it.emoji}
                      </span>
                      <span className="food-name">{it.name}</span>
                      <span className="dots" aria-hidden="true" />
                      <span className="num">{it.detail}</span>
                      <span className="food-check">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
      <div className="fuel-summary reveal">
        <div className="fuel-summary-head">
          <h3>What I ate today</h3>
          <p className="fuel-overall">
            <strong className="num">{overall}%</strong> of the daily menu
          </p>
        </div>
        <div className="macro-bars">
          {bars.map((b) => (
            <div key={b.label} className="macro-row">
              <span className="macro-label">
                {b.label}
                <span lang="he" dir="rtl">
                  {b.he}
                </span>
              </span>
              <div className="bar">
                <div className="bar-fill" style={{ width: `${Math.min(100, macroPct(b.got, b.plan))}%` }} />
              </div>
              <span className="macro-nums num">
                {Math.round(b.got)} / {Math.round(b.plan)} {b.unit} · {macroPct(b.got, b.plan)}%
              </span>
            </div>
          ))}
        </div>
        <div className="micro-wrap">
          <div className="micro-group">
            <p className="card-kicker">
              Vitamins · <span className="num">{vitPct}%</span>
            </p>
            <div className="micro-chips">
              {vitamins.map((v) => (
                <span key={v} className={`micro-chip ${gotMicros.has(v) ? 'is-got' : ''}`}>
                  {v.replace('Vitamin ', '')}
                </span>
              ))}
            </div>
          </div>
          <div className="micro-group">
            <p className="card-kicker">
              Minerals · <span className="num">{minPct}%</span>
            </p>
            <div className="micro-chips">
              {minerals.map((m) => (
                <span key={m} className={`micro-chip ${gotMicros.has(m) ? 'is-got' : ''}`}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="fuel-close">
          Summary: <strong className="num">{overall}%</strong> energy · <strong className="num">{macroPct(got.protein, plan.protein)}%</strong> protein ·{' '}
          <strong className="num">{macroPct(got.fat, plan.fat)}%</strong> fats · <strong className="num">{macroPct(got.carbs, plan.carbs)}%</strong> carbs ·{' '}
          <strong className="num">{vitPct}%</strong> vitamins · <strong className="num">{minPct}%</strong> minerals
        </p>
      </div>
    </div>
  )
}

/* ---------- V · afternoon: insights ---------- */

function Insights() {
  const [i, setI] = useState(0)
  const n = INSIGHTS.length
  const go = useCallback((d: number) => setI((prev) => (prev + d + n) % n), [n])
  const touch = useRef<number | null>(null)
  return (
    <div className="deck reveal">
      <div
        className="deck-card"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current == null) return
          const dx = e.changedTouches[0].clientX - touch.current
          if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1)
          touch.current = null
        }}
      >
        <p className="deck-count num">
          {pad(i + 1)} <span>/ {pad(n)}</span>
        </p>
        <p className="deck-text" key={i}>
          {INSIGHTS[i]}
        </p>
        <p className="deck-hint">Hard-earned. Written down so I never pay for it twice.</p>
      </div>
      <div className="deck-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Previous insight">
          <ArrowLeft size={18} strokeWidth={1.75} />
        </button>
        <div className="deck-dots" aria-hidden="true">
          {INSIGHTS.map((_, d) => (
            <button
              key={d}
              type="button"
              className={d === i ? 'is-active' : ''}
              onClick={() => setI(d)}
              tabIndex={-1}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next insight">
          <ArrowRight size={18} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  )
}

/* ---------- VI · evening: faith ---------- */

function StarOfDavid({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="magen">
      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d="M24 5 L40.5 33.5 L7.5 33.5 Z" />
        <path d="M24 43 L7.5 14.5 L40.5 14.5 Z" />
      </g>
    </svg>
  )
}

function Faith() {
  return (
    <>
      <div className="faith-wheel reveal" role="list">
        <div className="faith-ring" aria-hidden="true" />
        <div className="faith-center">
          <StarOfDavid />
          <p lang="he" dir="rtl">
            מעגל האמונה
          </p>
          <p className="faith-center-en">The circle of faith</p>
        </div>
        {FAITH.map((p, i) => (
          <article key={p.en} className="faith-node" style={{ ['--i' as string]: i }} role="listitem">
            <h3>
              <span lang="he" dir="rtl">
                {p.he}
              </span>
              {p.en}
            </h3>
            <p className="faith-sub">{p.sub}</p>
            <p className="faith-keys">{p.keywords.join(' · ')}</p>
          </article>
        ))}
      </div>
      <div className="faith-list" role="list">
        {FAITH.map((p) => (
          <article key={p.en} className="faith-item reveal" role="listitem">
            <h3>
              <span lang="he" dir="rtl">
                {p.he}
              </span>
              {p.en}
            </h3>
            <p className="faith-sub">{p.sub}</p>
            <p className="faith-keys">{p.keywords.join(' · ')}</p>
          </article>
        ))}
      </div>
    </>
  )
}

/* ---------- VII · night: vision ---------- */

function Vision() {
  return (
    <div className="vision">
      <div className="night-sky" aria-hidden="true">
        <div className="shoot" />
        <div className="shoot shoot-2" />
      </div>
      <ol className="vision-list">
        {VISION.map((g, i) => (
          <li key={i} className="goal-card reveal">
            <span className="goal-icon">
              <Icon name={g.icon} size={19} />
            </span>
            <span className="goal-text">{g.text}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- app ---------- */

function weekKey() {
  const now = new Date()
  const sunday = new Date(now)
  sunday.setDate(now.getDate() - now.getDay())
  return dateKey(sunday)
}

export default function App() {
  useReveal()
  const active = useScrollSpy(useMemo(() => NAV.map((n) => n.id), []))
  const [trainDone, setTrainDone] = usePersistedState<string[]>(`train-${weekKey()}`, [])
  const toggleSession = (id: string) =>
    setTrainDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <div className="shell">
      <Rail active={active} />
      <ChipBar active={active} />
      <ThemeToggle />
      <main>
        <Hero />

        <Chapter
          id="values"
          title="The Nine Values"
          he="הערכים שלי"
          lede="The ground beneath every hour of the day. Each value is written in full — a declaration, and the words that guard it. Nothing is hidden."
        >
          <Values />
        </Chapter>

        <Chapter
          id="dawn"
          title="Dawn Ritual"
          he="שגרת שחר"
          lede="The day is won in its first hour — not by doing, but by being. Four states to inhabit before the world wakes."
        >
          <DawnRitual />
          <Block title="Words for the dawn" he="דברי רוח לבוקר">
            <p className="block-lede reveal">
              A daily reading — Rav Kook and other souls of depth. One thought to carry into the light.
            </p>
            <DawnWords />
          </Block>
        </Chapter>

        <Chapter
          id="morning"
          title="Morning"
          he="בוקר"
          lede="First light, first movement, first fuel — the quiet hours that set the tone."
        >
          <MorningPart done={trainDone} toggle={toggleSession} />
        </Chapter>

        <Chapter
          id="noon"
          title="Noon"
          he="צהריים"
          lede="The heart of the day: iron at twelve, and the scientific menu that powers all of it."
        >
          <Block title="The training week" he="תכנית האימונים">
            <Training done={trainDone} toggle={toggleSession} />
          </Block>
          <Block title="Daily fuel — build your plate" he="התזונה היומית">
            <Fuel />
          </Block>
        </Chapter>

        <Chapter
          id="afternoon"
          title="Afternoon"
          he="אחר הצהריים"
          lede="The mind’s walking hours — truths that cost something to learn, kept sharp."
        >
          <Insights />
        </Chapter>

        <Chapter
          id="evening"
          title="Evening"
          he="ערב"
          lede="The circle that holds the week together — and the quiet chemistry of a deep night’s sleep."
          tone="ink"
        >
          <Faith />
          <Block title="Before sleep" he="תוספי ערב">
            <SuppList items={SUPPLEMENTS_EVENING} />
          </Block>
        </Chapter>

        <Chapter
          id="night"
          title="Vision 38"
          he="הצלחות לגיל 38"
          lede="The last thoughts before sleep — ten goals, written in the present tense, as the horizon I fall asleep toward."
          tone="night"
        >
          <Vision />
        </Chapter>

        <footer className="foot">
          <SunMark size={26} />
          <p lang="he" dir="rtl">
            משמעת היום — תוצאות מחר
          </p>
          <p className="foot-en">Discipline today — results tomorrow.</p>
          <p className="foot-note">Written from my own words · The Illuminated Self</p>
        </footer>
      </main>
    </div>
  )
}
