import { motion } from "framer-motion";
import { levels, Level } from "@/data/gameData";
import { TranslateFn } from "@/lib/i18n";
import monkeyImg from "@/assets/KKK.png";

interface LevelSelectProps {
  onSelect: (level: Level) => void;
  completedLevels: number[];
  onBack: () => void;
  t: TranslateFn;
}

const LevelSelect = ({ onSelect, completedLevels, onBack, t }: LevelSelectProps) => {
  return (
    <div className="min-h-screen jungle-gradient flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto">
      <motion.div
        className="title-banner px-6 py-3 mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground">
          {t("levels.title")}
        </h2>
      </motion.div>

      <div className="w-full max-w-7xl px-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {levels.map((level, i) => {
            const isCompleted = completedLevels.includes(level.id);
            const isLocked = i > 0 && !completedLevels.includes(levels[i - 1].id);

            return (
              <motion.button
                key={level.id}
                onClick={() => !isLocked && onSelect(level)}
                className={`game-card p-6 text-left cursor-pointer transition-all h-full ${
                  isLocked ? "opacity-50 cursor-not-allowed" : ""
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={!isLocked ? { scale: 1.04, y: -4 } : {}}
                whileTap={!isLocked ? { scale: 0.97 } : {}}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-foreground">
                    {isLocked ? "🔒" : isCompleted ? "⭐" : "🌴"} {t("levels.level", { id: level.id })}
                  </span>
                  <span className="text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full font-semibold">
                    {t("levels.trees", { count: level.nodes.length })}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{t(`level.${level.id}.name`)}</h3>
                <p className="text-muted-foreground text-sm mb-3">{t(`level.${level.id}.description`)}</p>
                <div className="flex gap-4 text-sm font-medium">
                  <span className="text-storm-orange">{t("levels.timeLimit", { seconds: level.timeLimit })}</span>
                  <span className="text-primary">{t("levels.vines", { count: level.edges.length })}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.div
        className="game-card mt-6 max-w-7xl w-full p-5 md:p-7"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{t("levels.howTitle")}</h3>
        <p className="text-sm md:text-base text-foreground/90 mb-4 leading-relaxed">
          <span className="font-semibold text-secondary">{t("levels.aimLabel")}</span> {t("levels.aim")}
        </p>

        <div className="grid gap-2 mb-5">
          <p className="text-sm md:text-base text-muted-foreground">• {t("levels.step1")}</p>
          <p className="text-sm md:text-base text-muted-foreground">• {t("levels.step2")}</p>
          <p className="text-sm md:text-base text-muted-foreground">• {t("levels.step3")}</p>
        </div>

        <div className="rounded-xl border border-border/80 bg-background/70 p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-3">{t("levels.simulation")}</p>
          <div className="relative h-16 md:h-20 overflow-hidden">
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-2 rounded-full bg-muted" />

            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/80"
                style={{ left: `${22 + index * 20}%` }}
              />
            ))}

            <motion.img
              src={monkeyImg}
              alt="Jaggu"
              className="absolute top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 object-contain"
              animate={{ left: ["5%", "25%", "45%", "65%", "85%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.img
              src="/bnanna.png"
              alt="Banana"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 object-contain"
              animate={{ scale: [1, 1.14, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />

            <motion.span
              className="absolute left-2 top-2 text-[10px] md:text-xs font-semibold text-storm-orange"
              animate={{ opacity: [1, 0.45, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            >
              ⏱ {t("levels.timeHint")}
            </motion.span>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={onBack}
        className="mt-6 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-lg cursor-pointer border-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {t("levels.back")}
      </motion.button>
    </div>
  );
};

export default LevelSelect;
