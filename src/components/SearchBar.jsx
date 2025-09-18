import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    setQ(params.get('q') || '')
  }, [params])

  const submit = (e) => {
    e.preventDefault()
    const p = new URLSearchParams(params)
    if (q) p.set('q', q); else p.delete('q')
    navigate(`/?${p.toString()}`)
  }

  const clear = () => {
    setQ('')
    const p = new URLSearchParams(params)
    p.delete('q')
    navigate(`/?${p.toString()}`)
  }

  return (
    <form onSubmit={submit} className="relative flex-1">
      <input
        className="input pl-10"
        placeholder="Rechercher par mots-clés, tag, code…"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
      {q && (
        <button type="button" onClick={clear} className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-200">
          <X className="h-5 w-5" />
        </button>
      )}
    </form>
  )
}
