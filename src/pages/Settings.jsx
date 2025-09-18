import Header from '../components/Header'

export default function Settings() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl p-4 md:p-6 space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Réglages</h2>
          <p className="text-neutral-400 mt-2">
            Interface sombre par défaut. Aucune option supplémentaire pour le moment.
          </p>
        </div>
      </main>
    </div>
  )
}
