import type { Tier } from './tiers'

export interface WyrPrompt {
  a: string
  b: string
}

export const wouldYouRather: Record<Tier, WyrPrompt[]> = {
  chill: [
    { a: 'Always be 10 minutes late', b: 'Always be 2 hours early' },
    { a: 'Never use social media again', b: 'Never watch another series' },
    { a: 'Have unlimited food', b: 'Have unlimited travel' },
    { a: 'Talk to animals', b: 'Speak every human language' },
    { a: 'Always know the time without a clock', b: 'Always know the direction north' },
    { a: 'Only whisper forever', b: 'Only shout forever' },
    { a: 'Live without music', b: 'Live without movies' },
    { a: 'Have a rewind button for life', b: 'Have a pause button for life' },
    { a: 'Fight one horse-sized duck', b: 'Fight a hundred duck-sized horses' },
    { a: 'Be the funniest person in the room', b: 'Be the smartest person in the room' },
  ],
  family: [
    { a: 'Swap phones with a sibling for a day', b: 'Swap wardrobes for a week' },
    { a: 'Have mom read your chats', b: 'Have dad follow you around for a day' },
    { a: 'Be the eldest child forever', b: 'Be the youngest child forever' },
    { a: 'Do all the chores for a month', b: 'Give up the front seat for a year' },
    { a: 'Relive one family vacation', b: 'Erase one family embarrassment' },
    { a: 'Always share your food', b: 'Never taste anyone else’s food' },
    { a: 'Have your baby photos shown to every guest', b: 'Have your report cards read aloud' },
    { a: 'Only watch what your sibling picks', b: 'Only eat what your sibling cooks' },
    { a: 'Get caught sneaking in late', b: 'Get caught bunking school' },
    { a: 'Have a sibling plan your wedding', b: 'Have your parents plan your honeymoon' },
  ],
  party: [
    { a: 'Dance every time you hear music', b: 'Sing along to every song you know' },
    { a: 'Lose your phone tonight', b: 'Lose your wallet tonight' },
    { a: 'Have your search history projected here', b: 'Have your group chat read aloud' },
    { a: 'Karaoke solo in front of your office', b: 'Fall on the dance floor in front of your crush' },
    { a: 'Only drink cocktails with umbrellas forever', b: 'Only drink from a baby bottle tonight' },
    { a: 'Be the DJ who cleared the floor', b: 'Be the one who requested the song that did' },
    { a: 'Host every party forever', b: 'Never host but always clean up' },
    { a: 'Relive your best night out weekly', b: 'Erase your worst night out forever' },
    { a: 'Always order wrong at restaurants', b: 'Always get everyone else’s order wrong' },
    { a: 'Hiccup through every date', b: 'Sneeze through every meeting' },
  ],
  spicy: [
    { a: 'Date your best friend’s sibling', b: 'Date your sibling’s best friend' },
    { a: 'Know who likes you here', b: 'Never find out and stay curious' },
    { a: 'Read your crush’s mind for a day', b: 'Have them read yours for an hour' },
    { a: 'Go on a blind date picked by your parents', b: 'Picked by your ex' },
    { a: 'Accidentally like a 2019 photo of your crush', b: 'Send "I miss you" to the wrong chat' },
    { a: 'Have your dating history published', b: 'Have your dating future predicted publicly' },
    { a: 'Marry rich but boring', b: 'Marry broke but exciting' },
    { a: 'Get caught singing love songs about your crush', b: 'Get caught practicing a proposal' },
    { a: 'Kiss a frog that might be royalty', b: 'Date 100 frogs to find one match' },
    { a: 'Double-date with your parents', b: 'Double-date with your boss' },
  ],
}
