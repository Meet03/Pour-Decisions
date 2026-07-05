export interface KingsRule {
  rank: string
  name: string
  rule: string
}

export const kingsRules: KingsRule[] = [
  { rank: 'A', name: 'Waterfall', rule: 'Everyone drinks in a chain — you can’t stop until the person before you stops. Card-drawer starts.' },
  { rank: '2', name: 'You', rule: 'Pick someone. They take a sip.' },
  { rank: '3', name: 'Me', rule: 'That’s you. Take a sip.' },
  { rank: '4', name: 'Floor', rule: 'Last person to touch the floor takes a sip.' },
  { rank: '5', name: 'Guys', rule: 'All the guys take a sip.' },
  { rank: '6', name: 'Girls', rule: 'All the girls take a sip.' },
  { rank: '7', name: 'Heaven', rule: 'Last person to raise their hand takes a sip.' },
  { rank: '8', name: 'Mate', rule: 'Pick a drinking mate — they drink whenever you drink, until the game ends.' },
  { rank: '9', name: 'Rhyme', rule: 'Say a word. Go around the circle rhyming with it. First to fail or repeat takes a sip.' },
  { rank: '10', name: 'Categories', rule: 'Pick a category (car brands, cocktails…). Go around naming one each. First to fail takes a sip.' },
  { rank: 'J', name: 'Rule', rule: 'Invent a rule for the whole game (e.g. no first names). Breaking it costs a sip.' },
  { rank: 'Q', name: 'Question Master', rule: 'You’re Question Master. Anyone who answers your questions takes a sip — until the next Queen.' },
  { rank: 'K', name: 'King’s Cup', rule: 'Pour some of your drink into the King’s Cup. Whoever draws the 4th King drinks the whole thing.' },
]

export const suits = ['♠️', '♥️', '♦️', '♣️']
