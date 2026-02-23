import { motion } from "framer-motion";
import { TranslateFn } from "@/lib/i18n";

interface GameHUDProps {
  timeSpent: number;
  timeLimit: number;
  energySpent: number;
  path: string[];
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  t: TranslateFn;
}

const GameHUD = ({ timeSpent, timeLimit, energySpent, path, onReset, onUndo, canUndo, t }: GameHUDProps) => {
  const timeRatio = timeSpent / timeLimit;
  const isUrgent = timeRatio > 0.7;

  return (
    <div className="w-full px-4 py-3">
      <div className="game-card p-3 md:p-4 flex flex-wrap items-center gap-3 md:gap-6">
        {/* Storm timer */}
        <div className="flex items-center gap-2 flex-1 min-w-[150px]">
          <span className="text-xl">⛈️</span>
          <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden relative">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: isUrgent
                  ? "linear-gradient(90deg, hsl(25, 90%, 55%), hsl(0, 80%, 55%))"
                  : "linear-gradient(90deg, hsl(145, 55%, 35%), hsl(42, 95%, 55%))",
              }}
              animate={{ width: `${timeRatio * 100}%` }}
              transition={{ duration: 0.3 }}
            />
            {isUrgent && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ background: "hsl(0, 80%, 55%, 0.3)" }}
              />
            )}
          </div>
          <span className={`text-sm font-bold min-w-[50px] text-right ${isUrgent ? "text-storm-red" : "text-foreground"}`}>
            {timeSpent}/{timeLimit}
          </span>
        </div>

        {/* Energy counter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xl">🍌</span>
          <span className="text-lg font-bold text-secondary">{energySpent}</span>
        </div>

        {/* Path breadcrumb */}
        <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground overflow-x-auto max-w-[200px] md:max-w-none">
          {path.map((node, i) => (
            <span key={i} className="flex items-center gap-1 whitespace-nowrap">
              {i > 0 && <span className="text-secondary">→</span>}
              <span className={i === path.length - 1 ? "text-primary font-bold" : ""}>
                {i === 0 ? "🐒" : ""}{node}
              </span>
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-auto">
          <motion.button
            onClick={onUndo}
            disabled={!canUndo}
            className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground font-semibold text-sm cursor-pointer border-none disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={canUndo ? { scale: 1.05 } : {}}
            whileTap={canUndo ? { scale: 0.95 } : {}}
          >
            {t("hud.undo")}
          </motion.button>
          <motion.button
            onClick={onReset}
            className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm cursor-pointer border-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("hud.reset")}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
