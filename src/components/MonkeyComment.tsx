import monkeyImg from "@/assets/monkey.png";
import { TranslateFn } from "@/lib/i18n";

interface MonkeyCommentProps {
  levelId: number;
  t: TranslateFn;
}

const MonkeyComment = ({ levelId, t }: MonkeyCommentProps) => {
  return (
    <div className="fixed left-3 bottom-3 md:left-4 md:bottom-4 z-30 max-w-[280px] md:max-w-sm pointer-events-none">
      <div className="game-card p-3 md:p-4 flex items-start gap-3 shadow-sm">
        <img
          src={monkeyImg}
          alt={t("start.title")}
          className="w-12 h-12 md:w-14 md:h-14 object-contain shrink-0"
        />
        <div>
          <p className="text-sm md:text-base font-bold text-secondary mb-1">
            🐒 {t("learning.title")}
          </p>
          <p className="text-sm md:text-base text-foreground/90 leading-snug">
            {t(`learning.level.${levelId}`)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonkeyComment;
