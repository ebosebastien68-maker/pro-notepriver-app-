import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import NoteCard from '../components/NoteCard'
import { supabase } from '../lib/supabase'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { since } from '../utils/format'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const fetchNotes = async () => {
    setLoading(true)
    const fav = params.get('fav') === '1'
    const q = params.get('q') || ''
    let data = []
    if (q) {
      const { data: d, error } = await supabase.rpc('search_notes', { q })
      if (!error) data = d || []
    } else {
      let query = supabase.from('notes').select('*').order('favorite', { ascending: false }).order('updated_at', { ascending: false })
      if (fav) query = query.eq('favorite', true)
      const { data: d, error } = await query.limit(200)
      if (!error) data = d || []
    }
    setNotes(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchNotes()
    // live updates sur les notes de l'utilisateur
    const channel = supabase
      .channel('notes-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notes' }, fetchNotes)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [params.toString()])

  const createNote = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase.from('notes').insert({
      user_id: user.id,
      title: 'Nouvelle note',
      content: '',
      code: '',
      tags: []
    }).select().single()
    if (!error) navigate(`/note/${data.id}`)
  }

  const toggleFav = async (note) => {
    await supabase.from('notes').update({ favorite: !note.favorite }).eq('id', note.id)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[16rem_1fr]">
        <Sidebar onNew={createNote} />
        <main className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <SearchBar />
            <button onClick={createNote} className="btn btn-primary">Nouvelle note</button>
          </div>
          {loading ? (
            <div>Chargement…</div>
          ) : notes.length === 0 ? (
            <div className="text-neutral-400">Aucune note. Crée ta première note.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {notes.map(n => (
                <NoteCard key={n.id} note={n} onToggleFav={toggleFav} />
              ))}
            </div>
          )}
          {!loading && notes.length > 0 && (
            <div className="mt-6 text-xs text-neutral-500">Dernière mise à jour {since(notes[0]?.updated_at)}</div>
          )}
        </main>
      </div>
    </div>
  )
}
