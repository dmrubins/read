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
