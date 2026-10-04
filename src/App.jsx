import { useState, useMemo, useEffect, useRef } from 'react'
import Background from './components/Background'
import Header from './components/Header'
import SettingsModal from './components/SettingsModal'
import WordManager from './components/WordManager'
import ReadingCard from './components/ReadingCard'
import SpellingCard from './components/SpellingCard'
import LetterZoomModal from './components/LetterZoomModal'
import RimeModal from './components/RimeModal'
import JewelBucket from './components/JewelBucket'
import JewelBurst from './components/JewelBurst'
import { GEMS } from './data/words'
import { useAudio } from './hooks/useAudio'
import { useWordData } from './hooks/useWordData'

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)] ?? null
}

export default function App() {
  // ── Word data (custom + built-in) ─────────────────────────────────
  const wordData = useWordData()

  // ── Persistent state ──────────────────────────────────────────────
  const [jewels, setJewels] = useState(() =>
    parseInt(localStorage.getItem('mw_jewels') || '0')
  )
  const [jewelList, setJewelList] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mw_jewel_list') || '[]') }
    catch { return [] }
  })

  // ── Settings state ────────────────────────────────────────────────
  const [mode, setMode]               = useState('reading')
  const [wordLength, setWordLength]   = useState(4)
  const [useSightWords, setUseSightWords] = useState(false)
  const [hidePicture, setHidePicture] = useState(true)
  const [letterCase, setLetterCase]   = useState('upper')
  const [filterMode, setFilterMode]   = useState('length')          // 'length' | 'family'
  const [familySel, setFamilySel]     = useState('group:short-a')     // 'group:<id>' | 'family:<-rime>'
  const [chunkView, setChunkView]     = useState(false)   // reading: show word as [onset][rime] chunks

  // ── Game state ────────────────────────────────────────────────────
  const recentWords = useRef([])
  const [currentItem, setCurrentItem]     = useState(null)
  const [wordKey, setWordKey]             = useState(0)
  const [spellMode, setSpellMode]         = useState('letter')
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0)
  const [spelledSoFar, setSpelledSoFar]   = useState([])
  const [firstTry, setFirstTry]           = useState(true)

  // ── UI state ──────────────────────────────────────────────────────
  const [settingsOpen, setSettingsOpen]   = useState(false)
  const [wordManagerOpen, setWordManagerOpen] = useState(false)
  const [zoomedLetter, setZoomedLetter]   = useState(null)
  const [zoomedRime, setZoomedRime]       = useState(null)
  const [burstKey, setBurstKey]           = useState(0)

  const { playTone, playCelebration } = useAudio()

  const familyMode = filterMode === 'family'

  // ── Word pool (re-derives when filter, sight toggle, or custom words change) ──
  const wordPool = useMemo(
    () => wordData.buildPool(wordLength, useSightWords, familyMode ? familySel : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wordLength, useSightWords, familyMode, familySel, wordData.customWords, wordData.hiddenWords]
  )

  // Re-pick when pool changes
  useEffect(() => {
    loadNewWord(wordPool)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordPool])

  // ── Helpers ───────────────────────────────────────────────────────
  function loadNewWord(pool) {
    const available = pool.filter(item => !recentWords.current.includes(item.w))
    const pick = pickRandom(available.length > 0 ? available : pool)
    recentWords.current = [...recentWords.current, pick.w].slice(-5)
    setCurrentItem(pick)
    setCurrentLetterIdx(0)
    setSpelledSoFar([])
    setFirstTry(true)
    setWordKey(k => k + 1)
  }

  function nextWord() { loadNewWord(wordPool) }

  function handleSetMode(m) {
    setMode(m)
    loadNewWord(wordPool)
  }

  function awardJewel() {
    const gem = pickRandom(GEMS)
    const newCount = jewels + 1
    const newList = [...jewelList, { id: Date.now() + Math.random(), gem }]
    setJewels(newCount)
    setJewelList(newList)
    localStorage.setItem('mw_jewels', String(newCount))
    localStorage.setItem('mw_jewel_list', JSON.stringify(newList))
    playCelebration()
    setBurstKey(k => k + 1)
  }

  function resetJewels() {
    if (!confirm('Reset all your jewels? 💎')) return
    setJewels(0)
    setJewelList([])
    localStorage.setItem('mw_jewels', '0')
    localStorage.setItem('mw_jewel_list', '[]')
  }

  function handlePickLetter(letter) {
    if (!currentItem) return
    const correct = currentItem.w[currentLetterIdx]
    if (letter.toLowerCase() === correct) {
      playTone(600, 0.1)
      const newSpelled = [...spelledSoFar, correct]
      setSpelledSoFar(newSpelled)
      if (newSpelled.length >= currentItem.w.length) {
        if (firstTry) awardJewel()
        setCurrentLetterIdx(currentItem.w.length)
      } else {
        setCurrentLetterIdx(i => i + 1)
      }
    } else {
      setFirstTry(false)
      playTone(200, 0.15, 'sawtooth')
    }
  }

  function handlePickWord(word) {
    if (!currentItem) return
    if (word === currentItem.w) {
      setSpelledSoFar([...currentItem.w])
      setCurrentLetterIdx(currentItem.w.length)
      playTone(600, 0.1)
      if (firstTry) awardJewel()
    } else {
      setFirstTry(false)
      playTone(200, 0.15, 'sawtooth')
    }
  }

  function handleChunkWrong() {
    setFirstTry(false)
    playTone(200, 0.15, 'sawtooth')
  }

  function handleChunkPick() {
    playTone(600, 0.1)
  }

  function handleChunkDone() {
    if (!currentItem) return
    playTone(600, 0.1)
    setSpelledSoFar([...currentItem.w])
    setCurrentLetterIdx(currentItem.w.length)
    if (firstTry) awardJewel()
  }

  function handleReadingSuccess() {
    awardJewel()
    loadNewWord(wordPool)
  }

  function handleSetSpellMode(m) {
    setSpellMode(m)
    setSpelledSoFar([])
    setCurrentLetterIdx(0)
    setFirstTry(true)
  }

  // ── Derived ───────────────────────────────────────────────────────
  const currentWord  = currentItem?.w ?? ''
  const currentEmoji = currentItem?.e ?? null
  const isSight      = !currentEmoji
  const currentRime  = familyMode ? (currentItem?.rime ?? null) : null

  // ── Render ────────────────────────────────────────────────────────
  return (
    <>
      <Background />
      <div id="app">
        <Header
          jewels={jewels}
          onReset={resetJewels}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenWordManager={() => setWordManagerOpen(true)}
        />

        <div className="mode-tabs">
          {[
            { id: 'reading',  label: '📖 Reading'  },
            { id: 'spelling', label: '✏️ Spelling' },
          ].map(t => (
            <button
              key={t.id}
              className={`tab${mode === t.id ? ' active' : ''}`}
              onClick={() => handleSetMode(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {currentItem && (
          mode === 'reading' ? (
            <ReadingCard
              key={wordKey}
              item={currentItem}
              canChunk={!!currentRime}
              chunked={chunkView && !!currentRime}
              onToggleChunk={() => setChunkView(v => !v)}
              focusRime={currentRime}
              word={currentWord}
              emoji={currentEmoji}
              isSight={isSight}
              hidePicture={hidePicture}
              letterCase={letterCase}
              onZoomLetter={setZoomedLetter}
              onZoomRime={setZoomedRime}
              onDidIt={handleReadingSuccess}
              onNext={nextWord}
            />
          ) : (
            <SpellingCard
              key={wordKey}
              item={currentItem}
              focusRime={currentRime}
              canChunk={!!currentRime}
              word={currentWord}
              emoji={currentEmoji}
              isSight={isSight}
              spellMode={spellMode}
              spelledSoFar={spelledSoFar}
              currentLetterIdx={currentLetterIdx}
              wordPool={wordPool}
              letterCase={letterCase}
              onSetSpellMode={handleSetSpellMode}
              onPickLetter={handlePickLetter}
              onPickWord={handlePickWord}
              onChunkPick={handleChunkPick}
              onChunkWrong={handleChunkWrong}
              onChunkDone={handleChunkDone}
              onNext={nextWord}
            />
          )
        )}

        <JewelBucket jewelList={jewelList} />
      </div>

      {/* Modals */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        wordLength={wordLength}       setWordLength={setWordLength}
        useSightWords={useSightWords} setUseSightWords={setUseSightWords}
        hidePicture={hidePicture}     setHidePicture={setHidePicture}
        letterCase={letterCase}       setLetterCase={setLetterCase}
        filterMode={filterMode}       setFilterMode={setFilterMode}
        familySel={familySel}         setFamilySel={setFamilySel}
      />

      <WordManager
        isOpen={wordManagerOpen}
        onClose={() => setWordManagerOpen(false)}
        wordData={wordData}
      />

      {zoomedLetter && (
        <LetterZoomModal
          letter={zoomedLetter}
          letterCase={letterCase}
          currentWord={currentWord}
          onClose={() => setZoomedLetter(null)}
        />
      )}

      {zoomedRime && (
        <RimeModal rime={zoomedRime} letterCase={letterCase} onClose={() => setZoomedRime(null)} />
      )}

      <JewelBurst triggerKey={burstKey} />
    </>
  )
}
