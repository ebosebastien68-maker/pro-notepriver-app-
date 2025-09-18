import { Link, useLocation } from 'react-router-dom'
import { PlusCircle, Star, Home } from 'lucide-react'

export default function Sidebar({ onNew }) {
  const { pathname } = useLocation()
  return (
    <aside className="hidden md:block w-64 border-r border-[color:var(--border)] bg-[color:var(--surface-2)]">
      <div className="p-4">
        <button onClick={onNew} className="btn btn-primary w-full">
          <PlusCircle className="h-4 w-4 mr-2" /> Nouvelle note
        </button>
      </div>
      <nav className="px-2">
        <Link to="/" className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-800 ${pathname==='/'?'bg-neutral-800':''}`}>
          <Home className="h-4 w-4" /> Toutes les notes
        </Link>
        <Link to="/?fav=1" className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-800 ${pathname==='/' && location.search.includes('fav=1')?'bg-neutral-800':''}`}>
          <Star className="h-4 w-4" /> Favoris
        </Link>
      </nav>
    </aside>
  )
}
