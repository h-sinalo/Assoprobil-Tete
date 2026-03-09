export type Player = {
  rank: number
  name: string
  club: string
  points: number
  wins: number
  matches: number
}

export const players: Player[] = [
  { rank: 1, name: "Carlos Manhica", club: "Clube Recreativo de Tete", points: 850, wins: 28, matches: 35 },
  { rank: 2, name: "Joao Sitoe", club: "Clube Desportivo Moatize", points: 810, wins: 26, matches: 34 },
  { rank: 3, name: "Fernando Macamo", club: "Clube Recreativo de Tete", points: 760, wins: 23, matches: 32 },
  { rank: 4, name: "Alberto Cossa", club: "Associacao Desportiva Cahora Bassa", points: 720, wins: 21, matches: 30 },
  { rank: 5, name: "Manuel Tembe", club: "Clube Desportivo Moatize", points: 690, wins: 20, matches: 31 },
  { rank: 6, name: "Roberto Silva", club: "Clube Recreativo de Tete", points: 650, wins: 18, matches: 28 },
  { rank: 7, name: "Pedro Nhambirre", club: "Associacao Desportiva Cahora Bassa", points: 620, wins: 17, matches: 29 },
  { rank: 8, name: "Antonio Guebuza", club: "Clube Desportivo de Tete", points: 590, wins: 16, matches: 27 },
  { rank: 9, name: "Sergio Mondlane", club: "Clube Recreativo de Tete", points: 560, wins: 15, matches: 26 },
  { rank: 10, name: "David Chissano", club: "Clube Desportivo Moatize", points: 530, wins: 14, matches: 25 },
]
