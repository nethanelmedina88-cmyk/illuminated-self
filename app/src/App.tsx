import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Copy,
  ExternalLink,
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
  List,
  Moon,
  MoonStar,
  Mountain,
  Pause,
  PhoneOff,
  Play,
  Quote,
  Salad,
  Scale,
  Share2,
  ShieldCheck,
  Smile,
  Sparkles,
  Sun,
  Table,
  Sunrise,
  Sunset,
  Waves,
  Wind,
  X,
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
  PROJECTS,
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
  sparkles: Sparkles,
  activity: Activity,
  table: Table,
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

/** true once the hero has scrolled out of view: the title bar takes over */
function usePastHero() {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting), { rootMargin: '-56px 0px 0px 0px' })
    io.observe(hero)
    return () => io.disconnect()
  }, [])
  return past
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

/** which part of the day it is right now */
function nowPart(d = new Date()) {
  const m = d.getHours() * 60 + d.getMinutes()
  if (m >= 22 * 60 || m < 5 * 60 + 30) return 'night'
  if (m < 6 * 60) return 'dawn'
  if (m < 12 * 60) return 'morning'
  if (m < 16 * 60) return 'noon'
  if (m < 19 * 60) return 'afternoon'
  return 'evening'
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function vibrate(ms: number | number[]) {
  try {
    const ua = navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }
    if (ua.userActivation && !ua.userActivation.hasBeenActive) return
    navigator.vibrate?.(ms)
  } catch {
    /* ignore */
  }
}

/** horizontal swipe on a card: dir +1 = next, -1 = previous */
function useSwipe(onSwipe: (dir: 1 | -1) => void) {
  const start = useRef<{ x: number; y: number } | null>(null)
  return {
    onTouchStart: (e: React.TouchEvent) => {
      start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const s = start.current
      start.current = null
      if (!s) return
      const dx = e.changedTouches[0].clientX - s.x
      const dy = e.changedTouches[0].clientY - s.y
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) onSwipe(dx < 0 ? 1 : -1)
    },
  }
}

/* ---------- toast ---------- */

const ToastContext = createContext<(msg: string) => void>(() => {})

function useToastProvider() {
  const [msg, setMsg] = useState('')
  const [shown, setShown] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const show = useCallback((m: string) => {
    setMsg(m)
    setShown(false)
    window.clearTimeout(timer.current)
    requestAnimationFrame(() => setShown(true))
    timer.current = window.setTimeout(() => setShown(false), 2400)
  }, [])
  return { msg, shown, show }
}

function Toast({ msg, shown }: { msg: string; shown: boolean }) {
  return (
    <div className={`toast ${shown ? 'is-shown' : ''}`} role="status" aria-live="polite">
      {msg && <Check size={18} strokeWidth={2.5} />}
      <span>{msg}</span>
    </div>
  )
}

/* ---------- narration (KC101 voice) ---------- */

interface AudioState {
  available: boolean
  playing: string | null
  loading: string | null
  toggle: (name: string) => void
}

const NarrationContext = createContext<AudioState>({ available: false, playing: null, loading: null, toggle: () => {} })

function useNarrationProvider(): AudioState {
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState<string | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const elRef = useRef<HTMLAudioElement | null>(null)
  const playingRef = useRef<string | null>(null)
  playingRef.current = playing

  useEffect(() => {
    fetch('audio/quote-01.mp3', { method: 'HEAD' })
      .then((r) => setAvailable(r.ok))
      .catch(() => setAvailable(false))
  }, [])

  const toggle = useCallback((name: string) => {
    let el = elRef.current
    if (!el) {
      el = new Audio()
      el.preload = 'none'
      el.onended = () => setPlaying(null)
      el.onerror = () => {
        setPlaying(null)
        setLoading(null)
      }
      elRef.current = el
    }
    if (playingRef.current === name) {
      el.pause()
      setPlaying(null)
      return
    }
    el.src = `audio/${name}.mp3`
    setLoading(name)
    el.play()
      .then(() => setPlaying(name))
      .catch(() => setPlaying(null))
      .finally(() => setLoading((l) => (l === name ? null : l)))
  }, [])

  return { available, playing, loading, toggle }
}

function PlayButton({ name, label, className }: { name: string; label: string; className?: string }) {
  const { available, playing, loading, toggle } = useContext(NarrationContext)
  if (!available) return null
  const active = playing === name
  const busy = loading === name
  return (
    <button
      type="button"
      className={`play-btn ${active ? 'is-playing' : ''} ${className ?? ''}`}
      onClick={() => toggle(name)}
      aria-label={`${active ? 'Pause' : 'Listen'} — ${label}`}
      aria-busy={busy}
      title={active ? 'Pause' : 'Listen · KC101'}
    >
      {active ? <Pause size={16} strokeWidth={2} /> : <Play size={16} strokeWidth={2} />}
    </button>
  )
}

/* ---------- long-press menu (listen · copy · share) ---------- */

interface MenuTarget {
  el: HTMLElement
  text: string
  audio?: string
  label: string
}

const MenuContext = createContext<(t: MenuTarget) => void>(() => {})

/** press and hold for ~0.5s; moving the finger cancels it */
function useLongPress(get: () => MenuTarget | null) {
  const open = useContext(MenuContext)
  const t = useRef<number | undefined>(undefined)
  const origin = useRef<{ x: number; y: number } | null>(null)
  const cancel = () => {
    window.clearTimeout(t.current)
    origin.current = null
  }
  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (e.button > 0 || (e.target as HTMLElement).closest('button, a')) return
      origin.current = { x: e.clientX, y: e.clientY }
      t.current = window.setTimeout(() => {
        const target = get()
        origin.current = null
        if (target) {
          vibrate(12)
          open(target)
        }
      }, 500)
    },
    onPointerMove: (e: React.PointerEvent) => {
      const o = origin.current
      if (o && Math.hypot(e.clientX - o.x, e.clientY - o.y) > 10) cancel()
    },
    onPointerUp: cancel,
    onPointerCancel: cancel,
    onContextMenu: (e: React.MouseEvent) => {
      // on touch screens the hold opens our menu, not the browser's
      const pt = (e.nativeEvent as unknown as { pointerType?: string }).pointerType
      if (pt === 'touch' || window.matchMedia('(pointer: coarse)').matches) e.preventDefault()
    },
  }
}

function ContextMenu({ target, onClose }: { target: MenuTarget | null; onClose: () => void }) {
  const narration = useContext(NarrationContext)
  const toast = useContext(ToastContext)
  const cardRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number; width: number; menuTop: number } | null>(null)
  const openedAt = useRef(0)

  useEffect(() => {
    if (!target) {
      document.documentElement.classList.remove('ctx-open')
      return
    }
    document.documentElement.classList.add('ctx-open')
    openedAt.current = performance.now()
    const r = target.el.getBoundingClientRect()
    const clone = target.el.cloneNode(true) as HTMLElement
    clone.style.width = `${r.width}px`
    clone.removeAttribute('id')
    if (cardRef.current) {
      cardRef.current.replaceChildren(clone)
    }
    const mh = 3 * 48 + 8
    const below = r.bottom + 16 + mh < window.innerHeight - 16
    setPos({
      top: Math.max(8, Math.min(r.top, window.innerHeight - r.height - 8)),
      left: r.left,
      width: r.width,
      menuTop: below ? r.bottom + 16 : Math.max(16, r.top - 16 - mh),
    })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    requestAnimationFrame(() => menuRef.current?.querySelector('button')?.focus({ preventScroll: true }))
    return () => window.removeEventListener('keydown', onKey)
  }, [target, onClose])

  if (!target) return null
  const listening = target.audio && narration.playing === target.audio
  const canShare = typeof navigator !== 'undefined' && !!navigator.share
  return (
    <div className="ctx">
      <div
        className="ctx-backdrop"
        onClick={() => {
          // the finger that opened the menu lifts right after: that release is not a "close"
          if (performance.now() - openedAt.current > 600) onClose()
        }}
      />
      <div
        className="ctx-card"
        ref={cardRef}
        aria-hidden="true"
        style={pos ? { top: pos.top, left: pos.left, width: pos.width } : { visibility: 'hidden' }}
      />
      <div className="ctx-menu" ref={menuRef} role="menu" style={pos ? { top: pos.menuTop } : undefined}>
        {narration.available && target.audio && (
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              narration.toggle(target.audio!)
              onClose()
            }}
          >
            {listening ? <Pause size={18} /> : <Play size={18} />}
            {listening ? 'Pause' : 'Listen'}
          </button>
        )}
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            navigator.clipboard?.writeText(target.text).then(
              () => toast('Copied'),
              () => toast('Copy is not available here'),
            )
            onClose()
          }}
        >
          <Copy size={18} />
          Copy text
        </button>
        {canShare && (
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              navigator.share({ title: target.label, text: target.text }).catch(() => {})
              onClose()
            }}
          >
            <Share2 size={18} />
            Share
          </button>
        )}
      </div>
    </div>
  )
}

/* ---------- chrome ---------- */

function useTheme(): ['light' | 'dark', () => void] {
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
  const toggle = useCallback(() => setMode(effective === 'dark' ? 'light' : 'dark'), [effective])
  return [effective, toggle]
}

function ThemeSetting({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  return (
    <button type="button" className="setting-row" role="switch" aria-checked={theme === 'dark'} onClick={onToggle}>
      {theme === 'dark' ? <Moon size={20} strokeWidth={1.75} /> : <Sun size={20} strokeWidth={1.75} />}
      <span className="setting-name">
        Night light ·{' '}
        <span lang="he" dir="rtl">
          תאורת לילה
        </span>
      </span>
      <span className="switch" aria-hidden="true" />
    </button>
  )
}

function ProjectLinks() {
  return (
    <div className="project-links">
      {PROJECTS.map((p) => (
        <a key={p.url} className="project-link" href={p.url} target="_blank" rel="noopener noreferrer">
          <Icon name={p.icon} size={20} className="p-icon" />
          <span className="p-label">
            <span lang="he" dir="rtl">
              {p.he}
            </span>
            <span className="p-en">{p.en}</span>
          </span>
          <ExternalLink size={16} strokeWidth={1.75} className="p-ext" />
        </a>
      ))}
    </div>
  )
}

/** cloud-sync.js makes its own button; it lives in the rail on desktop and in the hub sheet on phones */
function useCloudButtonHost() {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1140px)')
    const place = () => {
      const btn = document.getElementById('cloud-sync-btn')
      const host = document.getElementById(mq.matches ? 'cloud-host-rail' : 'cloud-host-sheet')
      if (btn && host && btn.parentElement !== host) host.appendChild(btn)
    }
    place()
    const mo = new MutationObserver(place)
    mo.observe(document.body, { childList: true })
    mq.addEventListener('change', place)
    return () => {
      mo.disconnect()
      mq.removeEventListener('change', place)
    }
  }, [])
}

function Rail({ active, theme, onTheme }: { active: string; theme: 'light' | 'dark'; onTheme: () => void }) {
  return (
    <nav className="rail" aria-label="Parts of the day">
      <a className="rail-brand" href="#top">
        <SunMark size={24} />
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
      <div className="rail-bottom">
        <ThemeSetting theme={theme} onToggle={onTheme} />
        <div id="cloud-host-rail" className="cloud-host" />
        <p className="label">
          More projects ·{' '}
          <span lang="he" dir="rtl">
            עוד פרויקטים
          </span>
        </p>
        <ProjectLinks />
      </div>
    </nav>
  )
}

function TopBar({ active, shown }: { active: string; shown: boolean }) {
  const item = NAV.find((n) => n.id === active) ?? NAV[0]
  return (
    <header className={`topbar ${shown ? 'is-shown' : ''}`} aria-hidden={!shown}>
      <SunMark size={20} />
      <p className="topbar-title">
        <span className="topbar-num">{item.num}</span>
        <b>{item.label}</b>
        <span lang="he" dir="rtl">
          {item.he}
        </span>
      </p>
      <span className="topbar-time num">{item.time}</span>
    </header>
  )
}

function BottomNav({ active, onSections, sheetOpen }: { active: string; onSections: () => void; sheetOpen: boolean }) {
  const part = nowPart()
  const dayParts = ['dawn', 'morning', 'noon', 'afternoon', 'evening']
  const items = [
    { key: 'values', label: 'Values', icon: <Mountain size={22} strokeWidth={1.75} />, on: active === 'values', go: () => scrollToId('values') },
    { key: 'now', label: 'Now', icon: <Clock size={22} strokeWidth={1.75} />, on: dayParts.includes(active), go: () => scrollToId(part) },
    { key: 'night', label: 'Vision', icon: <MoonStar size={22} strokeWidth={1.75} />, on: active === 'night', go: () => scrollToId('night') },
    { key: 'all', label: 'Sections', icon: <List size={22} strokeWidth={1.75} />, on: sheetOpen, go: onSections },
  ]
  return (
    <nav className="bottomnav" aria-label="Quick navigation">
      {items.map((it) => (
        <button key={it.key} type="button" aria-current={it.on} onClick={it.go}>
          {it.icon}
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  )
}

/** the hub: every part of the day, settings and links, in one bottom sheet */
function SectionsSheet({
  open,
  onClose,
  active,
  theme,
  onTheme,
}: {
  open: boolean
  onClose: () => void
  active: string
  theme: 'light' | 'dark'
  onTheme: () => void
}) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const part = nowPart()

  // open / close: background scales down, page scroll locks, Back closes it
  useEffect(() => {
    const root = document.documentElement
    const shell = document.querySelector('.shell') as HTMLElement | null
    if (open) {
      shell?.style.setProperty('--origin-y', `${window.scrollY + window.innerHeight / 2}px`)
      setMounted(true)
      // two frames: the sheet is laid out below the screen first, then slides up
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          root.classList.add('sheet-open')
          setShown(true)
        }),
      )
      history.pushState({ sheet: 1 }, '')
      const onPop = () => onClose()
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('popstate', onPop)
      window.addEventListener('keydown', onKey)
      return () => {
        window.removeEventListener('popstate', onPop)
        window.removeEventListener('keydown', onKey)
        if (history.state && history.state.sheet) history.back()
      }
    }
    root.classList.remove('sheet-open')
    setShown(false)
    const t = window.setTimeout(() => setMounted(false), 340)
    return () => window.clearTimeout(t)
  }, [open, onClose])

  // drag the sheet down to close it; the page behind grows back as it goes
  useEffect(() => {
    const sheet = sheetRef.current
    const back = backRef.current
    if (!sheet || !back) return
    const shell = document.querySelector('.shell') as HTMLElement | null
    let d: { y0: number; x0: number; t0: number; dy: number; on: boolean; head: boolean } | null = null
    const start = (e: TouchEvent) => {
      const head = !!(e.target as HTMLElement).closest('.sheet-head')
      if (!head && sheet.scrollTop > 0) return
      d = { y0: e.touches[0].clientY, x0: e.touches[0].clientX, t0: performance.now(), dy: 0, on: false, head }
    }
    const move = (e: TouchEvent) => {
      if (!d) return
      const dy = e.touches[0].clientY - d.y0
      const dx = e.touches[0].clientX - d.x0
      if (!d.on) {
        if (dy > 6 && dy > Math.abs(dx) && (d.head || sheet.scrollTop <= 0)) {
          d.on = true
          sheet.classList.add('is-dragging')
          back.classList.add('is-dragging')
          if (shell) shell.style.transition = 'none'
        } else if (dy < -6 || Math.abs(dx) > 10) {
          d = null
          return
        } else return
      }
      if (e.cancelable) e.preventDefault()
      d.dy = Math.max(0, dy)
      const p = Math.min(1, d.dy / Math.max(1, sheet.offsetHeight))
      sheet.style.transform = `translateY(${d.dy}px)`
      back.style.opacity = String(1 - p)
      if (shell) shell.style.transform = `scale(${0.95 + 0.05 * p})`
    }
    const end = () => {
      if (!d) return
      const g = d
      d = null
      if (!g.on) return
      sheet.classList.remove('is-dragging')
      back.classList.remove('is-dragging')
      sheet.style.transform = ''
      back.style.opacity = ''
      if (shell) {
        shell.style.transition = ''
        shell.style.transform = ''
      }
      const v = g.dy / Math.max(1, performance.now() - g.t0)
      if (g.dy > 120 || (g.dy > 40 && v > 0.5)) {
        vibrate(8)
        onClose()
      }
    }
    sheet.addEventListener('touchstart', start, { passive: true })
    sheet.addEventListener('touchmove', move, { passive: false })
    sheet.addEventListener('touchend', end)
    sheet.addEventListener('touchcancel', end)
    return () => {
      sheet.removeEventListener('touchstart', start)
      sheet.removeEventListener('touchmove', move)
      sheet.removeEventListener('touchend', end)
      sheet.removeEventListener('touchcancel', end)
    }
  }, [onClose])

  return (
    <>
      <div ref={backRef} className={`sheet-backdrop ${shown ? 'is-open' : ''}`} hidden={!mounted} onClick={onClose} />
      <div
        ref={sheetRef}
        className={`sheet ${shown ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        hidden={!mounted}
      >
        <div className="sheet-head">
          <span className="sheet-grip" aria-hidden="true" />
          <h2 id="sheet-title">The day</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>
        <div className="sheet-group">
          <div className="nav-list">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className="nav-row"
                aria-current={active === item.id}
                onClick={() => {
                  onClose()
                  window.setTimeout(() => scrollToId(item.id), 360)
                }}
              >
                <span className="nav-num">{item.num}</span>
                <span className="nav-name">
                  {item.label}
                  <span lang="he" dir="rtl">
                    {item.he}
                  </span>
                </span>
                {item.id === part && <span className="now-dot" title="Now" />}
                <span className="nav-time num">{item.time}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="sheet-group">
          <p className="label">Settings</p>
          <ThemeSetting theme={theme} onToggle={onTheme} />
          <div id="cloud-host-sheet" className="cloud-host" />
        </div>
        <div className="sheet-group">
          <p className="label">
            More projects ·{' '}
            <span lang="he" dir="rtl">
              עוד פרויקטים
            </span>
          </p>
          <ProjectLinks />
        </div>
      </div>
    </>
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
          <Icon name={nav?.mark ?? 'sun'} size={20} />
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
        <div className="hero-cta reveal">
          <a className="btn" href="#values">
            Begin the day
            <ChevronDown size={20} strokeWidth={2} />
          </a>
        </div>
      </div>
    </header>
  )
}

/* ---------- I · the ground / values ---------- */

function ValueCard({ v, i }: { v: (typeof VALUES)[number]; i: number }) {
  const ref = useRef<HTMLElement>(null)
  const lp = useLongPress(() =>
    ref.current
      ? {
          el: ref.current,
          label: v.en,
          audio: `value-${pad(i + 1)}`,
          text: `${v.en} · ${v.he}\n${v.body}\n${v.quotes.map((q) => `“${q.text}” — ${q.by}`).join('\n')}`,
        }
      : null,
  )
  return (
    <article ref={ref} className="value-card reveal" {...lp}>
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
        <PlayButton name={`value-${pad(i + 1)}`} label={v.en} />
      </header>
      <p className="value-body-text">{v.body}</p>
      {v.quotes.map((q) => (
        <blockquote key={q.by + q.text.slice(0, 12)}>
          <p>“{q.text}”</p>
          <cite>{q.by}</cite>
        </blockquote>
      ))}
    </article>
  )
}

function Values() {
  return (
    <div className="values-grid">
      {VALUES.map((v, i) => (
        <ValueCard key={v.en} v={v} i={i} />
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
          {MORNING.map((p, i) => (
            <li key={p.en} className="pillar reveal">
              <div className="pillar-main">
                <div className="pillar-top">
                  <Icon name={p.icon} size={20} className="pillar-icon" />
                  <h3>
                    {p.en}
                    <span lang="he" dir="rtl">
                      {p.he}
                    </span>
                  </h3>
                  <PlayButton name={`pillar-${pad(i + 1)}`} label={p.en} className="pillar-play" />
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
  const [dir, setDir] = useState<1 | -1 | 0>(0)
  const q = DAWN_QUOTES[i]
  const go = (d: 1 | -1) => {
    setDir(d)
    setI((prev) => (prev + d + n) % n)
  }
  const swipe = useSwipe(go)
  const ref = useRef<HTMLDivElement>(null)
  const lp = useLongPress(() =>
    ref.current
      ? { el: ref.current, label: q.by, audio: `quote-${pad(i + 1)}`, text: `${q.he ? q.he + '\n' : ''}${q.en}\n— ${q.by}` }
      : null,
  )
  return (
    <div className="dawn-words reveal">
      <div className="dawn-quote" ref={ref} {...swipe} {...lp}>
        <Quote size={20} className="dawn-quote-mark" aria-hidden="true" />
        <div className={`dawn-quote-body ${dir > 0 ? 'from-right' : dir < 0 ? 'from-left' : ''}`} key={i}>
          {q.he && (
            <p className="dawn-quote-he" lang="he" dir="rtl">
              {q.he}
            </p>
          )}
          <p className="dawn-quote-en">{q.en}</p>
          <p className="dawn-quote-by">{q.by}</p>
        </div>
        <PlayButton name={`quote-${pad(i + 1)}`} label={q.by} className="quote-play" />
      </div>
      <div className="deck-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Previous words">
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <p className="dawn-count num">
          Word {pad(i + 1)} <span>/ {pad(n)}</span> — today’s falls by the date
        </p>
        <button type="button" onClick={() => go(1)} aria-label="Next words">
          <ArrowRight size={20} strokeWidth={1.75} />
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
    <div className={`session session-${variant} ${isToday ? 'is-today' : ''} ${done ? 'is-done' : ''}`}>
      <div className="session-head">
        <p className="session-time num">{time}</p>
        {onToggle && (
          <button
            type="button"
            className={`session-done ${done ? 'is-done' : ''}`}
            aria-pressed={done}
            onClick={onToggle}
            title={done ? 'Completed — tap to undo' : 'Mark completed'}
          >
            <Check size={16} strokeWidth={2.5} />
            <span>{done ? 'Done' : 'Mark done'}</span>
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
              <Sun size={24} strokeWidth={1.5} />
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
  const toast = useContext(ToastContext)
  const [eaten, setEaten] = usePersistedState<string[]>(`eaten-${todayKey()}`, [])
  const [cutId, setCutId] = usePersistedState<string>(`cut-${todayKey()}`, PROTEIN_ROTATION[dayOfYear() % 3].id)
  const cut = PROTEIN_ROTATION.find((p) => p.id === cutId) ?? PROTEIN_ROTATION[0]
  const gridRef = useRef<HTMLDivElement>(null)

  const toggleItem = (id: string) => {
    const adding = !eaten.includes(id)
    setEaten((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    vibrate(adding ? [8, 24, 12] : 6)
    if (adding && eaten.length === 0) toast('First item logged for today')
  }

  const pointToMenu = () => {
    const first = gridRef.current?.querySelector('.food-card') as HTMLElement | null
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (first) {
      first.classList.remove('is-pointed')
      void first.offsetWidth
      first.classList.add('is-pointed')
    }
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
      <div className="protein-card reveal">
        <div className="protein-head">
          <p className="card-kicker">Main protein · rotates daily</p>
          <button
            type="button"
            className={`eat-toggle ${eaten.includes(cut.id) ? 'is-eaten' : ''}`}
            aria-pressed={eaten.includes(cut.id)}
            onClick={() => toggleItem(cut.id)}
          >
            <Check size={16} strokeWidth={2.5} /> {eaten.includes(cut.id) ? 'Eaten' : 'I ate it'}
          </button>
        </div>
        <div className="protein-options" role="radiogroup" aria-label="Protein rotation">
          {PROTEIN_ROTATION.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={p.id === cut.id}
              onClick={() => setCutId(p.id)}
            >
              <span className="food-emoji" aria-hidden="true">
                {p.emoji}
              </span>
              <span className="p-text">
                <span>{p.name}</span>
                <span className="num">{p.detail}</span>
              </span>
              <span className="radio" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div className="food-grid" ref={gridRef}>
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
                        <Check size={14} strokeWidth={3} />
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
        {eatenItems.length === 0 && (
          <div className="zero">
            <span className="zero-icon" aria-hidden="true">
              🍽️
            </span>
            <p className="zero-text">
              <b>Nothing logged yet today</b>
              <span>Each food you tick above adds itself up here.</span>
            </p>
            <button type="button" className="btn" onClick={pointToMenu}>
              Log a food
            </button>
          </div>
        )}
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
  const [dir, setDir] = useState<1 | -1 | 0>(0)
  const n = INSIGHTS.length
  const go = useCallback(
    (d: 1 | -1) => {
      setDir(d)
      setI((prev) => (prev + d + n) % n)
    },
    [n],
  )
  const swipe = useSwipe(go)
  const ref = useRef<HTMLDivElement>(null)
  const lp = useLongPress(() =>
    ref.current ? { el: ref.current, label: `Insight ${i + 1}`, audio: `insight-${pad(i + 1)}`, text: INSIGHTS[i] } : null,
  )
  return (
    <div className="deck reveal">
      <div className="deck-card" ref={ref} {...swipe} {...lp}>
        <div className="deck-top">
          <p className="deck-count num">
            {pad(i + 1)} <span>/ {pad(n)}</span>
          </p>
          <PlayButton name={`insight-${pad(i + 1)}`} label={`Insight ${i + 1}`} />
        </div>
        <p className={`deck-text ${dir > 0 ? 'from-right' : dir < 0 ? 'from-left' : ''}`} key={i}>
          {INSIGHTS[i]}
        </p>
        <p className="deck-hint">Hard-earned. Written down so I never pay for it twice.</p>
      </div>
      <div className="deck-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Previous insight">
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <div className="deck-dots" aria-hidden="true">
          {INSIGHTS.map((_, d) => (
            <i key={d} className={d === i ? 'is-active' : ''} />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next insight">
          <ArrowRight size={20} strokeWidth={1.75} />
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
            <PlayButton name={`faith-${pad(i + 1)}`} label={p.en} className="faith-play" />
          </article>
        ))}
      </div>
      <div className="faith-list" role="list">
        {FAITH.map((p, i) => (
          <article key={p.en} className="faith-item reveal" role="listitem">
            <h3>
              <span lang="he" dir="rtl">
                {p.he}
              </span>
              {p.en}
            </h3>
            <p className="faith-sub">{p.sub}</p>
            <p className="faith-keys">{p.keywords.join(' · ')}</p>
            <PlayButton name={`faith-${pad(i + 1)}`} label={p.en} className="faith-play" />
          </article>
        ))}
      </div>
    </>
  )
}

/* ---------- VII · night: vision ---------- */

function GoalCard({ g, i }: { g: (typeof VISION)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const lp = useLongPress(() => (ref.current ? { el: ref.current, label: `Goal ${i + 1}`, audio: `goal-${pad(i + 1)}`, text: g.text } : null))
  return (
    <li ref={ref} className="goal-card reveal" {...lp}>
      <span className="goal-icon">
        <Icon name={g.icon} size={20} />
      </span>
      <span className="goal-text">{g.text}</span>
      <PlayButton name={`goal-${pad(i + 1)}`} label={`Goal ${i + 1}`} className="goal-play" />
    </li>
  )
}

function Vision() {
  return (
    <div className="vision">
      <div className="night-sky" aria-hidden="true">
        <div className="shoot" />
        <div className="shoot shoot-2" />
      </div>
      <ol className="vision-list">
        {VISION.map((g, i) => (
          <GoalCard key={i} g={g} i={i} />
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
  useCloudButtonHost()
  const active = useScrollSpy(useMemo(() => NAV.map((n) => n.id), []))
  const pastHero = usePastHero()
  const [theme, toggleTheme] = useTheme()
  const [sheetOpen, setSheetOpen] = useState(false)
  const closeSheet = useCallback(() => setSheetOpen(false), [])
  const [menu, setMenu] = useState<MenuTarget | null>(null)
  const closeMenu = useCallback(() => setMenu(null), [])
  const toastState = useToastProvider()
  const [trainDone, setTrainDone] = usePersistedState<string[]>(`train-${weekKey()}`, [])
  const totalSessions = WEEKDATA.reduce((acc, d) => acc + (d.rest ? 0 : d.sessions.length), 0)
  const toggleSession = (id: string) => {
    const adding = !trainDone.includes(id)
    setTrainDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    vibrate(adding ? [10, 28, 18] : 6)
    if (adding) toastState.show(`Session done · ${trainDone.length + 1} / ${totalSessions} this week`)
  }
  const narration = useNarrationProvider()

  return (
    <NarrationContext.Provider value={narration}>
      <ToastContext.Provider value={toastState.show}>
        <MenuContext.Provider value={setMenu}>
          <div className="shell">
            <Rail active={active} theme={theme} onTheme={toggleTheme} />
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
                <SunMark size={28} />
                <p lang="he" dir="rtl">
                  משמעת היום — תוצאות מחר
                </p>
                <p className="foot-en">Discipline today — results tomorrow.</p>
                <div className="foot-projects">
                  {PROJECTS.map((p) => (
                    <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer">
                      <Icon name={p.icon} size={16} />
                      <span lang="he" dir="rtl">
                        {p.he}
                      </span>
                      <ExternalLink size={12} strokeWidth={1.75} />
                    </a>
                  ))}
                </div>
                <p className="foot-note">Written from my own words · The Illuminated Self</p>
              </footer>
            </main>
          </div>
          <TopBar active={active} shown={pastHero && !sheetOpen} />
          <BottomNav active={active} onSections={() => setSheetOpen(true)} sheetOpen={sheetOpen} />
          <SectionsSheet open={sheetOpen} onClose={closeSheet} active={active} theme={theme} onTheme={toggleTheme} />
          <ContextMenu target={menu} onClose={closeMenu} />
          <Toast msg={toastState.msg} shown={toastState.shown} />
        </MenuContext.Provider>
      </ToastContext.Provider>
    </NarrationContext.Provider>
  )
}
