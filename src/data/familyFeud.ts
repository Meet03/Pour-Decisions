export interface FeudAnswer {
  text: string
  points: number
}

export interface FeudQuestion {
  prompt: string
  answers: FeudAnswer[]
}

export const feudQuestions: FeudQuestion[] = [
  {
    prompt: "Name something you'd hate to run out of at a party",
    answers: [
      { text: 'Ice', points: 34 },
      { text: 'Drinks', points: 28 },
      { text: 'Snacks', points: 20 },
      { text: 'Music/playlist', points: 12 },
      { text: 'Toilet paper', points: 6 },
    ],
  },
  {
    prompt: 'Name a reason someone shows up late to work',
    answers: [
      { text: 'Traffic', points: 38 },
      { text: 'Overslept', points: 26 },
      { text: 'Car trouble', points: 18 },
      { text: 'Lost track of time', points: 12 },
      { text: 'Forgot something at home', points: 6 },
    ],
  },
  {
    prompt: 'Name something you take on a road trip',
    answers: [
      { text: 'Snacks', points: 32 },
      { text: 'Phone charger', points: 25 },
      { text: 'Music/playlist', points: 20 },
      { text: 'Water bottle', points: 14 },
      { text: 'Pillow/blanket', points: 9 },
    ],
  },
  {
    prompt: "Name a food that's better as leftovers",
    answers: [
      { text: 'Biryani', points: 30 },
      { text: 'Pizza', points: 26 },
      { text: 'Curry', points: 22 },
      { text: 'Pasta', points: 14 },
      { text: 'Fried rice', points: 8 },
    ],
  },
  {
    prompt: 'Name something people do right before a job interview',
    answers: [
      { text: 'Practice answers', points: 30 },
      { text: 'Pick an outfit', points: 26 },
      { text: 'Research the company', points: 20 },
      { text: 'Get nervous', points: 15 },
      { text: 'Ask friends for tips', points: 9 },
    ],
  },
  {
    prompt: 'Name an animal you would never want as a pet',
    answers: [
      { text: 'Snake', points: 34 },
      { text: 'Spider', points: 26 },
      { text: 'Crocodile', points: 20 },
      { text: 'Scorpion', points: 12 },
      { text: 'Rat', points: 8 },
    ],
  },
  {
    prompt: "Name something you'd find in a teenager's room",
    answers: [
      { text: 'Phone', points: 32 },
      { text: 'Dirty laundry', points: 24 },
      { text: 'Headphones', points: 18 },
      { text: 'Posters', points: 14 },
      { text: 'Snack wrappers', points: 12 },
    ],
  },
  {
    prompt: 'Name a reason to cancel plans last minute',
    answers: [
      { text: "Feeling sick", points: 30 },
      { text: 'Work came up', points: 25 },
      { text: 'Too tired', points: 20 },
      { text: 'Bad weather', points: 15 },
      { text: 'Family emergency', points: 10 },
    ],
  },
  {
    prompt: 'Name something that gets more expensive every year',
    answers: [
      { text: 'Petrol/fuel', points: 32 },
      { text: 'Rent', points: 27 },
      { text: 'Groceries', points: 20 },
      { text: 'School fees', points: 13 },
      { text: 'Movie tickets', points: 8 },
    ],
  },
  {
    prompt: "Name a place you'd hide if you were an hour late for a haircut appointment",
    answers: [
      { text: 'Bathroom', points: 28 },
      { text: 'Car', points: 24 },
      { text: 'Under the bed', points: 20 },
      { text: 'A different city', points: 16 },
      { text: 'Closet', points: 12 },
    ],
  },
  {
    prompt: 'Name something people lie about on their resume',
    answers: [
      { text: 'Skills', points: 32 },
      { text: 'Work experience', points: 27 },
      { text: 'Job title', points: 19 },
      { text: 'Hobbies', points: 13 },
      { text: 'Reason for leaving last job', points: 9 },
    ],
  },
  {
    prompt: "Name something you'd bring to a deserted island",
    answers: [
      { text: 'Phone (with signal)', points: 30 },
      { text: 'Knife', points: 25 },
      { text: 'Food/water', points: 20 },
      { text: 'A friend', points: 15 },
      { text: 'Lighter', points: 10 },
    ],
  },
  {
    prompt: 'Name a sport that would be terrifying to play in the dark',
    answers: [
      { text: 'Boxing', points: 30 },
      { text: 'Cricket/baseball', points: 26 },
      { text: 'Football', points: 20 },
      { text: 'Tennis', points: 14 },
      { text: 'Archery', points: 10 },
    ],
  },
  {
    prompt: 'Name something people do at every family wedding',
    answers: [
      { text: 'Dance', points: 30 },
      { text: 'Take photos', points: 26 },
      { text: 'Eat too much', points: 20 },
      { text: 'Gossip about relatives', points: 14 },
      { text: 'Cry', points: 10 },
    ],
  },
  {
    prompt: 'Name something you should never say to your boss',
    answers: [
      { text: "I don't care", points: 32 },
      { text: "That's not my job", points: 25 },
      { text: "You're wrong", points: 19 },
      { text: "I quit", points: 14 },
      { text: "I'm bored", points: 10 },
    ],
  },
  {
    prompt: "Name a excuse for not answering someone's call",
    answers: [
      { text: 'Phone on silent', points: 32 },
      { text: 'No signal', points: 25 },
      { text: 'Was sleeping', points: 19 },
      { text: 'Battery died', points: 15 },
      { text: 'Didn\'t hear it', points: 9 },
    ],
  },
]
