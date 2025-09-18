import { useState } from 'react'
import { X } from 'lucide-react'

export default function TagInput({ value = [], onChange }) {
  const [input, setInput] = useState('')
  const add = () => {
    const t = input.trim()
    if (!t) return
    const next = Array.from(new Set([...(value||[]), t]))
    onChange(next)
    setInput('')
  }
  const remove = (t) => onChange((value||[]).filter(x => x !== t))

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {(value||[]).map(t => (
          <span key={t} className="inline-flex items-center gap-1 bg-neutral-800 px-2 py-1 rounded-lg text-sm">
            {t}
            <button onClick={()=>remove(t)} className="hover:text-red-400"><X className="h-3 w-3" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="Ajouter un tag et appuyer Entrée"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=>{ if (e.key==='Enter'){ e.preventDefault(); add() }}}
        />
        <button type="button" onClick={add} className="btn btn-ghost">Ajouter</button>
      </div>
    </div>
  )
      }
