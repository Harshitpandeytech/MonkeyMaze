import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { findAllPaths, PathResult } from "@/utils/pathfinding";
import { Level } from "@/data/gameData";
import { TranslateFn } from "@/lib/i18n";

interface TeachingModalProps {
  show: boolean;
  onClose: () => void;
  level: Level;
  t: TranslateFn;
}

const TeachingModal = ({ show, onClose, level, t }: TeachingModalProps) => {
  const [step, setStep] = useState(0);

  if (!show) return null;

  const allPaths = findAllPaths(level.edges, level.startNode, level.goalNode);
  const validPaths = allPaths.filter((p) => p.totalTime <= level.timeLimit);
  const sortedValid = [...validPaths].sort((a, b) => a.totalCost - b.totalCost);
  const optimal = sortedValid[0] || null;

  const steps = [
    {
      title: t("teaching.step1.title"),
      emoji: "🔍",
      description: t("teaching.step1.description"),
      content: allPaths,
      highlight: null as string[] | null,
    },
    {
      title: t("teaching.step2.title"),
      emoji: "⏱️",
      description: t("teaching.step2.description", { limit: level.timeLimit }),
      content: allPaths,
      highlight: validPaths.map((p) => p.path.join("→")),
    },
    {
      title: t("teaching.step3.title"),
      emoji: "🍌",
      description: t("teaching.step3.description"),
      content: sortedValid,
      highlight: optimal ? [optimal.path.join("→")] : null,
    },
  ];

  const currentStep = steps[step];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="game-card p-6 md:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">{t("teaching.title")}</h2>
          <p className="text-muted-foreground text-sm mb-4">{t("teaching.subtitle")}</p>

          {/* Step indicator */}
          <div className="flex gap-2 mb-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-secondary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-foreground mb-1">
                {currentStep.emoji} {currentStep.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">{currentStep.description}</p>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {currentStep.content.map((path, i) => {
                  const pathKey = path.path.join("→");
                  const isValid = currentStep.highlight === null || currentStep.highlight.includes(pathKey);
                  const isBest = step === 2 && i === 0;
                  const isOverTime = path.totalTime > level.timeLimit;

                  return (
                    <motion.div
                      key={pathKey}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isBest
                          ? "border-secondary bg-secondary/10"
                          : step === 1 && !isValid
                          ? "border-storm-red/30 bg-storm-red/5 line-through opacity-50"
                          : "border-border bg-muted/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm text-foreground">
                          {path.path.join(" → ")}
                        </span>
                        <div className="flex gap-3 text-xs font-bold">
                          <span className="text-secondary">🍌 {path.totalCost}</span>
                          <span className={isOverTime ? "text-storm-red" : "text-accent"}>
                            ⏱ {path.totalTime}
                          </span>
                        </div>
                      </div>
                      {isBest && <span className="text-xs text-secondary font-bold mt-1 block">{t("teaching.optimal")}</span>}
                      {step === 1 && isOverTime && (
                        <span className="text-xs text-storm-red font-bold mt-1 block">{t("teaching.tooSlow")}</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <motion.button
                onClick={() => setStep(step - 1)}
                className="flex-1 px-4 py-2 rounded-xl bg-muted text-foreground font-semibold cursor-pointer border-none"
                whileTap={{ scale: 0.95 }}
              >
                {t("teaching.back")}
              </motion.button>
            )}
            {step < steps.length - 1 ? (
              <motion.button
                onClick={() => setStep(step + 1)}
                className="flex-1 px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-semibold cursor-pointer border-none"
                whileTap={{ scale: 0.95 }}
              >
                {t("teaching.next")}
              </motion.button>
            ) : (
              <motion.button
                onClick={() => { setStep(0); onClose(); }}
                className="flex-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold cursor-pointer border-none"
                whileTap={{ scale: 0.95 }}
              >
                {t("teaching.gotIt")}
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeachingModal;
