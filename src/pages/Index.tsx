import { useState, useCallback } from "react";
import { Level, levels } from "@/data/gameData";
import { getEdge, getNeighbors, getOptimalPath, PathResult } from "@/utils/pathfinding";
import StartScreen from "@/components/StartScreen";
import LevelSelect from "@/components/LevelSelect";
import GameBoard from "@/components/GameBoard";
import GameHUD from "@/components/GameHUD";
import GameOverModal from "@/components/GameOverModal";
import TeachingModal from "@/components/TeachingModal";
import MonkeyComment from "@/components/MonkeyComment";
import PostLevelInsights from "@/components/PostLevelInsights";
import { getTranslation, Language, TranslationVariables } from "@/lib/i18n";

type Screen = "start" | "levels" | "game" | "post-level";

const Index = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("jaggu-language");
    return saved === "hi" ? "hi" : "en";
  });
  const [screen, setScreen] = useState<Screen>("start");
  const [currentLevel, setCurrentLevel] = useState<Level>(levels[0]);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  // Game state
  const [visitedPath, setVisitedPath] = useState<string[]>([]);
  const [energySpent, setEnergySpent] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [showGameOver, setShowGameOver] = useState(false);
  const [showTeaching, setShowTeaching] = useState(false);

  const t = useCallback(
    (key: string, vars?: TranslationVariables) => getTranslation(language, key, vars),
    [language]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "en" ? "hi" : "en";
      localStorage.setItem("jaggu-language", next);
      return next;
    });
  }, []);

  const currentNode = visitedPath[visitedPath.length - 1] || currentLevel.startNode;

  const startLevel = useCallback((level: Level) => {
    setCurrentLevel(level);
    setVisitedPath([level.startNode]);
    setEnergySpent(0);
    setTimeSpent(0);
    setGameState("playing");
    setShowGameOver(false);
    setShowTeaching(false);
    setScreen("game");
  }, []);

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      if (gameState !== "playing") return;

      const edge = getEdge(currentLevel.edges, currentNode, nodeId);
      if (!edge) return;

      const newTime = timeSpent + edge.time;
      const newEnergy = energySpent + edge.cost;
      const newPath = [...visitedPath, nodeId];

      setVisitedPath(newPath);
      setEnergySpent(newEnergy);
      setTimeSpent(newTime);

      // Check if exceeded time
      if (newTime > currentLevel.timeLimit) {
        setGameState("lost");
        setTimeout(() => setShowGameOver(true), 800);
        return;
      }

      // Check if reached goal
      if (nodeId === currentLevel.goalNode) {
        setGameState("won");
        if (!completedLevels.includes(currentLevel.id)) {
          setCompletedLevels((prev) => [...prev, currentLevel.id]);
        }
        setTimeout(() => setShowGameOver(true), 800);
      }
    },
    [gameState, currentNode, currentLevel, timeSpent, energySpent, visitedPath, completedLevels]
  );

  const handleUndo = useCallback(() => {
    if (visitedPath.length <= 1 || gameState !== "playing") return;
    const prevPath = visitedPath.slice(0, -1);
    const removedNode = visitedPath[visitedPath.length - 1];
    const prevNode = prevPath[prevPath.length - 1];
    const edge = getEdge(currentLevel.edges, prevNode, removedNode);
    if (edge) {
      setVisitedPath(prevPath);
      setEnergySpent((e) => e - edge.cost);
      setTimeSpent((t) => t - edge.time);
    }
  }, [visitedPath, gameState, currentLevel]);

  const handleReset = useCallback(() => {
    startLevel(currentLevel);
  }, [currentLevel, startLevel]);

  const handleNextLevel = useCallback(() => {
    const idx = levels.findIndex((l) => l.id === currentLevel.id);
    if (idx < levels.length - 1) {
      startLevel(levels[idx + 1]);
    }
  }, [currentLevel, startLevel]);

  const handleStartOver = useCallback(() => {
    setCompletedLevels([]);
    setCurrentLevel(levels[0]);
    setVisitedPath([]);
    setEnergySpent(0);
    setTimeSpent(0);
    setGameState("playing");
    setShowGameOver(false);
    setShowTeaching(false);
    setScreen("start");
  }, []);

  const optimalPath = getOptimalPath(
    currentLevel.edges,
    currentLevel.startNode,
    currentLevel.goalNode,
    currentLevel.timeLimit
  );

  const hasNextLevel = levels.findIndex((l) => l.id === currentLevel.id) < levels.length - 1;

  const levelName = t(`level.${currentLevel.id}.name`);

  if (screen === "start") {
    return (
      <div className="relative min-h-screen">
        <button
          onClick={toggleLanguage}
          className="fixed top-4 right-4 z-50 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm cursor-pointer border-none"
        >
          {t("language.toggle")}
        </button>
        <StartScreen onStart={() => setScreen("levels")} t={t} />
      </div>
    );
  }

  if (screen === "levels") {
    return (
      <div className="relative min-h-screen">
        <button
          onClick={toggleLanguage}
          className="fixed top-4 right-4 z-50 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm cursor-pointer border-none"
        >
          {t("language.toggle")}
        </button>
        <LevelSelect
          onSelect={startLevel}
          completedLevels={completedLevels}
          onBack={() => setScreen("start")}
          t={t}
        />
      </div>
    );
  }

  if (screen === "post-level") {
    return (
      <div className="relative min-h-screen">
        <button
          onClick={toggleLanguage}
          className="fixed top-4 right-4 z-50 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm cursor-pointer border-none"
        >
          {t("language.toggle")}
        </button>
        <PostLevelInsights onStartOver={handleStartOver} t={t} />
      </div>
    );
  }

  return (
    <div className="h-screen jungle-gradient flex flex-col overflow-hidden">
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm cursor-pointer border-none"
      >
        {t("language.toggle")}
      </button>

      {/* Level title bar */}
      <div className="text-center pt-3 px-4">
        <div className="title-banner inline-block px-6 py-2">
          <h1 className="text-xl md:text-2xl font-bold text-secondary-foreground">
            {t("index.levelTitle", { id: currentLevel.id, name: levelName })}
          </h1>
        </div>
      </div>

      {/* HUD */}
      <GameHUD
        timeSpent={timeSpent}
        timeLimit={currentLevel.timeLimit}
        energySpent={energySpent}
        path={visitedPath}
        onReset={handleReset}
        onUndo={handleUndo}
        canUndo={visitedPath.length > 1 && gameState === "playing"}
        t={t}
      />

      {/* Game Board */}
      <div className="flex-1 min-h-0">
        <GameBoard
          level={currentLevel}
          currentNode={currentNode}
          visitedPath={visitedPath}
          onNodeClick={handleNodeClick}
          gameState={gameState}
          t={t}
        />
      </div>

      {/* Back to levels */}
      <div className="text-center pb-4">
        <button
          onClick={() => setScreen("levels")}
          className="px-4 py-2 rounded-xl bg-primary/80 text-primary-foreground font-semibold cursor-pointer border-none text-sm"
        >
          {t("index.backToLevels")}
        </button>
      </div>

      <MonkeyComment levelId={currentLevel.id} t={t} />

      {/* Modals */}
      <GameOverModal
        show={showGameOver}
        gameState={gameState as "won" | "lost"}
        playerPath={visitedPath}
        playerCost={energySpent}
        playerTime={timeSpent}
        optimalPath={optimalPath}
        level={currentLevel}
        onReplay={handleReset}
        onNextLevel={handleNextLevel}
        onShowPostLevel={() => {
          setShowGameOver(false);
          setShowTeaching(false);
          setScreen("post-level");
        }}
        onShowTeaching={() => {
          setShowGameOver(false);
          setShowTeaching(true);
        }}
        hasNextLevel={hasNextLevel}
        t={t}
      />

      <TeachingModal
        show={showTeaching}
        onClose={() => {
          setShowTeaching(false);
          setShowGameOver(true);
        }}
        level={currentLevel}
        t={t}
      />
    </div>
  );
};

export default Index;
