import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

export const since = (date) =>
  date ? formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr }) : ''
