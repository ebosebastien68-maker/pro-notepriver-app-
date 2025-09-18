import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Auth from './pages/Auth'
import Notes from './pages/Notes'
import Note from './pages/Note'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function Guard({ children }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const loc = useLocation()

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }
    const { data: sub } = supabase.auth.onAuthStateChange((_ev, session) => setSession(session))
    init()
    return () => sub.subscription.unsubscribe()
  }, [])

  if (loading) return <div className="p-8">Chargement…</div>
  if (!session) return <Navigate to="/auth" state={{ from: loc.pathname }} replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <Guard>
            <Notes />
          </Guard>
        }
      />
      <Route
        path="/note/:id"
        element={
          <Guard>
            <Note />
          </Guard>
        }
      />
      <Route
        path="/profile"
        element={
          <Guard>
            <Profile />
          </Guard>
        }
      />
      <Route
        path="/settings"
        element={
          <Guard>
            <Settings />
          </Guard>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
