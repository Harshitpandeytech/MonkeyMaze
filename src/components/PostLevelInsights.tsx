import { motion } from "framer-motion";
import { TranslateFn } from "@/lib/i18n";

interface PostLevelInsightsProps {
  onStartOver: () => void;
  starsScore: string;
  totalScore: string;
  t: TranslateFn;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.45, ease: "easeOut" },
  }),
};

const PostLevelInsights = ({ onStartOver, starsScore, totalScore, t }: PostLevelInsightsProps) => {
  const points = [
    t("postLevel.point.1"),
    t("postLevel.point.2"),
    t("postLevel.point.3"),
    t("postLevel.point.4"),
    t("postLevel.point.5"),
  ];

  return (
    <div className="h-screen jungle-gradient relative overflow-hidden px-4 py-8 flex items-center justify-center">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-secondary/20 pointer-events-none"
          style={{
            width: `${18 + (i % 4) * 10}px`,
            height: `${18 + (i % 4) * 10}px`,
            left: `${8 + i * 11}%`,
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 0.5, 0] }}
          transition={{
            duration: 6 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        className="game-card max-w-3xl w-full p-6 md:p-8 z-10"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="text-2xl md:text-4xl font-bold text-center text-foreground"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          {t("postLevel.title")}
        </motion.h1>

        <motion.p
          className="text-center text-muted-foreground mt-2 mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.45 }}
        >
          {t("postLevel.subtitle")}
        </motion.p>

        <motion.div
          className="mx-auto mb-6 w-fit rounded-xl bg-secondary/20 border border-secondary/40 px-5 py-2 text-secondary font-bold"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          ⭐ {t("stars.label", { score: starsScore })}
        </motion.div>

        <motion.div
          className="mx-auto mb-6 w-fit rounded-xl bg-primary/20 border border-primary/40 px-5 py-2 text-primary font-bold"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          🏆 {t("score.total", { score: totalScore })}
        </motion.div>

        <div className="grid gap-3 md:gap-4">
          {points.map((point, index) => (
            <motion.div
              key={point}
              custom={index + 1}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              className="rounded-xl bg-background/70 border border-border/80 p-4 md:p-5"
            >
              <p className="text-sm md:text-base leading-relaxed text-foreground/95">{point}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 md:mt-8 flex justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.button
            onClick={onStartOver}
            className="title-banner px-8 py-3 rounded-xl text-secondary-foreground font-bold text-lg border-none cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("postLevel.startOver")}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PostLevelInsights;
