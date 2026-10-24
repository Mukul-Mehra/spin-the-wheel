export interface Prize {
  id: number;
  label: string;
  shortLabel: string;
  /** Probability weight — higher = more likely */
  weight: number;
  /** Hex color for the wheel segment */
  color: string;
  /** Text color for readability on the segment */
  textColor: string;
  icon: string;
}

export const PRIZES: Prize[] = [
  { id: 1, label: 'Thread Work',        shortLabel: 'Thread',     weight: 16, color: '#c44569', textColor: '#fff', icon: '🧵' },
  { id: 2, label: 'Bleach',             shortLabel: 'Bleach',     weight: 16, color: '#e0709a', textColor: '#4a0e1f', icon: '✨' },
  { id: 3, label: 'D-Tan Pack',         shortLabel: 'D-Tan',      weight: 14, color: '#f59e0b', textColor: '#4a0e1f', icon: '🌻' },
  { id: 4, label: 'Clean Up',           shortLabel: 'Clean Up',   weight: 14, color: '#fbbf24', textColor: '#4a0e1f', icon: '🧖' },
  { id: 5, label: 'Hand Wax (Full)',    shortLabel: 'Hand Wax',   weight: 12, color: '#9c2747', textColor: '#fff', icon: '🤲' },
  { id: 6, label: 'Hair Straightening', shortLabel: 'Straighten', weight: 10, color: '#7c1d3d', textColor: '#fff', icon: '💇' },
  { id: 7, label: 'Hair Crimping',      shortLabel: 'Crimping',   weight: 8,  color: '#6b1530', textColor: '#fbbf24', icon: '〰️' },
  { id: 8, label: 'Haircut',            shortLabel: 'Haircut',    weight: 8,  color: '#f0a5b8', textColor: '#4a0e1f', icon: '✂️' },
  { id: 9, label: 'Facial (Skin Type)', shortLabel: 'Facial',     weight: 2,  color: '#d4a017', textColor: '#4a0e1f', icon: '💆' },
];

export const GREETINGS = [
  'Happy Karva Chauth! You\'ve won',
  'Blessings of the moon! Enjoy your',
  'May your glow shine bright! You won',
  'Festive cheers! Your prize is',
  'A gift from Naturals! You\'ve won',
];

export function getRandomGreeting(): string {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

/**
 * Pick a prize index based on weighted probabilities.
 */
export function pickWeightedPrize(): number {
  const totalWeight = PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * totalWeight;
  for (let i = 0; i < PRIZES.length; i++) {
    r -= PRIZES[i].weight;
    if (r <= 0) return i;
  }
  return PRIZES.length - 1;
}
