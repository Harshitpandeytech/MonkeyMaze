import { motion } from "framer-motion";
import monkeyImg from "@/assets/KKK.png";
import { levels } from "@/data/gameData";
import { TranslateFn } from "@/lib/i18n";

interface StartScreenProps {
  onStart: () => void;
  t: TranslateFn;
}

const StartScreen = ({ onStart, t }: StartScreenProps) => {
  return (
    <div className="h-screen jungle-gradient flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Banana rain background */}
      {[...Array(10)].map((_, i) => (
        <motion.img
          key={i}
          src="/bnanna.png"
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none opacity-60"
          initial={{ y: "-20%", opacity: 0, rotate: -20 }}
          animate={{
            y: ["-20%", "120%"],
            opacity: [0, 0.6, 0.6, 0],
            rotate: [-20, 20, -10],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            delay: i * 0.6,
            ease: "linear",
          }}
          style={{
            left: `${5 + i * 10}%`,
            width: `${42 + (i % 3) * 12}px`,
            height: `${42 + (i % 3) * 12}px`,
          }}
        />
      ))}

      <motion.div
        className="text-center z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title banner */}
        <motion.div
          className="title-banner px-8 py-4 mb-8 inline-block"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground tracking-tight drop-shadow-md">
            {t("start.title")}
          </h1>
          <p className="text-lg md:text-xl text-secondary-foreground/90 mt-1 font-medium">
            {t("start.subtitle")}
          </p>
        </motion.div>

        {/* Monkey and banana */}
        <div className="flex items-center justify-center gap-8 md:gap-16 my-8">
          <motion.img
            src={monkeyImg}
            alt={t("start.title")}
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center"
            animate={{ x: [-12, 12, -12], scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.svg
              viewBox="0 0 120 120"
              className="w-full h-full"
              aria-label="Arrow"
              animate={{ filter: ["drop-shadow(0 0 0px rgba(255,215,0,0.3))", "drop-shadow(0 0 10px rgba(255,215,0,0.9))", "drop-shadow(0 0 0px rgba(255,215,0,0.3))"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
              </defs>
              <path
                d="M18 60h56M62 36l24 24-24 24"
                stroke="url(#arrowGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </motion.svg>
          </motion.div>
          <motion.img
            src="/bnanna.png"
            alt={t("board.goal")}
            className="w-[8.4rem] h-[8.4rem] md:w-48 md:h-48 object-contain banana-glow"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>

        {/* Story blurb */}
        <motion.p
          className="text-foreground/80 text-lg md:text-xl max-w-md mx-auto mb-8 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t("start.story1")} {" "}
          {t("start.story2")} <strong className="text-secondary">{t("start.storyTax")}</strong> {t("start.story3")} {" "}
          {t("start.story4")}
        </motion.p>

        {/* Level count */}
        <motion.p
          className="text-muted-foreground mb-6 text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {t("start.levelCount", { count: levels.length })}
        </motion.p>

        {/* Start button */}
        <motion.button
          onClick={onStart}
          className="title-banner px-10 py-4 text-2xl font-bold text-secondary-foreground rounded-2xl cursor-pointer border-none"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {t("start.button")}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StartScreen;
