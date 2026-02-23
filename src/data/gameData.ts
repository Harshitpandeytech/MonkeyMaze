export interface GameNode {
  id: string;
  label: string;
  x: number; // percentage 0-100
  y: number;
  isStart?: boolean;
  isGoal?: boolean;
}

export interface GameEdge {
  from: string;
  to: string;
  cost: number; // banana energy
  time: number; // storm time
}

export interface Level {
  id: number;
  name: string;
  description: string;
  nodes: GameNode[];
  edges: GameEdge[];
  timeLimit: number;
  startNode: string;
  goalNode: string;
}

export const levels: Level[] = [
  {
    id: 1,
    name: "First Swing",
    description: "Learn the vines! Find the cheapest path to the banana.",
    nodes: [
      { id: "A", label: "A", x: 20, y: 25, isStart: true },
      { id: "B", label: "B", x: 80, y: 25 },
      { id: "C", label: "C", x: 50, y: 55 },
      { id: "D", label: "D", x: 80, y: 75, isGoal: true },
    ],
    edges: [
      { from: "A", to: "B", cost: 7, time: 3 },
      { from: "A", to: "C", cost: 2, time: 4 },
      { from: "B", to: "D", cost: 3, time: 2 },
      { from: "C", to: "B", cost: 1, time: 2 },
      { from: "C", to: "D", cost: 6, time: 3 },
    ],
    timeLimit: 10,
    startNode: "A",
    goalNode: "D",
  },
  {
    id: 2,
    name: "Vine Maze",
    description: "More trees, more choices! Watch the Banana Tax on each vine.",
    nodes: [
      { id: "A", label: "A", x: 15, y: 20, isStart: true },
      { id: "B", label: "B", x: 55, y: 15 },
      { id: "C", label: "C", x: 85, y: 35 },
      { id: "D", label: "D", x: 50, y: 50 },
      { id: "E", label: "E", x: 15, y: 65 },
      { id: "F", label: "F", x: 75, y: 75, isGoal: true },
    ],
    edges: [
      { from: "A", to: "B", cost: 4, time: 2 },
      { from: "A", to: "E", cost: 1, time: 3 },
      { from: "B", to: "C", cost: 3, time: 2 },
      { from: "B", to: "D", cost: 5, time: 1 },
      { from: "C", to: "F", cost: 2, time: 2 },
      { from: "D", to: "C", cost: 1, time: 2 },
      { from: "D", to: "F", cost: 8, time: 1 },
      { from: "E", to: "D", cost: 2, time: 2 },
      { from: "E", to: "F", cost: 10, time: 3 },
    ],
    timeLimit: 12,
    startNode: "A",
    goalNode: "F",
  },
  {
    id: 3,
    name: "Storm's Coming",
    description: "Tight time limit! Greedy choices might not work here...",
    nodes: [
      { id: "A", label: "A", x: 10, y: 30, isStart: true },
      { id: "B", label: "B", x: 35, y: 10 },
      { id: "C", label: "C", x: 65, y: 10 },
      { id: "D", label: "D", x: 35, y: 55 },
      { id: "E", label: "E", x: 65, y: 55 },
      { id: "F", label: "F", x: 50, y: 80 },
      { id: "G", label: "G", x: 85, y: 40 },
      { id: "H", label: "H", x: 90, y: 75, isGoal: true },
    ],
    edges: [
      { from: "A", to: "B", cost: 2, time: 1 },
      { from: "A", to: "D", cost: 5, time: 2 },
      { from: "B", to: "C", cost: 3, time: 2 },
      { from: "B", to: "D", cost: 1, time: 3 },
      { from: "C", to: "G", cost: 2, time: 1 },
      { from: "D", to: "E", cost: 4, time: 1 },
      { from: "D", to: "F", cost: 2, time: 2 },
      { from: "E", to: "H", cost: 3, time: 2 },
      { from: "E", to: "G", cost: 1, time: 1 },
      { from: "F", to: "H", cost: 7, time: 1 },
      { from: "G", to: "H", cost: 2, time: 2 },
    ],
    timeLimit: 8,
    startNode: "A",
    goalNode: "H",
  },
  {
    id: 4,
    name: "Jungle Master",
    description: "The ultimate challenge! Greedy will fail — think ahead!",
    nodes: [
      { id: "A", label: "A", x: 8, y: 40, isStart: true },
      { id: "B", label: "B", x: 25, y: 15 },
      { id: "C", label: "C", x: 50, y: 10 },
      { id: "D", label: "D", x: 25, y: 60 },
      { id: "E", label: "E", x: 50, y: 45 },
      { id: "F", label: "F", x: 75, y: 20 },
      { id: "G", label: "G", x: 50, y: 75 },
      { id: "H", label: "H", x: 75, y: 55 },
      { id: "I", label: "I", x: 75, y: 80 },
      { id: "J", label: "J", x: 92, y: 50, isGoal: true },
    ],
    edges: [
      { from: "A", to: "B", cost: 1, time: 1 },
      { from: "A", to: "D", cost: 3, time: 1 },
      { from: "B", to: "C", cost: 2, time: 1 },
      { from: "B", to: "E", cost: 4, time: 1 },
      { from: "C", to: "F", cost: 1, time: 1 },
      { from: "D", to: "E", cost: 1, time: 1 },
      { from: "D", to: "G", cost: 5, time: 1 },
      { from: "E", to: "F", cost: 3, time: 1 },
      { from: "E", to: "H", cost: 2, time: 1 },
      { from: "F", to: "J", cost: 4, time: 2 },
      { from: "G", to: "I", cost: 2, time: 1 },
      { from: "H", to: "J", cost: 1, time: 1 },
      { from: "I", to: "J", cost: 6, time: 1 },
      { from: "I", to: "H", cost: 1, time: 1 },
      { from: "G", to: "H", cost: 3, time: 2 },
    ],
    timeLimit: 8,
    startNode: "A",
    goalNode: "J",
  },
];
