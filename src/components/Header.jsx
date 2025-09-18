import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Settings, User } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const appName = import.meta.env.VITE_APP_NAME || 'Pro Notes'

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--border)] bg-[color:var(--surface)]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-neutral-100">
          {appName}
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/profile" className={`btn btn-ghost ${pathname === '/profile' ? 'bg-neutral-800' : ''}`}>
            <User className="h-4 w-4 mr-2" /> Profil
          </Link>
          <Link to="/settings" className={`btn btn-ghost ${pathname === '/settings' ? 'bg-neutral-800' : ''}`}>
            <Settings className="h-4 w-4 mr-2" /> Réglages
          </Link>
          <button onClick={logout} className="btn btn-ghost">
            <LogOut className="h-4 w-4 mr-2" /> Déconnexion
          </button>
        </nav>
      </div>
    </header>
  )
}
