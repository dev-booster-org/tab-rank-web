import type { GameTypes } from '../types'

type Option = {
  label: string
  value: GameTypes
}

export const gameTypeOptions: Option[] = [
  { label: 'Estratégia', value: 'strategy' },
  { label: 'Cartas', value: 'card' },
  { label: 'Dados', value: 'dice' },
  { label: 'Festa', value: 'party' },
  { label: 'Família', value: 'family' },
  { label: 'Trivia', value: 'trivia' },
  { label: 'Cooperativo', value: 'cooperative' },
  { label: 'Competitivo', value: 'competitive' },
  { label: 'Abstrato', value: 'abstract' },
  { label: 'Quebra-cabeça', value: 'puzzle' },
  { label: 'Aventura', value: 'adventure' },
  { label: 'RPG', value: 'rpg' },
  { label: 'Economia', value: 'economy' },
  { label: 'Wargame', value: 'wargame' },
  { label: 'Destreza', value: 'dexterity' },
  { label: 'Dedução Social', value: 'social_deduction' },
]
