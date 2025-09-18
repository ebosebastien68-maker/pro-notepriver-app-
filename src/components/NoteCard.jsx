import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { since } from '../utils/format'
import classNames from 'classnames'

export default function NoteCard({ note, onToggleFav }) {
  return (
    <div className="card p-4 hover:border-brand-700 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <Link to={`/note/${note.id}`} className="font-semibold text-neutral-100 line-clamp-1">
          {note.title || '(Sans titre)'}
        </Link>
        <button onClick={()=>onToggleFav(note)} className={classNames('text-neutral-400 hover:text-yellow-400', note.favorite && 'text-yellow-400')}>
          <Star className="h-5 w-5" fill={note.favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <p className="mt-2 text-sm text-neutral-300 line-clamp-2">{note.content}</p>
      {note.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map(t => <span key={t} className="text-xs bg-neutral-800 px-2 py-1 rounded">{t}</span>)}
        </div>
      )}
      <div className="mt-3 text-xs text-neutral-400">Modifiée {since(note.updated_at)}</div>
    </div>
  )
}
