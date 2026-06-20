// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import { forgotPasswordApi, fetchLoginTheme } from '../../api/authApi'
// import logoWhite from '../../assets/login/logo-w.svg'
// import styles from './LoginPage.module.css'

// export default function LoginPage() {
//   const navigate = useNavigate()
//   const { login } = useAuth()

//   const [form, setForm] = useState({ email: '', password: '', remember: false })
//   const [errors, setErrors] = useState({})
//   const [serverError, setServerError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showForgot, setShowForgot] = useState(false)
//   const [forgotEmail, setForgotEmail] = useState('')
//   const [forgotStatus, setForgotStatus] = useState('')
//   const [forgotLoading, setForgotLoading] = useState(false)
//   const [loginBg, setLoginBg] = useState(null)
//   const [loginLogo, setLoginLogo] = useState(null)

//   useEffect(() => {
//     const savedEmail = localStorage.getItem('saved_email')
//     const savedRemember = localStorage.getItem('saved_remember')
//     if (savedRemember === 'true' && savedEmail) {
//       setForm((f) => ({ ...f, email: savedEmail, remember: true }))
//     }
//   }, [])

//   useEffect(() => {
//     fetchLoginTheme()
//       .then((theme) => {
//         if (theme && theme.loginLogo && theme.loginLogo !== 'true') {
//           setLoginBg(theme.loginLogo)
//         }
//         if (theme && theme.loginTheme) {
//           setLoginLogo(theme.loginTheme)
//         }
//       })
//       .catch(() => { })
//   }, [])

//   const validate = () => {
//     const errs = {}
//     if (!form.email.trim()) errs.email = 'Email is required'
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
//     if (!form.password) errs.password = 'Password is required'
//     return errs
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
//     setServerError('')
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const errs = validate()
//     if (Object.keys(errs).length) { setErrors(errs); return }

//     setLoading(true)
//     setServerError('')
//     try {
//       if (form.remember) {
//         localStorage.setItem('saved_email', form.email)
//         localStorage.setItem('saved_remember', 'true')
//       } else {
//         localStorage.removeItem('saved_email')
//         localStorage.removeItem('saved_remember')
//       }
//       await login(form.email, form.password)
//       navigate('/landing', { replace: true })
//     } catch (err) {
//       if (err.response) {
//         const data = err.response.data
//         if (data?.exception) {
//           setServerError(data.exception)
//         } else if (data?.error) {
//           setServerError(data.error)
//         } else {
//           setServerError(err.message || 'Login failed. Please try again.')
//         }
//       } else if (err.message) {
//         setServerError(err.message)
//       } else {
//         setServerError('Network error. Please check your connection and try again.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleForgotSubmit = async (e) => {
//     e.preventDefault()
//     if (!forgotEmail.trim()) { setForgotStatus('error:Please enter your email address.'); return }
//     setForgotLoading(true)
//     setForgotStatus('')
//     try {
//       const data = await forgotPasswordApi(forgotEmail)
//       if (data.result) {
//         setForgotStatus('success:' + data.result)
//       } else {
//         setForgotStatus('success:A password reset link has been sent to your email.')
//       }
//     } catch (err) {
//       if (err.response?.data) {
//         const respData = err.response.data
//         if (respData.exception) {
//           setForgotStatus('error:' + respData.exception)
//         } else if (respData.error) {
//           setForgotStatus('error:' + respData.error)
//         } else {
//           setForgotStatus('error:Could not send reset email. Please check the address and try again.')
//         }
//       } else {
//         setForgotStatus('error:Network error. Please try again.')
//       }
//     } finally {
//       setForgotLoading(false)
//     }
//   }

//   const innerStyle = loginBg
//     ? { backgroundImage: `url(${loginBg})` }
//     : undefined

//   return (
//     <div className={styles.wrap}>
//       {/* Left panel — brand (login-content) */}
//       <div className={styles.leftPanel}>
//         <div className={styles.leftInner} style={innerStyle}>
//           <div className={styles.brandCard}>
//             <h4 className={styles.brandSub}>Welcome to your Integrated</h4>
//             <h1 className={styles.brandTitle}>Multi-Governance</h1>
//             <h2 className={styles.brandAccent}>Gateway</h2>
//             <div className={styles.poweredBy}>
//               <span>Powered by</span>
//               <div className={styles.logo}>
//                 <img src={loginLogo || logoWhite} alt="StratRoom" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right panel — login form (login-box) */}
//       <div className={styles.rightPanel}>
//         <div className={styles.formWrapper}>
//           <div className={styles.formCard}>
//             <div className={styles.cardHead}>
//               <h4>Login</h4>
//               <p>To your command centre for Peak Performance</p>
//             </div>

//             {serverError && (
//               <div className={styles.errorBanner} role="alert">
//                 <span className={styles.errorIcon}>&#9888;</span>
//                 {serverError}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} noValidate>
//               <div className={styles.fieldGroup}>
//                 <div className={`${styles.floatingField} ${errors.email ? styles.hasError : ''}`}>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder=" "
//                     autoComplete="email"
//                     disabled={loading}
//                   />
//                   <label htmlFor="email">Email address</label>
//                   {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
//                 </div>

//                 <div className={`${styles.floatingField} ${styles.passwordField} ${errors.password ? styles.hasError : ''}`}>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder=" "
//                     autoComplete="current-password"
//                     disabled={loading}
//                   />
//                   <label htmlFor="password">Password</label>
//                   <button
//                     type="button"
//                     className={styles.eyeToggle}
//                     onClick={() => setShowPassword((v) => !v)}
//                     tabIndex={-1}
//                     aria-label={showPassword ? 'Hide password' : 'Show password'}
//                   >
//                     {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                   </button>
//                   {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
//                 </div>
//               </div>

//               <div className={styles.optionsRow}>
//                 <label className={styles.checkLabel}>
//                   <input
//                     type="checkbox"
//                     name="remember"
//                     checked={form.remember}
//                     onChange={handleChange}
//                     disabled={loading}
//                   />
//                   <span>Save Password</span>
//                 </label>
//               </div>

//               <p className={styles.forgotRow}>
//                 Did you{' '}
//                 <button type="button" className={styles.forgotLink} onClick={() => setShowForgot(true)}>
//                   forget your password?
//                 </button>
//               </p>

//               <div className={styles.actions}>
//                 <button
//                   type="submit"
//                   className={styles.loginBtn}
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <span className={styles.spinner} />
//                   ) : (
//                     'Continue'
//                   )}
//                 </button>

//                 <p className={styles.orDivider}>OR</p>

//                 <button type="button" className={styles.ssoBtn} disabled={loading}>
//                   Sign in with SSO
//                 </button>
//               </div>
//             </form>

//             <div className={styles.cardFooter}>
//               <p>&copy; {new Date().getFullYear()} <strong>StratRoom</strong></p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Forgot password modal */}
//       {showForgot && (
//         <div className={styles.modalBackdrop} onClick={() => { setShowForgot(false); setForgotStatus(''); setForgotEmail('') }}>
//           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <div className={styles.modalHeader}>
//               <h4>Forgot Password</h4>
//               <button className={styles.modalClose} onClick={() => { setShowForgot(false); setForgotStatus(''); setForgotEmail('') }}>
//                 &times;
//               </button>
//             </div>
//             <div className={styles.modalBody}>
//               {forgotStatus.startsWith('success:') ? (
//                 <p className={styles.successMsg}>{forgotStatus.replace('success:', '')}</p>
//               ) : (
//                 <form onSubmit={handleForgotSubmit}>
//                   <div className={styles.floatingField}>
//                     <input
//                       type="email"
//                       id="forgotEmail"
//                       value={forgotEmail}
//                       onChange={(e) => { setForgotEmail(e.target.value); setForgotStatus('') }}
//                       placeholder=" "
//                       autoComplete="off"
//                     />
//                     <label htmlFor="forgotEmail">Enter E-mail</label>
//                   </div>
//                   {forgotStatus.startsWith('error:') && (
//                     <p className={styles.errorMsg}>{forgotStatus.replace('error:', '')}</p>
//                   )}
//                   <button
//                     type="submit"
//                     className={styles.loginBtn}
//                     disabled={forgotLoading}
//                     style={{ marginTop: '16px' }}
//                   >
//                     {forgotLoading ? <span className={styles.spinner} /> : 'Submit'}
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// function EyeIcon() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   )
// }

// function EyeOffIcon() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//       <line x1="1" y1="1" x2="23" y2="23" />
//     </svg>
//   )
// }






import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { forgotPasswordApi } from '../../api/authApi'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const canvasRef = useRef(null)

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email')
    const savedRemember = localStorage.getItem('saved_remember')
    if (savedRemember === 'true' && savedEmail) {
      setForm((f) => ({ ...f, email: savedEmail, remember: true }))
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W, H, rafId
    const GOLD = 'rgba(212,160,23,'
    const AMBER = 'rgba(245,158,11,'
    const WARM = 'rgba(251,191,36,'
    const DRIFT = 38

    const CONFIGS = [
      { type: 'ring', r: 55, lw: 1.2, col: GOLD, alpha: .08, x: .12, y: .18, vx: .12, vy: .08, phase: 0 },
      { type: 'ring', r: 38, lw: 1, col: AMBER, alpha: .07, x: .78, y: .72, vx: -.1, vy: .12, phase: 1.2 },
      { type: 'ring', r: 70, lw: .9, col: WARM, alpha: .06, x: .55, y: .85, vx: .09, vy: -.09, phase: 2.4 },
      { type: 'ring', r: 28, lw: 1.1, col: GOLD, alpha: .09, x: .9, y: .2, vx: -.13, vy: .1, phase: 0.7 },
      { type: 'ring', r: 44, lw: .8, col: AMBER, alpha: .06, x: .3, y: .92, vx: .11, vy: -.08, phase: 3.1 },
      { type: 'dring', r: 32, lw: .9, col: GOLD, alpha: .07, x: .07, y: .6, vx: .1, vy: .11, phase: 1.5 },
      { type: 'dring', r: 48, lw: .8, col: WARM, alpha: .05, x: .65, y: .1, vx: -.09, vy: .09, phase: 0.3 },
      { type: 'arc', r: 42, lw: 1.2, col: GOLD, alpha: .09, x: .22, y: .45, vx: .09, vy: .13, phase: 2.0, a0: .4, a1: 2.2 },
      { type: 'arc', r: 30, lw: 1, col: AMBER, alpha: .08, x: .82, y: .48, vx: -.1, vy: -.09, phase: 1.1, a0: 1.0, a1: 3.5 },
      { type: 'arc', r: 60, lw: .8, col: WARM, alpha: .05, x: .42, y: .05, vx: .07, vy: .1, phase: 3.3, a0: .2, a1: 1.8 },
      { type: 'arc', r: 24, lw: 1.1, col: GOLD, alpha: .09, x: .92, y: .55, vx: -.08, vy: .12, phase: 0.9, a0: 2.5, a1: 5.0 },
      { type: 'diamond', s: 12, lw: 1, col: GOLD, alpha: .1, x: .18, y: .78, vx: .13, vy: -.1, phase: 1.8 },
      { type: 'diamond', s: 8, lw: .9, col: AMBER, alpha: .09, x: .7, y: .3, vx: -.1, vy: .1, phase: 0.5 },
      { type: 'diamond', s: 10, lw: 1, col: WARM, alpha: .08, x: .48, y: .65, vx: .08, vy: .12, phase: 2.7 },
      { type: 'diamond', s: 7, lw: .8, col: GOLD, alpha: .1, x: .05, y: .35, vx: .12, vy: -.09, phase: 1.2 },
      { type: 'diamond', s: 14, lw: .9, col: AMBER, alpha: .07, x: .88, y: .88, vx: -.09, vy: -.1, phase: 3.5 },
      { type: 'dotring', r: 36, lw: 1.2, col: GOLD, alpha: .08, x: .35, y: .2, vx: .1, vy: .09, phase: 0.6 },
      { type: 'dotring', r: 50, lw: 1, col: AMBER, alpha: .06, x: .6, y: .55, vx: -.08, vy: .11, phase: 2.2 },
      { type: 'dotring', r: 22, lw: 1.1, col: WARM, alpha: .09, x: .15, y: .95, vx: .11, vy: -.1, phase: 1.4 },
      { type: 'cross', s: 10, lw: 1, col: GOLD, alpha: .1, x: .52, y: .38, vx: .09, vy: .1, phase: 0.2 },
      { type: 'cross', s: 7, lw: .9, col: AMBER, alpha: .09, x: .25, y: .12, vx: -.1, vy: .09, phase: 2.9 },
      { type: 'cross', s: 12, lw: .8, col: WARM, alpha: .07, x: .75, y: .92, vx: .1, vy: -.08, phase: 1.7 },
    ]

    function mkFloaters() {
      return CONFIGS.map(c => ({
        ...c,
        cx: c.x * W, cy: c.y * H,
        ox: c.x * W, oy: c.y * H,
        t: c.phase * 60,
        rot: Math.random() * Math.PI * 2,
        rspeed: (Math.random() - .5) * .003,
      }))
    }

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    function drawFloater(f) {
      ctx.save()
      ctx.translate(f.cx, f.cy)
      ctx.rotate(f.rot)
      const col = f.col + f.alpha + ')'
      switch (f.type) {
        case 'ring':
          ctx.beginPath()
          ctx.arc(0, 0, f.r, 0, Math.PI * 2)
          ctx.strokeStyle = col
          ctx.lineWidth = f.lw
          ctx.stroke()
          break
        case 'dring':
          [f.r, f.r * 1.45].forEach(r => {
            ctx.beginPath()
            ctx.arc(0, 0, r, 0, Math.PI * 2)
            ctx.strokeStyle = f.col + (f.alpha * .8) + ')'
            ctx.lineWidth = f.lw
            ctx.stroke()
          })
          break
        case 'arc':
          ctx.beginPath()
          ctx.arc(0, 0, f.r, f.a0, f.a1)
          ctx.strokeStyle = col
          ctx.lineWidth = f.lw
          ctx.stroke()
          break
        case 'dotring':
          ctx.beginPath()
          ctx.arc(0, 0, f.r, 0, Math.PI * 2)
          ctx.strokeStyle = col
          ctx.lineWidth = f.lw
          ctx.setLineDash([3, 5])
          ctx.stroke()
          ctx.setLineDash([])
          break
        case 'diamond':
          ctx.beginPath()
          ctx.moveTo(0, -f.s)
          ctx.lineTo(f.s * .6, 0)
          ctx.lineTo(0, f.s)
          ctx.lineTo(-f.s * .6, 0)
          ctx.closePath()
          ctx.strokeStyle = col
          ctx.lineWidth = f.lw
          ctx.stroke()
          break
        case 'cross':
          ctx.strokeStyle = col
          ctx.lineWidth = f.lw
          ctx.beginPath()
          ctx.moveTo(-f.s, 0)
          ctx.lineTo(f.s, 0)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(0, -f.s)
          ctx.lineTo(0, f.s)
          ctx.stroke()
          break
        default:
          break
      }
      ctx.restore()
    }

    resize()
    let floaters = mkFloaters()

    function onResize() {
      resize()
      floaters = mkFloaters()
    }

    window.addEventListener('resize', onResize)

    function tick() {
      ctx.clearRect(0, 0, W, H)
      floaters.forEach(f => {
        f.t += .4
        f.cx = f.ox + Math.sin(f.t * f.vx * .05 + f.phase) * DRIFT
        f.cy = f.oy + Math.cos(f.t * f.vy * .05 + f.phase) * DRIFT
        f.rot += f.rspeed
        drawFloater(f)
      })
      rafId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Password is required'
    return errs
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerError('')
  }

  const handleLogin = async (e) => {
    if (e) e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setServerError('')
    try {
      if (form.remember) {
        localStorage.setItem('saved_email', form.email)
        localStorage.setItem('saved_remember', 'true')
      } else {
        localStorage.removeItem('saved_email')
        localStorage.removeItem('saved_remember')
      }
      await login(form.email, form.password)
      navigate('/landing', { replace: true })
    } catch (err) {
      if (err.response) {
        const data = err.response.data
        if (data?.exception) {
          setServerError(data.exception)
        } else if (data?.error) {
          setServerError(data.error)
        } else {
          setServerError(err.message || 'Login failed. Please try again.')
        }
      } else if (err.message) {
        setServerError(err.message)
      } else {
        setServerError('Network error. Please check your connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrap}>
        <div className={styles.pageGrid}></div>
        <div className={styles.floaters}>
          <canvas ref={canvasRef} className={styles.floaterCanvas}></canvas>
        </div>

        <div className={styles.left}>
          <div className={styles.leftContent}>
            <div className={styles.logo}>
              <img className={styles.logoImg} src="https://www.stratroom.io/assets/images/logo.svg" alt="StratRoom" />
            </div>

            <div className={styles.eyebrow}>
              <div className={styles.eyebrowRule}></div>
              <span className={styles.eyebrowText}>CONNECTED GOVERNANCE PLATFORM</span>
            </div>

            <h1 className={styles.headline}>
              From Silos to<br />
              <em className={styles.headlineEm}>Synergy</em>
            </h1>

            <p className={styles.subCopy}>
              Redefining Governance towards a New World — one integrated, intelligent platform.
            </p>

            <div className={styles.diagram}>
              <svg className={styles.gwCanvas} viewBox="0 0 380 370" preserveAspectRatio="xMidYMid meet">
                <line className={styles.animLine} x1="190" y1="32" x2="190" y2="139" stroke="#00C4C4" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '0s' }}></line>
                <line className={styles.animLine} x1="41" y1="82" x2="144" y2="162" stroke="#E91E8C" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '.2s' }}></line>
                <line className={styles.animLine} x1="339" y1="82" x2="236" y2="162" stroke="#F59E0B" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '.4s' }}></line>
                <line className={styles.animLine} x1="41" y1="142" x2="144" y2="174" stroke="#10B981" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '.6s' }}></line>
                <line className={styles.animLine} x1="339" y1="142" x2="236" y2="174" stroke="#3B82F6" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '.8s' }}></line>
                <line className={styles.animLine} x1="41" y1="201" x2="144" y2="185" stroke="#7C3AED" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '1s' }}></line>
                <line className={styles.animLine} x1="339" y1="201" x2="236" y2="185" stroke="#F43F5E" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '1.2s' }}></line>
                <line className={styles.animLine} x1="41" y1="262" x2="144" y2="208" stroke="#FF6B35" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '1.4s' }}></line>
                <line className={styles.animLine} x1="339" y1="262" x2="236" y2="208" stroke="#06B6D4" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '1.6s' }}></line>
                <line className={styles.animLine} x1="190" y1="300" x2="190" y2="231" stroke="#10B981" strokeWidth="1.3" strokeDasharray="5 4" opacity=".5" style={{ animationDelay: '1.8s' }}></line>

                <circle r="2.6" fill="#00C4C4">
                  <animateMotion dur="2s" repeatCount="indefinite" begin=".3s">
                    <mpath href="#ps"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin=".3s"></animate>
                </circle>
                <path id="ps" d="M190,32 L190,139" fill="none"></path>

                <circle r="2.6" fill="#E91E8C">
                  <animateMotion dur="2.1s" repeatCount="indefinite" begin=".5s">
                    <mpath href="#pa"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.1s" repeatCount="indefinite" begin=".5s"></animate>
                </circle>
                <path id="pa" d="M41,82 L144,162" fill="none"></path>

                <circle r="2.6" fill="#F59E0B">
                  <animateMotion dur="2.1s" repeatCount="indefinite" begin=".9s">
                    <mpath href="#pp"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.1s" repeatCount="indefinite" begin=".9s"></animate>
                </circle>
                <path id="pp" d="M339,82 L236,162" fill="none"></path>

                <circle r="2.6" fill="#10B981">
                  <animateMotion dur="1.9s" repeatCount="indefinite" begin=".7s">
                    <mpath href="#pb"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="1.9s" repeatCount="indefinite" begin=".7s"></animate>
                </circle>
                <path id="pb" d="M41,142 L144,174" fill="none"></path>

                <circle r="2.6" fill="#3B82F6">
                  <animateMotion dur="1.9s" repeatCount="indefinite" begin="1.1s">
                    <mpath href="#ppr"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="1.9s" repeatCount="indefinite" begin="1.1s"></animate>
                </circle>
                <path id="ppr" d="M339,142 L236,174" fill="none"></path>

                <circle r="2.6" fill="#7C3AED">
                  <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.3s">
                    <mpath href="#pe"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" begin="1.3s"></animate>
                </circle>
                <path id="pe" d="M41,201 L144,185" fill="none"></path>

                <circle r="2.6" fill="#F43F5E">
                  <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.5s">
                    <mpath href="#pr"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" begin="1.5s"></animate>
                </circle>
                <path id="pr" d="M339,201 L236,185" fill="none"></path>

                <circle r="2.6" fill="#FF6B35">
                  <animateMotion dur="2.3s" repeatCount="indefinite" begin="1.7s">
                    <mpath href="#pin"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.3s" repeatCount="indefinite" begin="1.7s"></animate>
                </circle>
                <path id="pin" d="M41,262 L144,208" fill="none"></path>

                <circle r="2.6" fill="#06B6D4">
                  <animateMotion dur="2.3s" repeatCount="indefinite" begin="1.9s">
                    <mpath href="#pan"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.3s" repeatCount="indefinite" begin="1.9s"></animate>
                </circle>
                <path id="pan" d="M339,262 L236,208" fill="none"></path>

                <circle r="2.6" fill="#10B981">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
                    <mpath href="#pc"></mpath>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="1s"></animate>
                </circle>
                <path id="pc" d="M190,300 L190,231" fill="none"></path>
              </svg>

              <div className={styles.gwHubPulse}></div>

              <div className={styles.gwHub}>
                <svg viewBox="0 0 38 38" fill="none" style={{ width: '30px', height: '30px', flexShrink: 0 }}>
                  <polygon points="19,3 35,12 19,21 3,12" fill="#00C4C4" opacity=".9"></polygon>
                  <polygon points="3,12 19,21 19,35 3,26" fill="#E91E8C" opacity=".85"></polygon>
                  <polygon points="35,12 19,21 19,35 35,26" fill="#F59E0B" opacity=".82"></polygon>
                  <line x1="19" y1="21" x2="19" y2="35" stroke="white" strokeWidth=".8" opacity=".4"></line>
                  <line x1="19" y1="21" x2="3" y2="12" stroke="white" strokeWidth=".8" opacity=".32"></line>
                  <line x1="19" y1="21" x2="35" y2="12" stroke="white" strokeWidth=".8" opacity=".32"></line>
                </svg>
                <div className={styles.gwHubLabel}>UNIFIED<br />GATEWAY</div>
              </div>

              <div className={`${styles.gwNode} ${styles.nStrategy}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#00C4C4" strokeWidth="1.8">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className={styles.nodeName} style={{ color: '#007A7A' }}>Strategy</span>
              </div>

              <div className={`${styles.gwNode} ${styles.nAudit}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="1.8">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span className={styles.nodeName} style={{ color: '#9C0D5A' }}>Audit</span>
                <span className={styles.nodeSub}>&amp; Control</span>
              </div>

              <div className={`${styles.gwNode} ${styles.nPerf}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.8">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                <span className={styles.nodeName} style={{ color: '#92600A' }}>Performance</span>
                <span className={styles.nodeSub}>KPIs &amp; OKRs</span>
              </div>

              <div className={`${styles.gwNode} ${styles.nBudgets}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8">
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                  <line x1="7" y1="15" x2="10" y2="15"></line>
                  <line x1="14" y1="15" x2="17" y2="15"></line>
                </svg>
                <span className={styles.nodeName} style={{ color: '#065F46' }}>Budgets</span>
                <span className={styles.nodeSub}>Financials</span>
              </div>

              <div className={`${styles.gwNode} ${styles.nInitiatives}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                  <line x1="7" y1="9" x2="17" y2="9"></line>
                  <line x1="7" y1="13" x2="13" y2="13"></line>
                  <circle cx="17" cy="16" r="2.5"></circle>
                  <line x1="19" y1="18" x2="21" y2="20"></line>
                </svg>
                <span className={styles.nodeName} style={{ color: '#1D4ED8', fontSize: '7px' }}>Initiatives &amp;<br />Projects</span>
              </div>

              <div className={`${styles.gwNode} ${styles.nEsg}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span className={styles.nodeName} style={{ color: '#4C1D95' }}>ESG</span>
                <span className={styles.nodeSub}>Sustainability</span>
              </div>

              <div className={`${styles.gwNode} ${styles.nRisk}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="1.8">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span className={styles.nodeName} style={{ color: '#9F1239' }}>Risk</span>
                <span className={styles.nodeSub}>Monitoring</span>
              </div>

              <div className={`${styles.gwNode} ${styles.nIncident}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="1.8">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
                <span className={styles.nodeName} style={{ color: '#C4450F', fontSize: '7px' }}>Incident<br />Management</span>
              </div>

              <div className={`${styles.gwNode} ${styles.nAnalytics}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12l2 2 4-4"></path>
                  <path d="M12 6v2M12 16v2M6 12h2M16 12h2"></path>
                </svg>
                <span className={styles.nodeName} style={{ color: '#0369A1', fontSize: '7px' }}>Analytics<br />&amp; Insights</span>
              </div>

              <div className={`${styles.gwNode} ${styles.nCompliance}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span className={styles.nodeName} style={{ color: '#065F46' }}>Compliance</span>
                <span className={styles.nodeSub}>Reporting</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.rightInner}>
            <div className={styles.badgeRow}>
              <div className={styles.secureBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                SECURE LOGIN
              </div>
              <div className={styles.aiBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                  <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none"></circle>
                  <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none"></circle>
                </svg>
                AI Powered Platform
                <div className={styles.aiDots}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>

            <div className={styles.formTitle}>Command Centre<br />Access</div>
            <p className={styles.formSub}>Sign in to your unified governance platform</p>

            {serverError && (
              <div className={styles.serverError}>
                {serverError}
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="inp-email">Email address</label>
              <div className={`${styles.inputRow} ${errors.email ? styles.hasError : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  id="inp-email"
                  name="email"
                  type="email"
                  placeholder="name@organisation.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="inp-pwd">Password</label>
              <div className={`${styles.inputRow} ${errors.password ? styles.hasError : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  id="inp-pwd"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="··········"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <button
                  id="pwd-toggle"
                  className={`${styles.eyeBtn} ${showPassword ? styles.eyeActive : ''}`}
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {showPassword ? (
                      <g className="eye-open">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </g>
                    ) : (
                      <g className="eye-closed">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </g>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            <div className={styles.metaRow}>
              <label className={styles.checkLabel}>
                <input
                  id="save-pwd"
                  name="remember"
                  type="checkbox"
                  checked={form.remember}
                  onChange={handleChange}
                  disabled={loading}
                />
                Save password
              </label>
              <button className={styles.forgotLink} type="button">Forgot password?</button>
            </div>

            <button
              id="login-btn"
              className={styles.ctaBtn}
              type="button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? '✓  Signing you in…' : 'CONTINUE'}
            </button>

            <div className={styles.divider}>OR</div>

            <button className={styles.ssoBtn} type="button" disabled={loading}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                <rect x="3" y="14" width="7" height="7" rx="1"></rect>
              </svg>
              Continue with SSO
            </button>

            <div className={styles.copyright}>
              <a href="#">Privacy policy</a> &nbsp;·&nbsp; <a href="#">Terms of use</a>
              <br />© StratRoom 2026. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}