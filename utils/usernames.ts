const adjectives = [
  'Amazing',
  'Angry',
  'Awesome',
  'Bad',
  'Beautiful',
  'Bored',
  'Cool',
  'Crazy',
  'Creepy',
  'Disgusting',
  'Dreamy',
  'Excited',
  'Extraordinary',
  'Fascinating',
  'Fast',
  'Freaky',
  'Furious',
  'Greasy',
  'Hairy',
  'Hardcore',
  'Horny',
  'Lightning',
  'Magical',
  'Magnificient',
  'Playful',
  'Political',
  'Sad',
  'Sexy',
  'Smelly',
  'Zen-master',
]

const names = [
  'Bob Ross',
  'Botticelli',
  'Braque',
  'Canaletto',
  'Cézanne',
  'Chagall',
  'Da Vinci',
  'Dali',
  'Delacroix',
  'Gauguin',
  'Goya',
  'Matisse',
  'Manet',
  'Magritte',
  'Michelangelo',
  'Monet',
  'Picasso',
  'Pollock',
  'Rembrandt',
  'Van Gogh',
  'Vasarely',
  'Warhol',
]

function randNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

export function generate(): string {
  const adjectiveIndex = randNumber(0, adjectives.length + 1)
  const nameIndex = randNumber(0, names.length + 1)
  return `${adjectives[adjectiveIndex]} ${names[nameIndex]}`
}
