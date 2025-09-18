import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(redirectTo, { replace: true })
    })
  }, [])

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else navigate(redirectTo, { replace: true })
  }

  const signUp = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else alert('Compte créé. Vérifie ton email si la confirmation est requise.')
  }

  const magic = async () => {
    if (!email) return
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)
    if (error) setError(error.message)
    else alert('Lien magique envoyé à ton email.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[color:var(--surface)]">
      <div className="card w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold">Connexion</h1>
        <p className="text-neutral-400 mt-1">Ton bloc-notes privé, pro, simple.</p>
        <form onSubmit={signIn} className="mt-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="tu@exemple.com" />
          </div>
          <div>
            <label className="label">Mot de passe</label>
            <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <div className="flex gap-2">
            <button disabled={loading} className="btn btn-primary flex-1">{loading ? '…' : 'Se connecter'}</button>
            <button onClick={signUp} type="button" className="btn btn-ghost">Créer</button>
          </div>
        </form>
        <div className="mt-4">
          <button onClick={magic} className="text-sm text-brand-400 hover:text-brand-300">Recevoir un lien magique</button>
        </div>
      </div>
    </div>
  )
         }
