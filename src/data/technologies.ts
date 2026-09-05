import { Technology } from '../types';

export const technologiesData: Technology[] = [
  {
    id: 'arc-reactor',
    name: 'Arc Reactor',
    description: 'Power source for all Iron Man armor. The first generation caused palladium poisoning. Later versions use stable elements, providing unlimited clean energy.',
    category: 'Power Systems',
    relatedArmor: ['mark-1', 'mark-2', 'mark-3', 'mark-4', 'mark-5', 'mark-6', 'mark-7', 'mark-42', 'mark-43', 'mark-44', 'mark-45', 'mark-46', 'mark-47', 'mark-50', 'mark-85'],
    image: '/images/tech/arc-reactor.jpg'
  },
  {
    id: 'repulsors',
    name: 'Repulsor Technology',
    description: 'Energy projection system that fires concentrated repulsive energy blasts. Forms the primary weapon system across all Iron Man suits.',
    category: 'Weapons',
    relatedArmor: ['mark-2', 'mark-3', 'mark-4', 'mark-5', 'mark-6', 'mark-7', 'mark-42', 'mark-43', 'mark-44', 'mark-45', 'mark-46', 'mark-47', 'mark-50', 'mark-85'],
    image: '/images/tech/repulsors.jpg'
  },
  {
    id: 'unibeam',
    name: 'Unibeam',
    description: 'Concentrated energy beam fired from the chest piece. Provides massive damage output but requires significant power.',
    category: 'Weapons',
    relatedArmor: ['mark-3', 'mark-4', 'mark-5', 'mark-6', 'mark-7', 'mark-42', 'mark-43', 'mark-45', 'mark-46', 'mark-47', 'mark-50', 'mark-85'],
    image: '/images/tech/unibeam.jpg'
  },
  {
    id: 'jarvis',
    name: 'J.A.R.V.I.S.',
    description: 'Just A Rather Very Intelligent System. Tony\'s first artificial intelligence that manages all armor systems and provides tactical analysis.',
    category: 'AI Systems',
    relatedArmor: ['mark-7', 'mark-42', 'mark-43', 'mark-44', 'mark-45', 'mark-46', 'mark-47'],
    image: '/images/tech/jarvis.jpg'
  },
  {
    id: 'friday',
    name: 'F.R.I.D.A.Y.',
    description: 'Facial Recognition Identity and Integrated Detection Analysis. Successor AI to J.A.R.V.I.S., providing improved processing and tactical support.',
    category: 'AI Systems',
    relatedArmor: ['mark-45', 'mark-46', 'mark-47', 'mark-50', 'mark-85'],
    image: '/images/tech/friday.jpg'
  },
  {
    id: 'extremis',
    name: 'Extremis Virus',
    description: 'Bio-integrative technology that allows armor to be stored subdermal and deployed mentally. Provides self-healing and enhanced capabilities.',
    category: 'Bio-Technology',
    relatedArmor: ['extremis-armor', 'bleeding-edge', 'endo-sym'],
    image: '/images/tech/extremis.jpg'
  },
  {
    id: 'nano-technology',
    name: 'Nano-Technology',
    description: 'Revolutionary technology using programmable nanites stored in a housing unit. Can form any weapon or tool on demand with instant deployment.',
    category: 'Advanced Materials',
    relatedArmor: ['mark-50', 'mark-85'],
    image: '/images/tech/nano-technology.jpg'
  },
  {
    id: 'bleeding-edge',
    name: 'Bleeding Edge Armor System',
    description: 'Ultimate evolution of nano-tech. Made of nano-machines integrated into Tony\'s body, deployable through thought alone.',
    category: 'Bio-Technology',
    relatedArmor: ['bleeding-edge', 'mark-50', 'mark-85'],
    image: '/images/tech/bleeding-edge.jpg'
  },
  {
    id: 'flight-systems',
    name: 'Flight Systems',
    description: 'Repulsor-based flight propulsion. Provides supersonic speeds and high-altitude capability. Later systems include hover mode and vertical takeoff.',
    category: 'Propulsion',
    relatedArmor: ['mark-2', 'mark-3', 'mark-4', 'mark-5', 'mark-6', 'mark-7', 'mark-42', 'mark-43', 'mark-45', 'mark-46', 'mark-47', 'mark-50', 'mark-85'],
    image: '/images/tech/flight-systems.jpg'
  },
  {
    id: 'hud',
    name: 'Heads-Up Display (HUD)',
    description: 'Advanced visual interface providing real-time tactical information, targeting data, and system diagnostics to the wearer.',
    category: 'Systems',
    relatedArmor: ['mark-4', 'mark-5', 'mark-6', 'mark-7', 'mark-42', 'mark-43', 'mark-45', 'mark-46', 'mark-47', 'mark-50', 'mark-85'],
    image: '/images/tech/hud.jpg'
  },
  {
    id: 'iron-legion',
    name: 'Iron Legion',
    description: 'Unmanned armor drones remotely piloted by J.A.R.V.I.S. Used for large-scale operations and providing backup during critical situations.',
    category: 'Systems',
    relatedArmor: ['mark-42', 'mark-43', 'mark-45'],
    image: '/images/tech/iron-legion.jpg'
  },
  {
    id: 'remote-deployment',
    name: 'Remote Armor Deployment',
    description: 'Prehensile technology allowing armor pieces to fly independently and assemble around the wearer mid-air through remote control or mental command.',
    category: 'Systems',
    relatedArmor: ['mark-7', 'mark-42', 'mark-43', 'mark-44', 'mark-50'],
    image: '/images/tech/remote-deployment.jpg'
  },
  {
    id: 'energy-weapons',
    name: 'Energy Weapons',
    description: 'Various directed energy weapons including repulsor blasts, lasers, and pulse bolts. Customizable based on tactical needs.',
    category: 'Weapons',
    relatedArmor: ['mark-3', 'mark-4', 'mark-5', 'mark-6', 'mark-7', 'mark-42', 'mark-43', 'mark-45', 'mark-46', 'mark-47', 'mark-50', 'mark-85'],
    image: '/images/tech/energy-weapons.jpg'
  },
  {
    id: 'targeting-systems',
    name: 'Advanced Targeting Systems',
    description: 'AI-assisted targeting providing precision accuracy for all weapon systems. Includes threat assessment and tactical recommendations.',
    category: 'Systems',
    relatedArmor: ['mark-6', 'mark-7', 'mark-42', 'mark-43', 'mark-45', 'mark-46', 'mark-47', 'mark-50', 'mark-85'],
    image: '/images/tech/targeting.jpg'
  },
  {
    id: 'gold-titanium',
    name: 'Gold-Titanium Alloy',
    description: 'Advanced composite material providing superior strength-to-weight ratio. Standard construction material for modern armor.',
    category: 'Materials',
    relatedArmor: ['mark-3', 'mark-4', 'mark-5', 'mark-6', 'mark-7', 'mark-42', 'mark-43', 'mark-45', 'mark-46'],
    image: '/images/tech/materials.jpg'
  }
];
