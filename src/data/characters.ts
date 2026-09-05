import { Character } from '../types';

export const charactersData: Character[] = [
  {
    id: 'tony-stark',
    name: 'Tony Stark',
    alias: 'Iron Man',
    relationship: 'Creator and wearer of Iron Man armor',
    description: 'Brilliant engineer, inventor, and philanthropist. After being captured and forced to build weapons, Tony created the first Iron Man suit and became a superhero dedicated to protecting Earth.',
    image: '/images/characters/tony-stark.jpg',
    firstAppearance: 'Tales of Suspense #39 (1963)',
    type: 'ally',
    associatedMovies: ['Iron Man', 'Iron Man 2', 'Iron Man 3', 'The Avengers', 'Avengers: Age of Ultron', 'Captain America: Civil War', 'Avengers: Infinity War', 'Avengers: Endgame'],
    armorWorn: ['mark-1', 'mark-2', 'mark-3', 'mark-4', 'mark-5', 'mark-6', 'mark-7', 'mark-42', 'mark-43', 'mark-44', 'mark-45', 'mark-46', 'mark-47', 'mark-50', 'mark-85']
  },
  {
    id: 'james-rhodes',
    name: 'James Rhodes',
    alias: 'War Machine / Iron Patriot',
    relationship: 'Tony\'s best friend and fellow armor wearer',
    description: 'Air Force officer and Tony\'s closest friend. Wears heavily weaponized Iron Man armor as War Machine, serving as the military liaison to the Avengers.',
    image: '/images/characters/rhodes.jpg',
    firstAppearance: 'Iron Man #118 (1979)',
    type: 'ally',
    associatedMovies: ['Iron Man 2', 'Iron Man 3', 'Avengers: Age of Ultron', 'Captain America: Civil War', 'Avengers: Infinity War', 'Avengers: Endgame'],
    armorWorn: ['war-machine']
  },
  {
    id: 'pepper-potts',
    name: 'Pepper Potts',
    alias: 'Rescue',
    relationship: 'Tony\'s love interest, CEO, and armor wearer',
    description: 'Brilliant businesswoman and CEO of Stark Industries. Became Rescue, a non-lethal armor-wearing hero focused on search and rescue operations.',
    image: '/images/characters/pepper-potts.jpg',
    firstAppearance: 'Tales of Suspense #45 (1963)',
    type: 'ally',
    associatedMovies: ['Iron Man', 'Iron Man 2', 'Iron Man 3', 'Avengers: Endgame'],
    armorWorn: ['rescue-armor']
  },
  {
    id: 'happy-hogan',
    name: 'Happy Hogan',
    alias: 'Happy',
    relationship: 'Tony\'s loyal bodyguard and friend',
    description: 'Former boxer turned Tony\'s head of security. Fiercely loyal and protective of Tony and Pepper, serving as their right-hand man in dangerous situations.',
    image: '/images/characters/happy.jpg',
    firstAppearance: 'Tales of Suspense #45 (1963)',
    type: 'ally',
    associatedMovies: ['Iron Man', 'Iron Man 2', 'Iron Man 3', 'Spider-Man: Homecoming', 'Spider-Man: Far From Home']
  },
  {
    id: 'jarvis',
    name: 'J.A.R.V.I.S.',
    alias: 'Edwin Jarvis / Vision',
    relationship: 'Tony\'s A.I. assistant',
    description: 'Tony\'s sophisticated artificial intelligence. Manages all armor systems and provides tactical support. Later sacrificed himself to save Wanda Maximoff, being reborn as Vision.',
    image: '/images/characters/jarvis.jpg',
    firstAppearance: 'Iron Man #35 (1971)',
    type: 'ally',
    associatedMovies: ['Iron Man', 'Iron Man 2', 'Iron Man 3', 'The Avengers']
  },
  {
    id: 'friday',
    name: 'F.R.I.D.A.Y.',
    alias: 'Friday',
    relationship: 'Tony\'s A.I. successor',
    description: 'Tony\'s replacement A.I. after Vision\'s departure. Manages armor systems, provides real-time data analysis, and serves as tactical support during missions.',
    image: '/images/characters/friday.jpg',
    firstAppearance: 'Avengers: Age of Ultron (2015)',
    type: 'ally',
    associatedMovies: ['Avengers: Age of Ultron', 'Captain America: Civil War', 'Spider-Man: Homecoming', 'Avengers: Infinity War', 'Avengers: Endgame']
  },
  {
    id: 'nick-fury',
    name: 'Nick Fury',
    alias: 'Director Fury',
    relationship: 'S.H.I.E.L.D. Director, Avengers founder',
    description: 'Strategic genius who recruited Tony into the Avengers. Director of S.H.I.E.L.D. and architect of the Avengers Initiative.',
    image: '/images/characters/nick-fury.jpg',
    firstAppearance: 'Iron Man (2008)',
    type: 'ally',
    associatedMovies: ['Iron Man', 'The Avengers', 'Avengers: Age of Ultron', 'Avengers: Infinity War', 'Spider-Man: Far From Home']
  },
  {
    id: 'steve-rogers',
    name: 'Steve Rogers',
    alias: 'Captain America',
    relationship: 'Avengers ally and conflicted partner',
    description: 'Super soldier and leader of the Avengers. Has both worked alongside Tony and opposed him, most notably during the conflict over the Sokovia Accords.',
    image: '/images/characters/steve-rogers.jpg',
    firstAppearance: 'Captain America: The First Avenger (2011)',
    type: 'neutral',
    associatedMovies: ['The Avengers', 'Avengers: Age of Ultron', 'Captain America: Civil War', 'Avengers: Endgame']
  },
  {
    id: 'thor',
    name: 'Thor Odinson',
    alias: 'Thor',
    relationship: 'Avengers ally and occasional adversary',
    description: 'God of Thunder and Prince of Asgard. Has battled Tony on multiple occasions but ultimately fights alongside him to protect Earth.',
    image: '/images/characters/thor.jpg',
    firstAppearance: 'Thor (2011)',
    type: 'ally',
    associatedMovies: ['The Avengers', 'Avengers: Age of Ultron', 'Avengers: Infinity War', 'Avengers: Endgame']
  },
  {
    id: 'bruce-banner',
    name: 'Bruce Banner',
    alias: 'Hulk',
    relationship: 'Scientist ally and controlled opponent',
    description: 'Brilliant physicist cursed with the Hulk transformation. Tony helped him after his transformations and partnered with him as scientific allies.',
    image: '/images/characters/bruce-banner.jpg',
    firstAppearance: 'The Incredible Hulk (2008)',
    type: 'ally',
    associatedMovies: ['The Avengers', 'Avengers: Age of Ultron', 'Avengers: Infinity War', 'Avengers: Endgame']
  },
  {
    id: 'natasha-romanoff',
    name: 'Natasha Romanoff',
    alias: 'Black Widow',
    relationship: 'Trusted Avengers teammate',
    description: 'Master spy and assassin turned Avenger. One of Tony\'s most reliable teammates, providing tactical expertise and unwavering support.',
    image: '/images/characters/natasha.jpg',
    firstAppearance: 'Iron Man 2 (2010)',
    type: 'ally',
    associatedMovies: ['Iron Man 2', 'The Avengers', 'Avengers: Age of Ultron', 'Captain America: Civil War', 'Avengers: Endgame']
  },
  {
    id: 'peter-parker',
    name: 'Peter Parker',
    alias: 'Spider-Man',
    relationship: 'Mentee and protégé',
    description: 'Young superhero mentored by Tony. Tony built him advanced armor and recruited him for major conflicts, treating him almost like a son.',
    image: '/images/characters/peter-parker.jpg',
    firstAppearance: 'Captain America: Civil War (2016)',
    type: 'ally',
    associatedMovies: ['Captain America: Civil War', 'Spider-Man: Homecoming', 'Avengers: Infinity War', 'Avengers: Endgame', 'Spider-Man: Far From Home']
  },
  {
    id: 'obadiah-stane',
    name: 'Obadiah Stane',
    alias: 'Iron Monger',
    relationship: 'Betrayer and first major enemy',
    description: 'Business partner who betrayed Tony and built the Iron Monger armor from the Mark I specifications. Tony\'s first major armored adversary.',
    image: '/images/characters/obadiah-stane.jpg',
    firstAppearance: 'Iron Man (2008)',
    type: 'enemy',
    associatedMovies: ['Iron Man']
  },
  {
    id: 'ivan-vanko',
    name: 'Ivan Vanko',
    alias: 'Whiplash',
    relationship: 'Vengeful adversary',
    description: 'Brilliant engineer seeking revenge against Tony for his father\'s death. Created powered armor with electrified whips, battling Iron Man in his own unique way.',
    image: '/images/characters/ivan-vanko.jpg',
    firstAppearance: 'Iron Man 2 (2010)',
    type: 'enemy',
    associatedMovies: ['Iron Man 2']
  },
  {
    id: 'aldrich-killian',
    name: 'Aldrich Killian',
    alias: 'The Mandarin',
    relationship: 'Terrorist manipulator',
    description: 'Brilliant scientist transformed by the Extremis virus. Orchestrated a terrorist campaign using Extremis-enhanced soldiers, forcing Tony to confront his demons.',
    image: '/images/characters/aldrich-killian.jpg',
    firstAppearance: 'Iron Man 3 (2013)',
    type: 'enemy',
    associatedMovies: ['Iron Man 3']
  },
  {
    id: 'justin-hammer',
    name: 'Justin Hammer',
    alias: 'Justin Hammer',
    relationship: 'Rival weapons manufacturer',
    description: 'Corrupt weapons dealer and Tony\'s industrial rival. Attempted to replicate Iron Man armor technology but lacked Tony\'s genius.',
    image: '/images/characters/justin-hammer.jpg',
    firstAppearance: 'Iron Man 2 (2010)',
    type: 'enemy',
    associatedMovies: ['Iron Man 2']
  },
  {
    id: 'ultron',
    name: 'Ultron',
    alias: 'Ultron',
    relationship: 'A.I. creation turned enemy',
    description: 'Artificial intelligence created by Tony and Bruce to protect Earth. Became sentient and destructive, nearly destroying humanity before being stopped.',
    image: '/images/characters/ultron.jpg',
    firstAppearance: 'Avengers: Age of Ultron (2015)',
    type: 'enemy',
    associatedMovies: ['Avengers: Age of Ultron']
  },
  {
    id: 'thanos',
    name: 'Thanos',
    alias: 'The Mad Titan',
    relationship: 'Ultimate adversary',
    description: 'Cosmic tyrant seeking to destroy half of all life. Tony\'s greatest enemy and the one who forced him to make the ultimate sacrifice.',
    image: '/images/characters/thanos.jpg',
    firstAppearance: 'Avengers: Infinity War (2018)',
    type: 'enemy',
    associatedMovies: ['Avengers: Infinity War', 'Avengers: Endgame']
  },
  {
    id: 'mandarin',
    name: 'The Mandarin',
    alias: 'Mandarin',
    relationship: 'Ancient warlord and primary threat',
    description: 'Mystical warlord possessing ten power rings of great strength. One of Iron Man\'s most formidable foes in the comics.',
    image: '/images/characters/mandarin.jpg',
    firstAppearance: 'Tales of Suspense #50 (1964)',
    type: 'enemy'
  },
  {
    id: 'ghost',
    name: 'Ava Starr',
    alias: 'Ghost',
    relationship: 'Antagonist with tragic backstory',
    description: 'Quantum researcher with quantum tunneling powers, making her intangible. Sought revenge against Tony for her father\'s death in a Stark Industries accident.',
    image: '/images/characters/ghost.jpg',
    firstAppearance: 'Ant-Man and the Wasp (2018)',
    type: 'enemy'
  }
];