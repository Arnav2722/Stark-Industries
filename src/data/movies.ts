import { Movie } from '../types';

export const moviesData: Movie[] = [
  {
    id: 'iron-man-1',
    title: 'Iron Man',
    releaseDate: '2008-05-02',
    director: 'Jon Favreau',
    mainCast: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Terrence Howard', 'Jeff Bridges'],
    armor: ['mark-1', 'mark-2', 'mark-3'],
    villain: 'Obadiah Stane / Iron Monger',
    synopsis: 'After being captured by terrorists and forced to build weapons, Tony Stark escapes using a crude suit of armor. Returning home, he dedicates himself to perfecting the technology and becoming Iron Man to protect the world.',
    image: '/images/movies/iron-man-1.jpg'
  },
  {
    id: 'iron-man-2',
    title: 'Iron Man 2',
    releaseDate: '2010-05-07',
    director: 'Jon Favreau',
    mainCast: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Don Cheadle', 'Mickey Rourke', 'Scarlett Johansson'],
    armor: ['mark-4', 'mark-5', 'mark-6'],
    villain: 'Ivan Vanko / Whiplash & Justin Hammer',
    synopsis: 'Tony faces public pressure regarding the Iron Man technology while dealing with palladium poisoning. He must also contend with a vengeful enemy and a corrupt weapons manufacturer seeking his secrets.',
    image: '/images/movies/iron-man-2.jpg'
  },
  {
    id: 'iron-man-3',
    title: 'Iron Man 3',
    releaseDate: '2013-05-03',
    director: 'Shane Black',
    mainCast: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Don Cheadle', 'Guy Pearce', 'Ben Kingsley'],
    armor: ['mark-42', 'mark-43'],
    villain: 'Aldrich Killian / The Mandarin',
    synopsis: 'Suffering from PTSD after the Battle of New York, Tony faces a terrorist threat while struggling with his trauma. He must confront his demons and prove that he is more than just the suit.',
    image: '/images/movies/iron-man-3.jpg'
  },
  {
    id: 'the-avengers',
    title: 'The Avengers',
    releaseDate: '2012-05-04',
    director: 'Joss Whedon',
    mainCast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Chris Evans', 'Scarlett Johansson', 'Jeremy Renner', 'Mark Ruffalo', 'Samuel L. Jackson', 'Tom Hiddleston'],
    armor: ['mark-7'],
    villain: 'Loki & Chitauri Army',
    synopsis: 'When an alien army invades Earth, Tony and other superheroes must unite to defend the planet. Tony pilots the Mark VII during the climactic Battle of New York.',
    image: '/images/movies/avengers-1.jpg'
  },
  {
    id: 'avengers-age-ultron',
    title: 'Avengers: Age of Ultron',
    releaseDate: '2015-05-01',
    director: 'Joss Whedon',
    mainCast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Chris Evans', 'Scarlett Johansson', 'Jeremy Renner', 'Mark Ruffalo', 'James Spader'],
    armor: ['mark-43', 'mark-44', 'mark-45'],
    villain: 'Ultron',
    synopsis: 'Tony and Bruce create an artificial intelligence to protect Earth, but Ultron becomes sentient and threatens humanity. The Avengers must stop his plan to destroy mankind.',
    image: '/images/movies/avengers-2.jpg'
  },
  {
    id: 'civil-war',
    title: 'Captain America: Civil War',
    releaseDate: '2016-05-06',
    director: 'Anthony & Joe Russo',
    mainCast: ['Chris Evans', 'Robert Downey Jr.', 'Scarlett Johansson', 'Sebastian Stan', 'Don Cheadle', 'Tom Holland'],
    armor: ['mark-46'],
    villain: 'Helmut Zemo (internal conflict)',
    synopsis: 'The Avengers fracture over the Sokovia Accords. Tony supports government oversight while Steve opposes it, leading to an epic conflict between former allies.',
    image: '/images/movies/civil-war.jpg'
  },
  {
    id: 'infinity-war',
    title: 'Avengers: Infinity War',
    releaseDate: '2018-04-27',
    director: 'Anthony & Joe Russo',
    mainCast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Chris Evans', 'Mark Ruffalo', 'Chadwick Boseman', 'Tom Holland', 'Josh Brolin'],
    armor: ['mark-50'],
    villain: 'Thanos',
    synopsis: 'The Mad Titan Thanos seeks to collect all Infinity Stones to wipe out half the universe. Tony and the Avengers fight desperately on multiple fronts to stop him.',
    image: '/images/movies/infinity-war.jpg'
  },
  {
    id: 'endgame',
    title: 'Avengers: Endgame',
    releaseDate: '2019-04-26',
    director: 'Anthony & Joe Russo',
    mainCast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Chris Evans', 'Scarlett Johansson', 'Mark Ruffalo', 'Jeremy Renner', 'Paul Rudd'],
    armor: ['mark-85'],
    villain: 'Thanos (again)',
    synopsis: 'After Thanos\' devastating snap, the surviving Avengers discover a way to undo it. Tony must make the ultimate sacrifice to save the universe.',
    image: '/images/movies/endgame.jpg'
  }
];
