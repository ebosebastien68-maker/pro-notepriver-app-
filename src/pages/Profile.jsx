import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { supabase } from '../lib/supabase'

export default function Profile() {
  const [profile, setProfile] = useState({ full_name: 'EBO SÉBASTIEN', avatar_url: '' })
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setEmail(user?.email || '')
      // upsert profil si absent
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
      if (!data) {
        await supabase.from('profiles').insert({ id: user.id, full_name: 'EBO SÉBASTIEN', avatar_url: '' })
        setProfile({ full_name: 'EBO SÉBASTIEN', avatar_url: '' })
      } else {
        setProfile({ full_name: data.full_name || 'EBO SÉBASTIEN', avatar_url: data.avatar_url || '' })
      }
      setLoading(false)
    }
    init()
  }, [])

  const save = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('profiles').upsert({ id: user.id, ...profile })
    alert('Profil mis à jour')
  }

  if (loading) return <div className="min-h-screen"><Header /><div className="p-6">Chargement…</div></div>

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl p-4 md:p-6">
        <div className="card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Profil</h2>
          <div>
            <div className="label">Email</div>
            <div className="input bg-neutral-900/60">{email}</div>
          </div>
          <div>
            <label className="label">Nom complet</label>
            <input className="input" value={profile.full_name} onChange={(e)=>setProfile(p=>({ ...p, full_name: e.target.value }))} />
          </div>
          <div>
            <label className="label">Avatar URL (optionnel)</label>
            <input className="input" value={profile.avatar_url} onChange={(e)=>setProfile(p=>({ ...p, avatar_url: e.target.value }))} />
          </div>
          <div className="flex justify-end">
            <button onClick={save} className="btn btn-primary">Enregistrer</button>
          </div>
        </div>
      </main>
    </div>
  )
          }
