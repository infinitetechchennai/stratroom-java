import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { forgotPasswordApi, fetchLoginTheme } from '../../api/authApi'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotStatus, setForgotStatus] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [loginBg, setLoginBg] = useState(null)
  const [loginLogo, setLoginLogo] = useState(null)

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email')
    const savedRemember = localStorage.getItem('saved_remember')
    if (savedRemember === 'true' && savedEmail) {
      setForm((f) => ({ ...f, email: savedEmail, remember: true }))
    }
  }, [])

  useEffect(() => {
    fetchLoginTheme()
      .then((theme) => {
        if (theme && theme.loginLogo && theme.loginLogo !== 'true') {
          setLoginBg(theme.loginLogo)
        }
        if (theme && theme.loginTheme) {
          setLoginLogo(theme.loginTheme)
        }
      })
      .catch(() => {})
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

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      navigate('/home', { replace: true })
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

  const handleForgotSubmit = async (e) => {
    e.preventDefault()
    if (!forgotEmail.trim()) { setForgotStatus('error:Please enter your email address.'); return }
    setForgotLoading(true)
    setForgotStatus('')
    try {
      const data = await forgotPasswordApi(forgotEmail)
      if (data.result) {
        setForgotStatus('success:' + data.result)
      } else {
        setForgotStatus('success:A password reset link has been sent to your email.')
      }
    } catch (err) {
      if (err.response?.data) {
        const respData = err.response.data
        if (respData.exception) {
          setForgotStatus('error:' + respData.exception)
        } else if (respData.error) {
          setForgotStatus('error:' + respData.error)
        } else {
          setForgotStatus('error:Could not send reset email. Please check the address and try again.')
        }
      } else {
        setForgotStatus('error:Network error. Please try again.')
      }
    } finally {
      setForgotLoading(false)
    }
  }

  const leftStyle = loginBg
    ? { backgroundImage: `url(${loginBg})` }
    : undefined

  return (
    <div className={styles.wrap}>
      {/* Left panel — brand */}
      <div className={styles.leftPanel} style={leftStyle}>
        <div className={styles.leftInner}>
          <div className={styles.brandCard}>
            <p className={styles.brandSub}>Welcome to your Integrated</p>
            <h1 className={styles.brandTitle}>Multi-Governance</h1>
            <h2 className={styles.brandAccent}>Gateway</h2>
            <div className={styles.poweredBy}>
              <span>Powered by</span>
              <div className={styles.logo}>
                {loginLogo
                  ? <img src={loginLogo} alt="StratRoom" style={{ width: '100%' }} />
                  : <StratroomLogo />
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.formCard}>
            <div className={styles.cardHead}>
              <h4>Login</h4>
              <p>To your command centre for Peak Performance</p>
            </div>

            {serverError && (
              <div className={styles.errorBanner} role="alert">
                <span className={styles.errorIcon}>&#9888;</span>
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.fieldGroup}>
                <div className={`${styles.floatingField} ${errors.email ? styles.hasError : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder=" "
                    autoComplete="email"
                    disabled={loading}
                  />
                  <label htmlFor="email">Email address</label>
                  {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                </div>

                <div className={`${styles.floatingField} ${styles.passwordField} ${errors.password ? styles.hasError : ''}`}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder=" "
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <label htmlFor="password">Password</label>
                  <button
                    type="button"
                    className={styles.eyeToggle}
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                  {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
                </div>
              </div>

              <div className={styles.optionsRow}>
                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span>Save Password</span>
                </label>
                <button type="button" className={styles.forgotLink} onClick={() => setShowForgot(true)}>
                  Forgot password?
                </button>
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={styles.loginBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    'Continue'
                  )}
                </button>

                <div className={styles.orDivider}><span>OR</span></div>

                <button type="button" className={styles.ssoBtn} disabled={loading}>
                  Sign in with SSO
                </button>
              </div>
            </form>

            <div className={styles.cardFooter}>
              <p>&copy; {new Date().getFullYear()} <strong>StratRoom</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot password modal */}
      {showForgot && (
        <div className={styles.modalBackdrop} onClick={() => { setShowForgot(false); setForgotStatus(''); setForgotEmail('') }}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h4>Forgot Password</h4>
              <button className={styles.modalClose} onClick={() => { setShowForgot(false); setForgotStatus(''); setForgotEmail('') }}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {forgotStatus.startsWith('success:') ? (
                <p className={styles.successMsg}>{forgotStatus.replace('success:', '')}</p>
              ) : (
                <form onSubmit={handleForgotSubmit}>
                  <div className={styles.floatingField}>
                    <input
                      type="email"
                      id="forgotEmail"
                      value={forgotEmail}
                      onChange={(e) => { setForgotEmail(e.target.value); setForgotStatus('') }}
                      placeholder=" "
                      autoComplete="off"
                    />
                    <label htmlFor="forgotEmail">Enter E-mail</label>
                  </div>
                  {forgotStatus.startsWith('error:') && (
                    <p className={styles.errorMsg}>{forgotStatus.replace('error:', '')}</p>
                  )}
                  <button
                    type="submit"
                    className={styles.loginBtn}
                    disabled={forgotLoading}
                    style={{ marginTop: '16px' }}
                  >
                    {forgotLoading ? <span className={styles.spinner} /> : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function StratroomLogo() {
  return (
    <svg viewBox="0 0 180 35" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="StratRoom">
      <text x="0" y="26" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="22" fill="white" letterSpacing="1">
        StratRoom
      </text>
    </svg>
  )
}
