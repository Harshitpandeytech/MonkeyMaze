import { motion, AnimatePresence } from "framer-motion";
import { GameNode, GameEdge, Level } from "@/data/gameData";
import { getNeighbors, getEdge } from "@/utils/pathfinding";
import monkeyImg from "@/assets/monkey.png";
import bananaImg from "@/assets/banana.png";
import { TranslateFn } from "@/lib/i18n";

interface GameBoardProps {
  level: Level;
  currentNode: string;
  visitedPath: string[];
  onNodeClick: (nodeId: string) => void;
  gameState: "playing" | "won" | "lost";
  t: TranslateFn;
}

const NODE_RADIUS = 28;

const GameBoard = ({ level, currentNode, visitedPath, onNodeClick, gameState, t }: GameBoardProps) => {
  const { nodes, edges } = level;
  const reachable = gameState === "playing" ? getNeighbors(edges, currentNode).filter((n) => !visitedPath.includes(n)) : [];

  // Convert percentage positions to SVG coordinates
  const toSvg = (node: GameNode) => ({
    x: node.x * 7 + 50,
    y: node.y * 5 + 40,
  });

  const nodeColors: Record<string, string> = {
    A: "#4ade80", B: "#60a5fa", C: "#f97316", D: "#a78bfa",
    E: "#ec4899", F: "#facc15", G: "#2dd4bf", H: "#f43f5e",
    I: "#818cf8", J: "#34d399",
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-2 py-1 md:px-4 md:py-2">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full"
        style={{ maxWidth: "1400px", maxHeight: "calc(100vh - 185px)", minHeight: "430px" }}
      >
        {/* Background */}
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(195, 75%, 85%)" />
            <stop offset="100%" stopColor="hsl(140, 40%, 80%)" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="0" y="0" width="800" height="500" rx="20" fill="url(#bgGrad)" />

        {/* Edges (vines) */}
        {edges.map((edge) => {
          const fromNode = nodes.find((n) => n.id === edge.from)!;
          const toNode = nodes.find((n) => n.id === edge.to)!;
          const from = toSvg(fromNode);
          const to = toSvg(toNode);
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const isTraversed = visitedPath.some((n, i) => {
            if (i === 0) return false;
            return visitedPath[i - 1] === edge.from && n === edge.to;
          });
          const isReachableEdge = currentNode === edge.from && reachable.includes(edge.to);

          return (
            <g key={`${edge.from}-${edge.to}`}>
              {/* Vine line */}
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isTraversed ? "#f5a623" : isReachableEdge ? "#4ade80" : "#6b8f71"}
                strokeWidth={isTraversed ? 4 : isReachableEdge ? 3 : 2}
                strokeLinecap="round"
                opacity={isTraversed ? 1 : isReachableEdge ? 0.9 : 0.4}
                strokeDasharray={isReachableEdge && !isTraversed ? "8 4" : "none"}
                initial={false}
                animate={{
                  strokeWidth: isTraversed ? 4 : isReachableEdge ? 3 : 2,
                  opacity: isTraversed ? 1 : isReachableEdge ? 0.9 : 0.4,
                }}
              />
              {/* Cost badge */}
              <g transform={`translate(${midX}, ${midY})`}>
                <rect
                  x="-18"
                  y="-12"
                  width="36"
                  height="24"
                  rx="8"
                  fill={isTraversed ? "#f5a623" : "hsl(45, 80%, 96%)"}
                  stroke={isTraversed ? "#d4891a" : "#ccc"}
                  strokeWidth="1.5"
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Fredoka"
                  fill={isTraversed ? "#fff" : "#555"}
                >
                  🍌{edge.cost}
                </text>
              </g>
              {/* Time badge (offset) */}
              <g transform={`translate(${midX + 12}, ${midY - 18})`}>
                <rect
                  x="-14"
                  y="-9"
                  width="28"
                  height="18"
                  rx="6"
                  fill="hsl(195, 75%, 90%)"
                  stroke="hsl(195, 50%, 70%)"
                  strokeWidth="1"
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="Fredoka"
                  fill="hsl(195, 50%, 35%)"
                >
                  ⏱{edge.time}
                </text>
              </g>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = toSvg(node);
          const isCurrent = node.id === currentNode;
          const isVisited = visitedPath.includes(node.id);
          const isClickable = reachable.includes(node.id);
          const isGoal = node.isGoal;
          const isStart = node.isStart;
          const color = nodeColors[node.id] || "#4ade80";

          return (
            <motion.g
              key={node.id}
              onClick={() => isClickable && onNodeClick(node.id)}
              style={{ cursor: isClickable ? "pointer" : "default" }}
              whileHover={isClickable ? { scale: 1.15 } : {}}
              whileTap={isClickable ? { scale: 0.9 } : {}}
            >
              {/* Outer ring */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_RADIUS + 6}
                fill="none"
                stroke={isCurrent ? "#f5a623" : isClickable ? "#4ade80" : "transparent"}
                strokeWidth={isCurrent ? 3 : 2}
                animate={
                  isCurrent
                    ? { r: [NODE_RADIUS + 6, NODE_RADIUS + 10, NODE_RADIUS + 6], opacity: [1, 0.6, 1] }
                    : isClickable
                    ? { r: [NODE_RADIUS + 6, NODE_RADIUS + 8, NODE_RADIUS + 6], opacity: [0.8, 1, 0.8] }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Node circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_RADIUS}
                fill={isVisited || isCurrent ? color : `${color}88`}
                stroke={isCurrent ? "#f5a623" : isVisited ? color : "#aaa"}
                strokeWidth={isCurrent ? 4 : 2.5}
                filter="url(#shadow)"
              />

              {/* Silver ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_RADIUS - 3}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />

              {/* Node label */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="20"
                fontWeight="700"
                fontFamily="Fredoka"
                fill="white"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
              >
                {node.label}
              </text>

              {/* Monkey on current node */}
              {isCurrent && (
                <motion.image
                  href={monkeyImg}
                  x={pos.x - 24}
                  y={pos.y - 55}
                  width="48"
                  height="48"
                  animate={{ y: [pos.y - 55, pos.y - 60, pos.y - 55] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Banana on goal node */}
              {isGoal && !isCurrent && (
                <motion.image
                  href={bananaImg}
                  x={pos.x - 18}
                  y={pos.y - 50}
                  width="36"
                  height="36"
                  animate={{ rotate: [-10, 10, -10], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y - 32}px` }}
                />
              )}

              {/* START label */}
              {isStart && (
                <text
                  x={pos.x}
                  y={pos.y + NODE_RADIUS + 16}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Fredoka"
                  fill="hsl(145, 55%, 35%)"
                >
                  {t("board.start")}
                </text>
              )}

              {/* GOAL label */}
              {isGoal && (
                <text
                  x={pos.x}
                  y={pos.y + NODE_RADIUS + 16}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Fredoka"
                  fill="hsl(42, 95%, 45%)"
                >
                  {t("board.goal")}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Game over overlays */}
        <AnimatePresence>
          {gameState === "won" && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {[...Array(12)].map((_, i) => (
                <motion.text
                  key={i}
                  x={60 + Math.random() * 680}
                  y={-20}
                  fontSize="24"
                  initial={{ y: -20, opacity: 1 }}
                  animate={{ y: 520, opacity: 0, rotate: 360 * (Math.random() > 0.5 ? 1 : -1) }}
                  transition={{ duration: 2 + Math.random() * 2, delay: i * 0.15 }}
                >
                  {["🎉", "⭐", "🍌", "🎊"][i % 4]}
                </motion.text>
              ))}
            </motion.g>
          )}
          {gameState === "lost" && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.rect
                x="0" y="0" width="800" height="500" rx="20"
                fill="rgba(0,0,0,0.3)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              {[...Array(20)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={40 + Math.random() * 720}
                  y1={-10}
                  x2={40 + Math.random() * 720 - 20}
                  y2={510}
                  stroke="hsl(195, 70%, 70%)"
                  strokeWidth="1.5"
                  opacity="0.5"
                  initial={{ y: -510 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default GameBoard;
