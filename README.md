# Pro Notes

Bloc-notes privé professionnel avec React + Supabase (auth, RLS, recherche FTS).

## Installation

1. Cloner le repo et entrer dans le projet
2. Créer `.env` en copiant `.env.sample` et renseigner VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
3. Installer les dépendances
   - npm install
4. Configurer la base
   - Copier `db/schema.sql` dans Supabase SQL Editor et exécuter.
5. Lancer le projet
   - npm run dev

## Fonctionnalités
- Auth email/magic link
- Notes (titre, texte, code, tags, favoris)
- Recherche plein-texte + tags
- Profil (nom, avatar)
- Sécurité RLS activée
