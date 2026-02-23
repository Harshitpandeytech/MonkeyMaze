import { GameEdge } from "@/data/gameData";

export interface PathResult {
  path: string[];
  totalCost: number;
  totalTime: number;
}

// Build adjacency from edges (directed)
function buildAdj(edges: GameEdge[]): Map<string, { to: string; cost: number; time: number }[]> {
  const adj = new Map<string, { to: string; cost: number; time: number }[]>();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from)!.push({ to: e.to, cost: e.cost, time: e.time });
  }
  return adj;
}

// Find all paths from start to goal using DFS
export function findAllPaths(
  edges: GameEdge[],
  start: string,
  goal: string
): PathResult[] {
  const adj = buildAdj(edges);
  const results: PathResult[] = [];

  function dfs(current: string, path: string[], cost: number, time: number, visited: Set<string>) {
    if (current === goal) {
      results.push({ path: [...path], totalCost: cost, totalTime: time });
      return;
    }
    const neighbors = adj.get(current) || [];
    for (const n of neighbors) {
      if (!visited.has(n.to)) {
        visited.add(n.to);
        path.push(n.to);
        dfs(n.to, path, cost + n.cost, time + n.time, visited);
        path.pop();
        visited.delete(n.to);
      }
    }
  }

  const visited = new Set([start]);
  dfs(start, [start], 0, 0, visited);
  return results;
}

// Get the optimal path (lowest cost within time limit)
export function getOptimalPath(
  edges: GameEdge[],
  start: string,
  goal: string,
  timeLimit: number
): PathResult | null {
  const all = findAllPaths(edges, start, goal);
  const valid = all.filter((p) => p.totalTime <= timeLimit);
  if (valid.length === 0) return null;
  valid.sort((a, b) => a.totalCost - b.totalCost);
  return valid[0];
}

// Get edge cost/time between two adjacent nodes
export function getEdge(edges: GameEdge[], from: string, to: string): GameEdge | undefined {
  return edges.find((e) => e.from === from && e.to === to);
}

// Get reachable neighbors from a node
export function getNeighbors(edges: GameEdge[], nodeId: string): string[] {
  return edges.filter((e) => e.from === nodeId).map((e) => e.to);
}
