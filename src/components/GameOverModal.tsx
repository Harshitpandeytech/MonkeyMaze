import { motion, AnimatePresence } from "framer-motion";
import { PathResult, findAllPaths } from "@/utils/pathfinding";
import { Level } from "@/data/gameData";
import { TranslateFn } from "@/lib/i18n";

interface GameOverModalProps {
  show: boolean;
  gameState: "won" | "lost";
  playerPath: string[];
  playerCost: number;
  playerTime: number;
  optimalPath: PathResult | null;
  level: Level;
  onReplay: () => void;
  onNextLevel: () => void;
  onShowPostLevel: () => void;
  onShowTeaching: () => void;
  hasNextLevel: boolean;
  t: TranslateFn;
}

const GameOverModal = ({
  show,
  gameState,
  playerPath,
  playerCost,
  playerTime,
  optimalPath,
  level,
  onReplay,
  onNextLevel,
  onShowPostLevel,
  onShowTeaching,
  hasNextLevel,
  t,
}: GameOverModalProps) => {
  if (!show) return null;

  const isOptimal = optimalPath && playerCost === optimalPath.totalCost;
  const isLost = gameState === "lost";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="game-card p-6 md:p-8 max-w-md w-full text-center"
          initial={{ scale: 0.7, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          {/* Result emoji */}
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}
          >
            {isLost ? "⛈️" : isOptimal ? "🎉" : "🤔"}
          </motion.div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {isLost
              ? t("gameOver.title.lost")
              : isOptimal
              ? t("gameOver.title.optimal")
              : t("gameOver.title.won")}
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground mb-4">
            {isLost
              ? t("gameOver.subtitle.lost")
              : isOptimal
              ? t("gameOver.subtitle.optimal")
              : t("gameOver.subtitle.won")}
          </p>

          {/* Stats */}
          {!isLost && (
            <div className="bg-muted rounded-xl p-4 mb-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t("gameOver.yourPath")}</span>
                <span className="font-bold text-foreground">{playerPath.join(" → ")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t("gameOver.energy")}</span>
                <span className="font-bold text-secondary">{playerCost}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t("gameOver.time")}</span>
                <span className="font-bold text-foreground">{playerTime}/{level.timeLimit}</span>
              </div>
              {optimalPath && !isOptimal && (
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t("gameOver.bestPath")}</span>
                    <span className="font-bold text-primary">{optimalPath.path.join(" → ")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t("gameOver.bestEnergy")}</span>
                    <span className="font-bold text-primary">{optimalPath.totalCost}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-accent/40 rounded-xl p-4 mb-4 text-left">
            <h3 className="text-sm md:text-base font-bold text-foreground mb-1">
              {t("optimization.title")}
            </h3>
            <p className="text-xs md:text-sm text-foreground/90 leading-relaxed">
              {t(`optimization.level.${level.id}`)}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <motion.button
              onClick={onShowTeaching}
              className="w-full px-4 py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-lg cursor-pointer border-none"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("gameOver.how")}
            </motion.button>
            <div className="flex gap-3">
              <motion.button
                onClick={onReplay}
                className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold cursor-pointer border-none"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("gameOver.replay")}
              </motion.button>
              {hasNextLevel && !isLost && (
                <motion.button
                  onClick={onNextLevel}
                  className="flex-1 px-4 py-3 rounded-xl title-banner text-secondary-foreground font-semibold cursor-pointer border-none"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t("gameOver.nextLevel")}
                </motion.button>
              )}
              {!hasNextLevel && !isLost && level.id === 4 && (
                <motion.button
                  onClick={onShowPostLevel}
                  className="flex-1 px-4 py-3 rounded-xl title-banner text-secondary-foreground font-semibold cursor-pointer border-none"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t("gameOver.deepDive")}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameOverModal;
