/* Cloud sync via the aniamiti Firebase project (Google sign-in + Firestore).
   Generic: configured by window.__CLOUD_SYNC_CONFIG = { field, prefixes, exact, corner }.
   Data lives in users/{uid}.{field} = { entries: {key: rawString}, updatedAt: ms }.
   Newest-wins; a device applies the cloud copy only when it is strictly newer. */
(function () {
  var CFG = window.__CLOUD_SYNC_CONFIG
  if (!CFG || !CFG.field) return
  var FIELD = CFG.field
  var PRE = CFG.prefixes || []
  var EXACT = CFG.exact || []
  var META = '__cloudsync_meta_' + FIELD

  function matches(k) {
    if (!k) return false
    if (EXACT.indexOf(k) >= 0) return true
    for (var i = 0; i < PRE.length; i++) if (k.indexOf(PRE[i]) === 0) return true
    return false
  }

  function collect() {
    var e = {}
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i)
        if (matches(k)) e[k] = localStorage.getItem(k)
      }
    } catch (_) {}
    return e
  }

  function meta() {
    try {
      return JSON.parse(localStorage.getItem(META) || 'null') || { updatedAt: 0 }
    } catch (_) {
      return { updatedAt: 0 }
    }
  }

  function setMeta(m) {
    try {
      localStorage.setItem(META, JSON.stringify(m))
    } catch (_) {}
  }

  /* ---- button ---- */
  var CLOUD = '☁︎'
  var btn = document.createElement('button')
  btn.type = 'button'
  btn.id = 'cloud-sync-btn'
  var host = document.getElementById('ml-backup')
  if (host) {
    host.insertBefore(btn, host.firstChild)
  } else {
    btn.style.position = 'fixed'
    btn.style.zIndex = '99999'
    btn.style.bottom = CFG.bottom || '186px'
    btn.style[CFG.corner === 'left' ? 'left' : 'right'] = '18px'
    btn.style.borderRadius = '999px'
    btn.style.padding = '0 15px'
    btn.style.height = '46px'
    btn.style.border = '1px solid rgba(128,120,100,.45)'
    btn.style.background = 'rgba(20,32,47,.88)'
    btn.style.color = '#f5efdd'
    btn.style.font = '500 13px/1 system-ui,sans-serif'
    btn.style.cursor = 'pointer'
    btn.style.boxShadow = '0 4px 14px rgba(0,0,0,.25)'
    document.body.appendChild(btn)
  }

  function state(s, user) {
    if (s === 'loading') {
      btn.textContent = CLOUD + ' טוען...'
      btn.disabled = true
    } else if (s === 'off') {
      btn.disabled = false
      btn.textContent = CLOUD + ' סנכרון ענן'
      btn.title = 'Sign in with Google to sync across devices · התחברות עם Google לסנכרון בין מכשירים'
    } else if (s === 'on') {
      btn.disabled = false
      btn.textContent = CLOUD + ' מסונכרן ✓'
      btn.title = (user && user.email ? user.email + ' · ' : '') + 'לחץ כדי להתנתק'
    } else if (s === 'saving') {
      btn.textContent = CLOUD + ' שומר...'
    } else if (s === 'err') {
      btn.disabled = false
      btn.textContent = CLOUD + ' שגיאת סנכרון'
    }
  }
  state('loading')

  /* ---- firebase ---- */
  function load(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script')
      s.src = src
      s.onload = res
      s.onerror = rej
      document.head.appendChild(s)
    })
  }

  var base = 'https://www.gstatic.com/firebasejs/10.14.1/'
  load(base + 'firebase-app-compat.js')
    .then(function () {
      return Promise.all([load(base + 'firebase-auth-compat.js'), load(base + 'firebase-firestore-compat.js')])
    })
    .then(init)
    .catch(function () {
      btn.remove() /* offline or blocked (e.g. artifact CSP) — feature simply absent */
    })

  function init() {
    var fb = window.firebase
    fb.initializeApp({
      apiKey: 'AIzaSyAE_9H3d2A1gAf53P_9V6jFNt_PKBm45o8',
      authDomain: 'aniamiti.firebaseapp.com',
      projectId: 'aniamiti',
      storageBucket: 'aniamiti.appspot.com',
      messagingSenderId: '730623917370',
      appId: '1:730623917370:web:1d037a0afa8c96f48ea403',
    })
    var auth = fb.auth()
    var db = fb.firestore()
    var applying = false
    var timer = null

    function push() {
      var u = auth.currentUser
      if (!u) return
      var payload = { entries: collect(), updatedAt: Date.now() }
      setMeta({ updatedAt: payload.updatedAt })
      state('saving')
      var patch = {}
      patch[FIELD] = payload
      db.collection('users')
        .doc(u.uid)
        .set(patch, { merge: true })
        .then(function () {
          state('on', u)
        })
        .catch(function (e) {
          state('err')
          console.warn('[cloud-sync] push failed', e)
        })
    }

    function debounced() {
      clearTimeout(timer)
      timer = setTimeout(push, 1600)
    }

    var orig = localStorage.setItem.bind(localStorage)
    localStorage.setItem = function (k, v) {
      orig(k, v)
      if (!applying && auth.currentUser && matches(k)) debounced()
    }
    window.__cloudSyncPushNow = push

    function pull() {
      var u = auth.currentUser
      if (!u) return
      db.collection('users')
        .doc(u.uid)
        .get()
        .then(function (snap) {
          var cloud = snap.exists ? (snap.data() || {})[FIELD] : null
          var local = meta()
          var hasLocal = Object.keys(collect()).length > 0
          if (cloud && cloud.entries && cloud.updatedAt > local.updatedAt + 1500) {
            applying = true
            Object.keys(cloud.entries).forEach(function (k) {
              try {
                orig(k, cloud.entries[k])
              } catch (_) {}
            })
            setMeta({ updatedAt: cloud.updatedAt })
            location.reload()
          } else if (hasLocal && (!cloud || !cloud.updatedAt || local.updatedAt >= cloud.updatedAt)) {
            push()
          } else {
            state('on', u)
          }
        })
        .catch(function (e) {
          state('err')
          console.warn('[cloud-sync] pull failed', e)
          alert(
            'הסנכרון נכשל בקריאת הענן. ייתכן שחוקי Firestore חוסמים - ספר לי ואתקן. (' +
              (e && e.code ? e.code : e) +
              ')',
          )
        })
    }

    auth.onAuthStateChanged(function (u) {
      if (u) {
        state('on', u)
        pull()
      } else {
        state('off')
      }
    })

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && auth.currentUser) pull()
    })

    btn.addEventListener('click', function () {
      if (auth.currentUser) {
        if (confirm('להתנתק מסנכרון הענן? הנתונים המקומיים יישארו.')) {
          auth.signOut()
        }
        return
      }
      var p = new fb.auth.GoogleAuthProvider()
      auth.signInWithPopup(p).catch(function (e) {
        if (e && (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment')) {
          auth.signInWithRedirect(p)
        } else if (e && e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
          alert('ההתחברות נכשלה: ' + (e && e.code ? e.code : e))
        }
      })
    })
  }
})()
