import { useState, useCallback } from 'react'
import { VISUAL_WORDS, SIGHT_WORDS, FAMILIES, FAMILY_WORDS, FAMILY_BY_RIME, makeEntry } from '../data/words'

function loadLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback }
  catch { return fallback }
}
function saveLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

// Custom words are saved as { w, e, length, rime? } — `rime` is optional so
// words saved before word families existed keep working untouched.
function customEntry(c) {
  return makeEntry(c.w, c.e, c.rime ?? null)
}

// familySel: 'group:<groupId>' | 'family:<-rime>'
function familyMatcher(familySel) {
  if (!familySel) return null
  const [kind, id] = familySel.split(':')
  if (kind === 'family') return rime => rime === id
  if (kind === 'group') {
    const rimes = new Set(FAMILIES.filter(f => f.groupId === id).map(f => f.rime))
    return rime => rimes.has(rime)
  }
  return null
}

export function useWordData() {
  const [customWords, setCustomWords] = useState(() => loadLS('mw_custom_words', []))
  const [hiddenWords, setHiddenWords] = useState(() => loadLS('mw_hidden_words', []))

  // ── Game pool ─────────────────────────────────────────────────────────────
  const buildPool = useCallback((length, useSight, familySel = null) => {
    const vis = (VISUAL_WORDS[length] || []).filter(w => !hiddenWords.includes(w.w))

    const matches = familyMatcher(familySel)
    if (matches) {
      const builtIn = FAMILY_WORDS.filter(x => matches(x.rime) && !hiddenWords.includes(x.w))
      const custom = customWords
        .filter(c => c.rime && matches(c.rime))
        .map(customEntry)
        .filter(c => !builtIn.some(b => b.w === c.w))
      const famPool = [...builtIn, ...custom]
      if (famPool.length) return famPool
      // Everything in this family was hidden — fall through to the length pool
    }

    const sight = useSight
      ? (SIGHT_WORDS[length] || [])
          .filter(w => !hiddenWords.includes(w))
          .map(w => ({ w, e: null }))
      : []
    const custom = customWords.filter(w => w.length === length)
    const pool = [...vis, ...sight, ...custom]
    return pool.length ? pool : vis
  }, [customWords, hiddenWords])

  // ── Word manager data ─────────────────────────────────────────────────────
  // Returns { 3: [...], 4: [...], 5: [...], 6: [...] }
  // Each entry: { w, e, length, isCustom, rime? }
  const getAllWords = useCallback(() => {
    const result = {}
    ;[3, 4, 5, 6].forEach(len => {
      const vis = (VISUAL_WORDS[len] || [])
        .filter(w => !hiddenWords.includes(w.w))
        .map(w => ({ ...w, length: len, isCustom: false }))
      // Family words that aren't already in the visual lists; words that are
      // (e.g. "cat") just pick up their rime.
      const fam = FAMILY_WORDS.filter(f => f.length === len && !hiddenWords.includes(f.w))
      const famRime = Object.fromEntries(fam.map(f => [f.w, f.rime]))
      const visTagged = vis.map(v => famRime[v.w] ? { ...v, rime: famRime[v.w] } : v)
      const famExtra = fam
        .filter(f => !vis.some(v => v.w === f.w))
        .map(f => ({ w: f.w, e: f.e, length: len, isCustom: false, rime: f.rime }))
      const sight = (SIGHT_WORDS[len] || [])
        .filter(w => !hiddenWords.includes(w))
        .map(w => ({ w, e: null, length: len, isCustom: false }))
      const custom = customWords
        .filter(w => w.length === len)
        .map(w => ({ ...w, isCustom: true }))
      result[len] = [...visTagged, ...famExtra, ...sight, ...custom]
    })
    return result
  }, [customWords, hiddenWords])

  // ── Mutations ─────────────────────────────────────────────────────────────
  function validateRime(w, rime) {
    if (rime && (!FAMILY_BY_RIME[rime] || !w.endsWith(rime.slice(1)))) {
      return `"${w.toUpperCase()}" doesn't end in ${rime}.`
    }
    return null
  }

  function addWord(word, emoji, rime = '') {
    const w = word.trim().toLowerCase()
    if (!w || w.length < 3 || w.length > 6 || !/^[a-z]+$/.test(w)) {
      return 'Word must be 3–6 letters, no spaces or numbers.'
    }
    const rimeErr = validateRime(w, rime)
    if (rimeErr) return rimeErr

    // Duplicate check across built-in and custom
    const len = w.length
    const inBuiltIn =
      (VISUAL_WORDS[len] || []).some(x => x.w === w) ||
      (SIGHT_WORDS[len] || []).includes(w) ||
      FAMILY_WORDS.some(x => x.w === w)
    const inCustom = customWords.some(x => x.w === w)
    if (inBuiltIn || inCustom) return `"${w.toUpperCase()}" is already in the list!`

    const entry = { w, e: emoji.trim() || null, length: len }
    if (rime) entry.rime = rime
    const updated = [...customWords, entry]
    setCustomWords(updated)
    saveLS('mw_custom_words', updated)
    return null // no error
  }

  function editWord(oldW, newWord, newEmoji, newRime = '') {
    const w = newWord.trim().toLowerCase()
    if (!w || !/^[a-z]+$/.test(w)) return 'Word must be letters only.'
    const rimeErr = validateRime(w, newRime)
    if (rimeErr) return rimeErr
    const updated = customWords.map(x => {
      if (x.w !== oldW) return x
      const entry = { w, e: newEmoji.trim() || null, length: w.length }
      if (newRime) entry.rime = newRime
      return entry
    })
    setCustomWords(updated)
    saveLS('mw_custom_words', updated)
    return null
  }

  function removeWord(word, isCustom) {
    if (isCustom) {
      const updated = customWords.filter(x => x.w !== word)
      setCustomWords(updated)
      saveLS('mw_custom_words', updated)
    } else {
      const updated = [...hiddenWords, word]
      setHiddenWords(updated)
      saveLS('mw_hidden_words', updated)
    }
  }

  function resetToDefaults() {
    setCustomWords([])
    setHiddenWords([])
    saveLS('mw_custom_words', [])
    saveLS('mw_hidden_words', [])
  }

  return { buildPool, getAllWords, addWord, editWord, removeWord, resetToDefaults, customWords, hiddenWords }
}
