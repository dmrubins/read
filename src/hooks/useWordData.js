import { useState, useCallback } from 'react'
import { VISUAL_WORDS, SIGHT_WORDS } from '../data/words'

function loadLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback }
  catch { return fallback }
}
function saveLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

export function useWordData() {
  const [customWords, setCustomWords] = useState(() => loadLS('mw_custom_words', []))
  const [hiddenWords, setHiddenWords] = useState(() => loadLS('mw_hidden_words', []))

  // ── Game pool ─────────────────────────────────────────────────────────────
  const buildPool = useCallback((length, useSight) => {
    const vis = (VISUAL_WORDS[length] || []).filter(w => !hiddenWords.includes(w.w))
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
  // Each entry: { w, e, length, isCustom }
  const getAllWords = useCallback(() => {
    const result = {}
    ;[3, 4, 5, 6].forEach(len => {
      const vis = (VISUAL_WORDS[len] || [])
        .filter(w => !hiddenWords.includes(w.w))
        .map(w => ({ ...w, length: len, isCustom: false }))
      const sight = (SIGHT_WORDS[len] || [])
        .filter(w => !hiddenWords.includes(w))
        .map(w => ({ w, e: null, length: len, isCustom: false }))
      const custom = customWords
        .filter(w => w.length === len)
        .map(w => ({ ...w, isCustom: true }))
      result[len] = [...vis, ...sight, ...custom]
    })
    return result
  }, [customWords, hiddenWords])

  // ── Mutations ─────────────────────────────────────────────────────────────
  function addWord(word, emoji) {
    const w = word.trim().toLowerCase()
    if (!w || w.length < 3 || w.length > 6 || !/^[a-z]+$/.test(w)) {
      return 'Word must be 3–6 letters, no spaces or numbers.'
    }
    // Duplicate check across built-in and custom
    const len = w.length
    const inBuiltIn =
      (VISUAL_WORDS[len] || []).some(x => x.w === w) ||
      (SIGHT_WORDS[len] || []).includes(w)
    const inCustom = customWords.some(x => x.w === w)
    if (inBuiltIn || inCustom) return `"${w.toUpperCase()}" is already in the list!`

    const updated = [...customWords, { w, e: emoji.trim() || null, length: len }]
    setCustomWords(updated)
    saveLS('mw_custom_words', updated)
    return null // no error
  }

  function editWord(oldW, newWord, newEmoji) {
    const w = newWord.trim().toLowerCase()
    if (!w || !/^[a-z]+$/.test(w)) return
    const updated = customWords.map(x =>
      x.w === oldW
        ? { w, e: newEmoji.trim() || null, length: w.length }
        : x
    )
    setCustomWords(updated)
    saveLS('mw_custom_words', updated)
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
