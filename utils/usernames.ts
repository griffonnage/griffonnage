const adjectives = [
  'Amazing',
  'Angry',
  'Arrogant',
  'Awesome',
  'Bad',
  'Beautiful',
  'Bored',
  'Cool',
  'Crazy',
  'Creepy',
  'Disgusting',
  'Dizzy',
  'Dreamy',
  'Drunk',
  'Excited',
  'Extraordinary',
  'Fascinating',
  'Fast',
  'Fearless',
  'Freaky',
  'Furious',
  'Greasy',
  'Hairy',
  'Hardcore',
  'Hungry',
  'Horny',
  'Isolated',
  'Lightning',
  'Magical',
  'Magnificient',
  'Playful',
  'Political',
  'Sad',
  'Selfish',
  'Sexy',
  'Sloppy',
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
  const adjectiveIndex = randNumber(0, adjectives.length)
  const nameIndex = randNumber(0, names.length)
  return `${adjectives[adjectiveIndex]} ${names[nameIndex]}`
}
