import { AvengersTower } from '../types';

export const avengersTower: AvengersTower = {
  id: 'avengers-tower',
  name: 'Avengers Tower',
  description: 'The iconic headquarters of the Avengers, located at 200 Park Avenue, New York City. Originally Stark Tower, it became the global hub for the Avengers\' operations.',
  history: [
    'Built by Tony Stark and completed in 2011 as Stark Industries\' new headquarters.',
    'After the Battle of New York, Tony funded repairs and converted it to Avengers Tower.',
    'Used as the primary base during the Sokovia Accords era and the Civil War.',
    'After the events of Avengers: Infinity War, Tony and the team relocated to upstate New York.',
    'In Avengers: Endgame, the tower was destroyed during the final battle with Thanos.',
    'Later rebuilt by the Avengers as a memorial and operational base.',
  ],
  floors: [
    {
      level: 'Roof',
      name: 'Landing Pad',
      description: 'Helipad and landing zone for the Avengers\' aircraft and armor deployment.',
      features: ['Helicopter pad', 'Quinjet landing zone', 'Armor launch bays', 'Defensive turrets']
    },
    {
      level: '50th Floor',
      name: 'Command Center',
      description: 'The main operations hub with advanced communications and tactical displays.',
      features: ['Global surveillance network', 'Mission briefing room', 'Real-time tactical data', 'F.R.I.D.A.Y. control systems']
    },
    {
      level: '30th Floor',
      name: 'Laboratories',
      description: 'Tony Stark\'s R&D wing where armor technology is developed and tested.',
      features: ['Armor workshop', 'Repulsor testing', 'Nano-tech lab', '3D printers', 'Extremis research']
    },
    {
      level: '20th Floor',
      name: 'Living Quarters',
      description: 'Residential areas for the Avengers team members.',
      features: ['Tony\'s penthouse', 'Steve Rogers\' room', 'Natasha\'s suite', 'Common areas', 'Kitchen/Recreation']
    },
    {
      level: '10th Floor',
      name: 'Armory',
      description: 'Secure storage for all Avengers equipment and armor systems.',
      features: ['Iron Legion bays', 'War Machine storage', 'Weapon lockers', 'Hulkbuster hangar', 'Quinjet maintenance']
    },
    {
      level: 'Ground Floor',
      name: 'Lobby',
      description: 'The public entrance with Stark Industries branding.',
      features: ['Reception', 'Stark Industries displays', 'Security checkpoints', 'Visitor management']
    },
    {
      level: 'Basement',
      name: 'Secure Vault',
      description: 'Underground storage for sensitive technology and artifacts.',
      features: ['Tesseract storage', 'Scepter vault', 'Pym particles', 'Vibranium stock', 'Quantum tunnel']
    },
  ],
  keyEvents: [
    {
      date: '2011',
      event: 'Stark Tower opens as Stark Industries headquarters',
      movie: 'Iron Man 2'
    },
    {
      date: '2012',
      event: 'Becomes Avengers Tower after Battle of New York',
      movie: 'The Avengers'
    },
    {
      date: '2015',
      event: 'Ultron\'s drone army attacks during Sokovia battle',
      movie: 'Avengers: Age of Ultron'
    },
    {
      date: '2016',
      event: 'Sokovia Accords signed, tower becomes UN-controlled',
      movie: 'Captain America: Civil War'
    },
    {
      date: '2018',
      event: 'Tony and team relocate to upstate New York',
      movie: 'Avengers: Infinity War'
    },
    {
      date: '2019',
      event: 'Tower destroyed in final battle with Thanos',
      movie: 'Avengers: Endgame'
    },
    {
      date: '2023',
      event: 'Tower rebuilt as memorial and new Avengers base',
      movie: 'Avengers: Endgame'
    }
  ],
  images: [
    '/images/tower/exterior.jpg',
    '/images/tower/command-center.jpg',
    '/images/tower/laboratory.jpg',
    '/images/tower/armory.jpg',
    '/images/tower/lobby.jpg',
    '/images/tower/ruins.jpg'
  ]
};