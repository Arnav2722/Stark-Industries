export interface Armor {
  id: string;
  name: string;
  mark?: string;
  category: 'mcu' | 'comics' | 'animation' | 'games';
  universe: string;
  medium: string;
  firstAppearance: string;
  purpose: string;
  technologies: string[];
  weapons: string[];
  abilities: string[];
  weaknesses: string[];
  appearances: string[];
  description: string;
  image: string;
  relatedArmor?: string[];
  specs?: ArmorSpecs;
}

export interface ArmorSpecs {
  height?: string;
  weight?: string;
  maxSpeed?: string;
  flightCeiling?: string;
  powerOutput?: string;
  operatingTime?: string;
  armorMaterial?: string;
  aiSystem?: string;
}

export interface Character {
  id: string;
  name: string;
  alias?: string;
  relationship: string;
  description: string;
  image: string;
  firstAppearance: string;
  type: 'ally' | 'enemy' | 'neutral';
  associatedMovies?: string[];
  armorWorn?: string[];
}

export interface Villain extends Character {
  type: 'enemy';
  threatLevel: 'low' | 'medium' | 'high' | 'extreme' | 'cosmic';
  powers: string[];
  defeatedBy: string;
  keyBattle: string;
  movieId: string;
}

export interface Technology {
  id: string;
  name: string;
  description: string;
  category: string;
  relatedArmor: string[];
  image: string;
  inventor?: string;
  technicalDetails?: string;
  firstIntroduced?: string;
}

export interface Movie {
  id: string;
  title: string;
  releaseDate: string;
  director: string;
  mainCast: string[];
  armor: string[];
  villain: string;
  villains?: Villain[];
  synopsis: string;
  image: string;
  poster?: string;
  boxOffice?: string;
  runtime?: string;
  keyScenes?: string[];
}

export interface TimelineEvent {
  id: string;
  armorId: string;
  year: string;
  title: string;
  description: string;
  significance: 'major' | 'milestone' | 'evolution';
}

export interface GalleryImage {
  id: string;
  url: string;
  category: 'armor' | 'tony-stark' | 'arc-reactor' | 'technology' | 'movies' | 'comics';
  title: string;
  description: string;
}

export interface AvengersTower {
  id: string;
  name: string;
  description: string;
  history: string[];
  floors: TowerFloor[];
  keyEvents: TowerEvent[];
  images: string[];
}

export interface TowerFloor {
  level: string;
  name: string;
  description: string;
  features: string[];
}

export interface TowerEvent {
  date: string;
  event: string;
  movie: string;
}