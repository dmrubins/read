import { FAMILY_BY_RIME } from '../data/words'

export default function FocusBanner({ rime, letterCase }) {
  const fam = rime && FAMILY_BY_RIME[rime]
  if (!fam) return null
  const fmt = s => letterCase === 'upper' ? s.toUpperCase() : s
  return (
    <div className="focus-chip">
      Focus Sound: <strong>{fmt(rime)}</strong> (sounds like "{fmt(fam.say.join('-'))}")
    </div>
  )
}
