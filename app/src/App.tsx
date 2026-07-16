import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Beef,
  BookOpen,
  Carrot,
  Check,
  ChevronDown,
  Compass,
  Drumstick,
  Dumbbell,
  Egg,
  Feather,
  Fish,
  Flame,
  Footprints,
  Gift,
  Hammer,
  Heart,
  HeartHandshake,
  Moon,
  Scale,
  Smile,
  Sprout,
  Sun,
  Sunrise,
  Waves,
  Wheat,
  Wind,
  Zap,
} from 'lucide-react'
import {
  FAITH,
  INSIGHTS,
  MORNING,
  NAV,
  NUTRITION,
  PROTEIN_ROTATION,
  SUPPLEMENTS,
  VALUES,
  VISION,
  WEEK,
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
  egg: Egg,
  wheat: Wheat,
  sprout: Sprout,
  carrot: Carrot,
  beef: Beef,
  drumstick: Drumstick,
  fish: Fish,
  zap: Zap,
  dumbbell: Dumbbell,
  footprints: Footprints,
  sun: Sun,
  moon: Moon,
}

function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const C = ICONS[name] ?? Sun
  return <C size={size} strokeWidth={1.75} className={className} />
}

/* ---------- small hooks ---------- */

function usePersistedState<T>(key: string, initial: T): [T, (v: T) => void] {
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
    (v: T) => {
      setState(v)
      try {
        window.localStorage.setItem(key, JSON.stringify(v))
      } catch {
        /* ignore */
      }
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
      { rootMargin: '-30% 0px -55% 0px' },
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

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function dayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86400000)
}

/* ---------- chrome ---------- */

function Rail({ active }: { active: string }) {
  let lastScale = ''
  return (
    <nav className="rail" aria-label="Chapters">
      <a className="rail-brand" href="#top">
        <SunMark size={22} />
        <span>The Illuminated Self</span>
      </a>
      <ul>
        {NAV.map((item) => {
          const showScale = item.scale !== lastScale
          lastScale = item.scale
          return (
            <li key={item.id}>
              {showScale && <div className="rail-scale">{item.scale}</div>}
              <a href={`#${item.id}`} className={active === item.id ? 'is-active' : ''}>
                <span className="rail-num">{item.num}</span>
                <span>{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
      <div className="rail-foot" lang="he" dir="rtl">
        האני המואר
      </div>
    </nav>
  )
}

function ChipBar({ active }: { active: string }) {
  return (
    <nav className="chipbar" aria-label="Chapters">
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
  eyebrow,
  title,
  he,
  lede,
  children,
  tone,
}: {
  id: string
  eyebrow: string
  title: string
  he: string
  lede?: string
  children: React.ReactNode
  tone?: 'ink' | 'dawn'
}) {
  const num = NAV.find((n) => n.id === id)?.num
  return (
    <section id={id} className={`chapter ${tone ? `tone-${tone}` : ''}`}>
      <div className="chapter-inner">
        <header className="chapter-head reveal">
          <p className="eyebrow">
            <span className="eyebrow-num">{num}</span> {eyebrow}
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
          Nine values, one dawn ritual, a disciplined body and a faithful heart — the living map of who I am,
          and of who I am becoming by thirty-eight.
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
            <dt>Supplements</dt>
            <dd>8</dd>
          </div>
          <div>
            <dt>Victories by 38</dt>
            <dd>10</dd>
          </div>
        </dl>
      </div>
      <a className="hero-cue" href="#values" aria-label="Scroll to the values">
        <ChevronDown size={22} strokeWidth={1.5} />
      </a>
    </header>
  )
}

/* ---------- I · values ---------- */

function Values() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="values-grid">
      {VALUES.map((v, i) => {
        const isOpen = open === i
        return (
          <article key={v.en} className={`value-card reveal ${isOpen ? 'is-open' : ''}`}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              <span className="value-icon">
                <Icon name={v.icon} size={20} />
              </span>
              <span className="value-names">
                <span className="value-en">{v.en}</span>
                <span className="value-essence">{v.essence}</span>
              </span>
              <span className="value-he" lang="he" dir="rtl">
                {v.he}
              </span>
              <ChevronDown className="value-chev" size={18} strokeWidth={1.75} />
            </button>
            <div className="value-body" hidden={!isOpen}>
              <p>{v.body}</p>
              {v.quotes.map((q) => (
                <blockquote key={q.by + q.text.slice(0, 12)}>
                  <p>“{q.text}”</p>
                  <cite>{q.by}</cite>
                </blockquote>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}

/* ---------- II · morning ---------- */

function Morning() {
  const countdown = useCountdownTo0530()
  const [done, setDone] = usePersistedState<boolean[]>(`morning-${todayKey()}`, [false, false, false, false])
  const count = done.filter(Boolean).length
  return (
    <div className="morning">
      <aside className="morning-side reveal">
        <div className="clock-card">
          <p className="clock-label">Next dawn ritual in</p>
          <p className="clock-time num">{countdown}</p>
          <p className="clock-sub">Every morning · 05:30</p>
        </div>
        <div className="morning-progress" role="status">
          <div className="bar">
            <div className="bar-fill" style={{ width: `${(count / 4) * 100}%` }} />
          </div>
          <p>
            <strong>{count} of 4</strong> pillars complete today{count === 4 ? ' — the day is yours.' : '.'}
          </p>
        </div>
      </aside>
      <ol className="pillars">
        {MORNING.map((p, i) => (
          <li key={p.en} className={`pillar reveal ${done[i] ? 'is-done' : ''}`}>
            <button
              type="button"
              className="pillar-check"
              aria-pressed={done[i]}
              aria-label={`Mark ${p.en} as ${done[i] ? 'not done' : 'done'}`}
              onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))}
            >
              <Check size={15} strokeWidth={2.5} />
            </button>
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
  )
}

/* ---------- III · nutrition ---------- */

function Nutrition() {
  const [sel, setSel] = useState(() => dayOfYear() % PROTEIN_ROTATION.length)
  const cut = PROTEIN_ROTATION[sel]
  return (
    <div className="nutrition">
      <div className="protein-card reveal">
        <div className="protein-head">
          <p className="card-kicker">Main protein · rotates daily</p>
          <p className="protein-today">
            Today’s cut: <strong>{cut.name}</strong> · <span className="num">{cut.detail}</span>
          </p>
        </div>
        <div className="protein-options" role="group" aria-label="Protein rotation">
          {PROTEIN_ROTATION.map((p, i) => (
            <button key={p.name} type="button" className={i === sel ? 'is-active' : ''} onClick={() => setSel(i)}>
              <Icon name={p.icon} size={22} />
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
              <Icon name={g.icon} size={19} className="food-icon" />
              <h3>
                {g.title}
                <span lang="he" dir="rtl">
                  {g.he}
                </span>
              </h3>
            </header>
            <ul>
              {g.items.map((it) => (
                <li key={it.name}>
                  <span>{it.name}</span>
                  <span className="dots" aria-hidden="true" />
                  <span className="num">{it.detail}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ---------- IV · supplements ---------- */

function Supplements() {
  return (
    <div className="supp-grid">
      {SUPPLEMENTS.map((g) => (
        <article key={g.title} className="supp-card reveal">
          <header>
            <span className="supp-icon">
              <Icon name={g.icon} size={19} />
            </span>
            <div>
              <h3>{g.title}</h3>
              <p>{g.when}</p>
            </div>
          </header>
          <ul>
            {g.items.map((s) => (
              <li key={s.name}>
                <strong>{s.name}</strong>
                <span>{s.purpose}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

/* ---------- V · training ---------- */

function Training() {
  const [sel, setSel] = useState(() => new Date().getDay())
  const day = WEEK[sel]
  const today = new Date().getDay()
  return (
    <div className="training">
      <p className="training-motto reveal">
        Strength · Endurance · Balance — a winning routine begins with a plan. <em>Commit. Persist. Succeed.</em>
      </p>
      <div className="day-chips reveal" role="tablist" aria-label="Training days">
        {WEEK.map((d, i) => (
          <button
            key={d.en}
            role="tab"
            aria-selected={sel === i}
            className={`${sel === i ? 'is-active' : ''} ${d.rest ? 'is-rest' : ''}`}
            onClick={() => setSel(i)}
          >
            <span className="chip-day">{d.short}</span>
            <span className="chip-he" lang="he">
              {d.he}
            </span>
            {i === today && <span className="chip-today">today</span>}
          </button>
        ))}
      </div>
      <div className={`day-panel reveal ${day.rest ? 'is-rest' : ''}`}>
        <h3>
          {day.en}
          <span lang="he" dir="rtl">
            יום {day.he}
          </span>
        </h3>
        <div className="sessions">
          {day.sessions.map((s) => (
            <div key={s.time + s.title} className="session">
              <p className="session-time num">{s.time}</p>
              <div className="session-body">
                <Icon name={s.icon} size={20} className="session-icon" />
                <div>
                  <p className="session-title">{s.title}</p>
                  <p className="session-detail">{s.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {day.rest && <p className="rest-note">Shabbat — full rest for body and soul.</p>}
      </div>
      <ul className="week-strip reveal" aria-label="Week at a glance">
        {WEEK.map((d, i) => (
          <li key={d.en} className={sel === i ? 'is-active' : ''}>
            <button type="button" onClick={() => setSel(i)}>
              <span className="strip-day">{d.short}</span>
              {d.rest ? (
                <span className="strip-rest">Rest</span>
              ) : (
                <>
                  <span>{d.sessions[0].title}</span>
                  <span>{d.sessions[1].title}</span>
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
      <p className="training-close reveal">
        Today’s discipline — tomorrow’s results. You are stronger than you think. <em>Yalla, let’s do this.</em>
      </p>
    </div>
  )
}

/* ---------- VI · faith ---------- */

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

/* ---------- VII · insights ---------- */

function Insights() {
  const [i, setI] = useState(0)
  const n = INSIGHTS.length
  const go = useCallback((d: number) => setI((prev) => (prev + d + n) % n), [n])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])
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

/* ---------- VIII · vision ---------- */

function Vision() {
  const [done, setDone] = usePersistedState<boolean[]>('vision38-ledger', Array(VISION.length).fill(false))
  const count = done.filter(Boolean).length
  return (
    <div className="vision">
      <div className="vision-meter reveal">
        <div className="bar">
          <div className="bar-fill" style={{ width: `${(count / VISION.length) * 100}%` }} />
        </div>
        <p>
          <strong className="num">
            {count} / {VISION.length}
          </strong>{' '}
          already true today
          {count === VISION.length ? ' — the vision is lived.' : '. Mark each one as it becomes real.'}
        </p>
      </div>
      <ol className="vision-list">
        {VISION.map((v, i) => (
          <li key={i} className={`reveal ${done[i] ? 'is-done' : ''}`}>
            <button type="button" aria-pressed={done[i]} onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))}>
              <span className="vision-check">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <span className="vision-text">{v}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- app ---------- */

export default function App() {
  useReveal()
  const active = useScrollSpy(useMemo(() => NAV.map((n) => n.id), []))
  return (
    <div className="shell">
      <Rail active={active} />
      <ChipBar active={active} />
      <main>
        <Hero />

        <Chapter
          id="values"
          eyebrow="The ground"
          title="The Nine Values"
          he="הערכים שלי"
          lede="Everything else stands on these. Each one is written as a declaration — open it to read the full vow and the words that guard it."
        >
          <Values />
        </Chapter>

        <Chapter
          id="morning"
          eyebrow="The day"
          title="Morning Ritual"
          he="שגרת הבוקר"
          lede="The day is won in its first hour. Four pillars, every morning, beginning at 05:30."
        >
          <Morning />
        </Chapter>

        <Chapter
          id="nutrition"
          eyebrow="The day"
          title="Daily Fuel"
          he="התזונה היומית"
          lede="A scientific menu, built once and followed daily — water only, nothing wasted."
        >
          <Nutrition />
        </Chapter>

        <Chapter
          id="supplements"
          eyebrow="The day"
          title="Supplements"
          he="תוספי תזונה"
          lede="Timed to the body’s clock: with the morning fat, before sleep, and around training."
        >
          <Supplements />
        </Chapter>

        <Chapter
          id="training"
          eyebrow="The week"
          title="The Training Week"
          he="תכנית האימונים"
          lede="Two sessions a day, six days a week — dawn for the core and the lungs, noon for the iron. Shabbat rests."
        >
          <Training />
        </Chapter>

        <Chapter
          id="faith"
          eyebrow="The week"
          title="Faith & Jewish Life"
          he="מעגל האמונה"
          lede="The circle that holds the week together — from the morning’s tefillin to the candles of Shabbat."
          tone="ink"
        >
          <Faith />
        </Chapter>

        <Chapter
          id="insights"
          eyebrow="The mind"
          title="Nine Insights"
          he="תובנות"
          lede="Truths that cost something to learn. Swipe or use the arrows."
        >
          <Insights />
        </Chapter>

        <Chapter
          id="vision"
          eyebrow="The life"
          title="Vision 38"
          he="הצלחות לגיל 38"
          lede="Written in the present tense, as things already true — the ledger of the man I am walking toward."
          tone="dawn"
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
