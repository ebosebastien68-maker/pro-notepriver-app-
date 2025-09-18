import { useState } from 'react'

export default function Editor({ title, content, code, onChange }) {
  const [tab, setTab] = useState('content')

  const change = (field, val) => {
    onChange({ title, content, code, [field]: val })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Titre</label>
        <input
          className="input"
          placeholder="Titre de la note"
          value={title}
          onChange={(e)=>change('title', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <button type="button" className={`btn btn-ghost ${tab==='content'?'bg-neutral-800':''}`} onClick={()=>setTab('content')}>Texte</button>
        <button type="button" className={`btn btn-ghost ${tab==='code'?'bg-neutral-800':''}`} onClick={()=>setTab('code')}>Code</button>
      </div>

      {tab === 'content' ? (
        <textarea
          className="input min-h-[220px]"
          placeholder="Ton texte…"
          value={content}
          onChange={(e)=>change('content', e.target.value)}
        />
      ) : (
        <textarea
          className="input min-h-[220px] font-mono text-sm"
          placeholder="// Colle/écris ton code ici"
          value={code}
          onChange={(e)=>change('code', e.target.value)}
        />
      )}
    </div>
  )
}
