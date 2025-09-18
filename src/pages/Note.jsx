import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Editor from '../components/Editor'
import TagInput from '../components/TagInput'
import ConfirmDialog from '../components/ConfirmDialog'
import { supabase } from '../lib/supabase'
import { Save, Trash2, Star } from 'lucide-react'
import classNames from 'classnames'

export default function Note() {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(false)
  const navigate = useNavigate()

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('notes').select('*').eq('id', id).single()
    setNote(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [id])

  const save = async () => {
    const { id: noteId, ...fields } = note
    await supabase.from('notes').update(fields).eq('id', noteId)
  }

  const del = async () => {
    await supabase.from('notes').delete().eq('id', id)
    navigate('/')
  }

  if (loading) return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-4xl p-6">Chargement…</div>
    </div>
  )

  if (!note) return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-4xl p-6">Note introuvable.</div>
    </div>
  )

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-neutral-400">id: {id}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNote({ ...note, favorite: !note.favorite })}
              className={classNames('btn btn-ghost', note.favorite && 'text-yellow-400')}
              title="Basculer favori"
            >
              <Star className="h-4 w-4 mr-2" /> {note.favorite ? 'Favori' : 'Mettre favori'}
            </button>
            <button onClick={save} className="btn btn-primary">
              <Save className="h-4 w-4 mr-2" /> Enregistrer
            </button>
            <button onClick={()=>setConfirm(true)} className="btn btn-ghost text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4 mr-2" /> Supprimer
            </button>
          </div>
        </div>

        <Editor
          title={note.title}
          content={note.content}
          code={note.code}
          onChange={(v)=>setNote({ ...note, ...v })}
        />

        <div>
          <label className="label">Tags</label>
          <TagInput value={note.tags} onChange={(tags)=>setNote({ ...note, tags })} />
        </div>
      </main>

      <ConfirmDialog
        open={confirm}
        title="Supprimer la note ?"
        message="Cette action est irréversible."
        onCancel={()=>setConfirm(false)}
        onConfirm={del}
      />
    </div>
  )
}
