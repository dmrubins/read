export const VISUAL_WORDS = {
  3: [
    { w: 'cat', e: '🐱' }, { w: 'dog', e: '🐶' }, { w: 'sun', e: '☀️' }, { w: 'hat', e: '🎩' },
    { w: 'bee', e: '🐝' }, { w: 'cup', e: '☕' }, { w: 'bus', e: '🚌' }, { w: 'egg', e: '🥚' },
    { w: 'ant', e: '🐜' }, { w: 'fly', e: '🪰' }, { w: 'fox', e: '🦊' }, { w: 'pig', e: '🐷' },
    { w: 'cow', e: '🐄' }, { w: 'owl', e: '🦉' }, { w: 'bat', e: '🦇' }, { w: 'net', e: '🥅' },
    { w: 'ice', e: '🧊' }, { w: 'jam', e: '🍓' }, { w: 'nut', e: '🥜' }, { w: 'map', e: '🗺️' },
  ],
  4: [
    { w: 'frog', e: '🐸' }, { w: 'bird', e: '🐦' }, { w: 'fish', e: '🐟' }, { w: 'bear', e: '🐻' },
    { w: 'duck', e: '🦆' }, { w: 'lion', e: '🦁' }, { w: 'wolf', e: '🐺' }, { w: 'crab', e: '🦀' },
    { w: 'worm', e: '🪱' }, { w: 'star', e: '⭐' }, { w: 'moon', e: '🌙' }, { w: 'rain', e: '🌧️' },
    { w: 'tree', e: '🌳' }, { w: 'cake', e: '🎂' }, { w: 'milk', e: '🥛' }, { w: 'kite', e: '🪁' },
    { w: 'drum', e: '🥁' }, { w: 'ring', e: '💍' }, { w: 'bell', e: '🔔' }, { w: 'boot', e: '👢' },
  ],
  5: [
    { w: 'horse', e: '🐴' }, { w: 'tiger', e: '🐯' }, { w: 'whale', e: '🐳' }, { w: 'sheep', e: '🐑' },
    { w: 'eagle', e: '🦅' }, { w: 'snail', e: '🐌' }, { w: 'shark', e: '🦈' }, { w: 'moose', e: '🦌' },
    { w: 'tulip', e: '🌷' }, { w: 'flame', e: '🔥' }, { w: 'cloud', e: '☁️' }, { w: 'sword', e: '⚔️' },
    { w: 'crown', e: '👑' }, { w: 'plant', e: '🪴' }, { w: 'heart', e: '❤️' }, { w: 'pizza', e: '🍕' },
    { w: 'bread', e: '🍞' }, { w: 'grape', e: '🍇' }, { w: 'lemon', e: '🍋' }, { w: 'onion', e: '🧅' },
  ],
  6: [
    { w: 'rabbit', e: '🐰' }, { w: 'parrot', e: '🦜' }, { w: 'turtle', e: '🐢' }, { w: 'spider', e: '🕷️' },
    { w: 'castle', e: '🏰' }, { w: 'rocket', e: '🚀' }, { w: 'bridge', e: '🌉' }, { w: 'flower', e: '🌸' },
    { w: 'bottle', e: '🍶' }, { w: 'candle', e: '🕯️' }, { w: 'mirror', e: '🪞' }, { w: 'pencil', e: '✏️' },
    { w: 'kitten', e: '🐱' }, { w: 'dragon', e: '🐉' }, { w: 'wizard', e: '🧙' },
    { w: 'island', e: '🏝️' }, { w: 'sunset', e: '🌅' }, { w: 'butter', e: '🧈' }, { w: 'pigeon', e: '🕊️' },
  ],
}

export const SIGHT_WORDS = {
  3: ['the','and','are','but','can','did','for','get','got','had','has','him',
      'his','how','its','may','not','now','off','one','our','out','put','run',
      'saw','say','she','too','two','use','was','who','why','yes','yet'],
  4: ['also','away','been','call','come','does','down','each','find','five',
      'from','give','good','have','here','hold','home','into','just','keep',
      'know','like','live','look','made','make','many','more','most','much',
      'must','name','need','next','open','only','once','over','part','play',
      'read','said','same','show','some','take','tell','than','that','them',
      'then','they','this','time','very','want','well','went','were','what',
      'when','will','with','word','your'],
  5: ['about','after','again','along','being','bring','could','every','first',
      'found','given','going','great','group','learn','leave','might','never',
      'other','place','right','round','shall','since','small','still','their',
      'there','these','think','those','three','under','until','where','which',
      'while','whose','world','would','write','young'],
  6: ['always','animal','around','before','behind','better','change','coming',
      'during','enough','follow','friend','happen','having','helped','itself',
      'letter','little','looked','making','moving','number','people','really',
      'second','should','silent','simple','single','simply','slowly','sounds',
      'though','toward','travel','trying','turned','wanted','within','wonder'],
}

// ── Word families / partial sounds (rimes) ──────────────────────────────────
// Short-vowel IPA, used for the "say it" tip: /vowel/ then /ending/
const SHORT = { a: 'æ', e: 'ɛ', i: 'ɪ', o: 'ɑ', u: 'ʌ' }

// say: how the sound is spelled out for kids ("a-t"); ipa: [vowel, ending]
function family(rime, say, ipa, words) {
  return { rime: `-${rime}`, say, ipa, words }
}

export const FAMILY_GROUPS = [
  { id: 'short-a', label: 'Short A', families: [
    family('at', ['a', 't'], [SHORT.a, 't'], [['cat','🐱'],['bat','🦇'],['hat','🎩'],['mat','🧘'],['rat','🐀'],['fat','🐷'],['pat','✋'],['sat','🪑']]),
    family('an', ['a', 'n'], [SHORT.a, 'n'], [['can','🥫'],['fan','🪭'],['pan','🍳'],['man','👨'],['ran','🏃'],['van','🚐']]),
    family('ap', ['a', 'p'], [SHORT.a, 'p'], [['cap','🧢'],['map','🗺️'],['nap','😴'],['tap','🚰'],['clap','👏'],['trap','🪤']]),
    family('ag', ['a', 'g'], [SHORT.a, 'g'], [['bag','🎒'],['tag','🏷️'],['rag','🧹'],['wag','🐕'],['flag','🚩']]),
  ]},
  { id: 'short-e', label: 'Short E', families: [
    family('ed', ['e', 'd'], [SHORT.e, 'd'], [['bed','🛏️'],['red','🔴'],['fed','🥣'],['shed','🏚️']]),
    family('en', ['e', 'n'], [SHORT.e, 'n'], [['hen','🐔'],['pen','🖊️'],['ten','🔟'],['men','👥']]),
    family('et', ['e', 't'], [SHORT.e, 't'], [['net','🕸️'],['pet','🐶'],['wet','💧'],['jet','✈️'],['vet','🩺']]),
  ]},
  { id: 'short-i', label: 'Short I', families: [
    family('in', ['i', 'n'], [SHORT.i, 'n'], [['bin','🗑️'],['fin','🦈'],['pin','📌'],['win','🏆'],['tin','🥫'],['spin','🔄']]),
    family('ip', ['i', 'p'], [SHORT.i, 'p'], [['dip','🥑'],['lip','👄'],['rip','📄'],['tip','💡'],['ship','🚢'],['clip','📎']]),
    family('it', ['i', 't'], [SHORT.i, 't'], [['bit','🍪'],['fit','👟'],['hit','🥊'],['sit','🪑'],['kit','🧰']]),
  ]},
  { id: 'short-o', label: 'Short O', families: [
    family('op', ['o', 'p'], [SHORT.o, 'p'], [['hop','🦘'],['mop','🧹'],['pop','🎈'],['top','🔝'],['stop','🛑'],['drop','💧']]),
    family('ot', ['o', 't'], [SHORT.o, 't'], [['dot','🟣'],['hot','🔥'],['pot','🍲'],['rot','🍎'],['knot','🪢'],['spot','🐕']]),
    family('og', ['o', 'g'], [SHORT.o, 'g'], [['dog','🐶'],['fog','🌫️'],['frog','🐸'],['log','🪵'],['jog','🏃']]),
  ]},
  { id: 'short-u', label: 'Short U', families: [
    family('ug', ['u', 'g'], [SHORT.u, 'g'], [['bug','🐛'],['hug','🫂'],['jug','🏺'],['mug','☕'],['rug','🧶'],['tug','🚤']]),
    family('un', ['u', 'n'], [SHORT.u, 'n'], [['bun','🍞'],['fun','🎪'],['run','🏃'],['sun','☀️']]),
    family('ut', ['u', 't'], [SHORT.u, 't'], [['cut','✂️'],['hut','🛖'],['nut','🥜']]),
  ]},
  { id: 'digraph', label: 'Digraphs / Blends', families: [
    family('ing', ['i', 'ng'], [SHORT.i, 'ŋ'], [['king','👑'],['ring','💍'],['sing','🎤'],['wing','🪽']]),
    family('all', ['aw', 'l'], ['ɔ', 'l'], [['ball','⚽'],['call','📞'],['fall','🍂'],['wall','🧱']]),
    family('ack', ['a', 'k'], [SHORT.a, 'k'], [['back','🔙'],['sack','🛍️'],['pack','📦'],['black','⚫'],['track','🛤️']]),
    family('ock', ['o', 'k'], [SHORT.o, 'k'], [['sock','🧦'],['lock','🔒'],['clock','⏰'],['rock','🪨']]),
    family('uck', ['u', 'k'], [SHORT.u, 'k'], [['duck','🦆'],['truck','🚚'],['luck','🍀']]),
  ]},
]

// Full word entry. `w`/`e` are kept alongside `word`/`emoji` because the rest of
// the app (and saved custom words) use the short keys.
export function makeEntry(word, emoji, rime = null, isSightWord = false) {
  const suffix = rime ? rime.replace(/^-/, '') : ''
  const hasRime = !!suffix && word.endsWith(suffix)
  return {
    id: hasRime ? `${suffix}-${word}` : word,
    word, w: word,
    emoji: emoji ?? null, e: emoji ?? null,
    onset: hasRime ? word.slice(0, word.length - suffix.length) : '',
    rime: hasRime ? rime : null,
    isSightWord,
    length: word.length,
  }
}

export const FAMILIES = FAMILY_GROUPS.flatMap(g =>
  g.families.map(f => ({
    ...f,
    id: f.rime.slice(1),
    groupId: g.id,
    entries: f.words.map(([w, e]) => makeEntry(w, e, f.rime)),
  }))
)
export const FAMILY_BY_RIME = Object.fromEntries(FAMILIES.map(f => [f.rime, f]))
export const FAMILY_WORDS = FAMILIES.flatMap(f => f.entries)
export const ALL_ONSETS = [...new Set(FAMILY_WORDS.map(e => e.onset).filter(Boolean))]

// "Say /æ/ then /t/ -> /æt/"
export function familyTip(rime) {
  const f = FAMILY_BY_RIME[rime]
  if (!f) return ''
  const [v, c] = f.ipa
  return `Say /${v}/ then /${c}/ -> /${v}${c}/`
}

// Classic "X is for Y" associations shown in the letter zoom modal
export const LETTER_WORDS = {
  a: { word: 'Apple',     emoji: '🍎' },
  b: { word: 'Ball',      emoji: '⚽' },
  c: { word: 'Cat',       emoji: '🐱', alt: { word: 'Car',       emoji: '🚗' } },
  d: { word: 'Dog',       emoji: '🐶', alt: { word: 'Drum',      emoji: '🥁' } },
  e: { word: 'Egg',       emoji: '🥚', alt: { word: 'Elephant',  emoji: '🐘' } },
  f: { word: 'Fish',      emoji: '🐟', alt: { word: 'Flower',    emoji: '🌸' } },
  g: { word: 'Goat',      emoji: '🐐' },
  h: { word: 'Hat',       emoji: '🎩', alt: { word: 'Heart',     emoji: '❤️' } },
  i: { word: 'Ice',       emoji: '🧊', alt: { word: 'Island',    emoji: '🏝️' } },
  j: { word: 'Jar',       emoji: '🫙' },
  k: { word: 'Kite',      emoji: '🪁', alt: { word: 'King',      emoji: '👑' } },
  l: { word: 'Lion',      emoji: '🦁', alt: { word: 'Leaf',      emoji: '🍃' } },
  m: { word: 'Moon',      emoji: '🌙', alt: { word: 'Map',       emoji: '🗺️' } },
  n: { word: 'Nest',      emoji: '🪺' },
  o: { word: 'Owl',       emoji: '🦉', alt: { word: 'Orange',    emoji: '🍊' } },
  p: { word: 'Pig',       emoji: '🐷', alt: { word: 'Pizza',     emoji: '🍕' } },
  q: { word: 'Queen',     emoji: '👸' },
  r: { word: 'Rain',      emoji: '🌧️', alt: { word: 'Robot',     emoji: '🤖' } },
  s: { word: 'Sun',       emoji: '☀️', alt: { word: 'Star',      emoji: '⭐' } },
  t: { word: 'Tree',      emoji: '🌳', alt: { word: 'Train',     emoji: '🚂' } },
  u: { word: 'Umbrella',  emoji: '☂️' },
  v: { word: 'Violet',    emoji: '💜' },
  w: { word: 'Whale',     emoji: '🐳', alt: { word: 'Wizard',    emoji: '🧙' } },
  x: { word: 'X-ray',     emoji: '🩻' },
  y: { word: 'Yo-yo',     emoji: '🪀' },
  z: { word: 'Zebra',     emoji: '🦓' },
}

export const CORRECT_PHRASES = [
  'Amazing! 🌟', 'Brilliant! ✨', 'You got it! 🎉',
  'Superstar! ⭐', 'Magic! 🦄', 'Wow! 💫',
]

export const GEMS = ['💎', '💜', '💙', '✨', '⭐', '🌟']
