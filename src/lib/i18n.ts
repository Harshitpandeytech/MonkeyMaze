export type Language = "en" | "hi";

export type TranslationVariables = Record<string, string | number>;
export type TranslateFn = (key: string, vars?: TranslationVariables) => string;

const translations = {
  en: {
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.toggle": "हिंदी / English",

    "start.title": "🐒 Monkey Path",
    "start.subtitle": "Help Jaggu find the cheapest path!",
    "start.story1": "Jaggu spotted a golden banana across the jungle! 🌴",
    "start.story2": "Swing through vines, but watch the",
    "start.storyTax": "Banana Tax",
    "start.story3": "on each vine!",
    "start.story4": "⛈️ Storm's coming — hurry!",
    "start.levelCount": "{count} levels of jungle puzzles await!",
    "start.button": "🎮 Start Swinging!",

    "levels.title": "🌴 Choose Your Jungle",
    "levels.level": "Level {id}",
    "levels.trees": "{count} trees",
    "levels.timeLimit": "⏱ {seconds}s limit",
    "levels.vines": "🌿 {count} vines",
    "levels.back": "← Back",
    "levels.howTitle": "How to Play",
    "levels.aimLabel": "Aim:",
    "levels.aim": "Reach 🍌 with minimum energy before storm time ends.",
    "levels.step1": "Start at START node and tap connected vines only.",
    "levels.step2": "Each move adds energy cost and time.",
    "levels.step3": "Pick the cheapest valid path under the time limit.",
    "levels.simulation": "Quick simulation",
    "levels.timeHint": "Beat the storm",

    "index.levelTitle": "🐒 Level {id}: {name}",
    "index.backToLevels": "🗺️ Back to Levels",

    "hud.undo": "↩ Undo",
    "hud.reset": "🔄 Reset",

    "board.start": "START",
    "board.goal": "🍌 GOAL",

    "gameOver.title.lost": "Storm Got Jaggu!",
    "gameOver.title.optimal": "Perfect Path! 🌟",
    "gameOver.title.won": "Made It!",
    "gameOver.subtitle.lost": "The storm arrived before Jaggu reached the banana. Try a faster route!",
    "gameOver.subtitle.optimal": "You found the cheapest path — Jaggu is impressed!",
    "gameOver.subtitle.won": "You reached the banana, but a cheaper path exists...",
    "gameOver.yourPath": "Your path:",
    "gameOver.energy": "🍌 Energy:",
    "gameOver.time": "⏱ Time:",
    "gameOver.bestPath": "Best path:",
    "gameOver.bestEnergy": "🍌 Best energy:",
    "gameOver.how": "🧠 How Jaggu Thinks",
    "gameOver.replay": "🔄 Replay",
    "gameOver.nextLevel": "➡️ Next Level",
    "gameOver.deepDive": "📘 Topic + Game Link",

    "postLevel.title": "🧠 Jaggu's Super Brain Mode!",
    "postLevel.subtitle": "One idea, two worlds: classroom math and jungle adventure.",
    "postLevel.point.1": "🎯 Mission Goal: In class, we reduce objective value. In the game, Jaggu saves banana energy.",
    "postLevel.point.2": "🛤️ Choice Power: In class, route options are variables. In game, every vine jump is a choice.",
    "postLevel.point.3": "⏱️ Rule Check: Math has limits and conditions. Jungle has storm timer (time ≤ limit).",
    "postLevel.point.4": "✅ Smart Paths Only: If a path is too slow, it's out. Fast-enough paths enter the final race.",
    "postLevel.point.5": "🌟 Level 4 Secret: The cheapest next step can trick you. Looking at the full path wins.",
    "postLevel.startOver": "🔁 Start Over",

    "teaching.title": "🧠 How Jaggu Thinks",
    "teaching.subtitle": "Understanding the algorithm step by step",
    "teaching.step1.title": "1️⃣ Find All Paths",
    "teaching.step1.description": "Jaggu explores every possible route through the jungle:",
    "teaching.step2.title": "2️⃣ Filter by Time",
    "teaching.step2.description": "Remove paths that take more than {limit} time (storm limit):",
    "teaching.step3.title": "3️⃣ Pick Cheapest",
    "teaching.step3.description": "Sort remaining paths by energy cost — the cheapest wins!",
    "teaching.optimal": "⭐ Optimal!",
    "teaching.tooSlow": "❌ Too slow!",
    "teaching.back": "← Back",
    "teaching.next": "Next →",
    "teaching.gotIt": "Got it! ✅",

    "learning.title": "Jaggu's Learning",
    "learning.level.1": "Game tip: like collecting coins in platform games, compare all moves—minimum hops is not always minimum cost.",
    "learning.level.2": "Optimization tip: this is like strategy games—evaluate each branch by score (cost + time), not just the first good move.",
    "learning.level.3": "Constraint tip: like timed missions, remove routes that fail the timer first, then optimize among valid routes.",
    "learning.level.4": "Advanced tip: think like pathfinding AI—local best (greedy) can lose globally; plan future states before choosing.",

    "optimization.title": "Optimization Breakdown",
    "optimization.level.1": "Level 1 introduces objective-based optimization: minimize total banana cost while still reaching the goal. In game terms, this is like choosing between a short risky jump and a slightly longer but cheaper route. Key idea: compare complete path cost, not only immediate edge cost.",
    "optimization.level.2": "Level 2 is a branching decision problem. Similar to strategy games, each early move opens or blocks later opportunities. Good optimization evaluates future consequences of current choices. A practical heuristic is to rank candidate routes by total cost, then use time as a tie-break or constraint check.",
    "optimization.level.3": "Level 3 adds a hard constraint (storm time limit). This becomes constrained optimization: first keep only feasible paths (time <= limit), then minimize banana cost among feasible options. In mission-based games, this is exactly like filtering out routes that miss the countdown before optimizing score.",
    "optimization.level.4": "Level 4 demonstrates why greedy methods can fail. The locally cheapest edge can lead to expensive endgame states. This is where global optimization (like shortest-path style reasoning over full states) outperforms myopic decisions. Think of it as planning several turns ahead, not just winning the current move.",

    "level.1.name": "First Swing",
    "level.1.description": "Learn the vines! Find the cheapest path to the banana.",
    "level.2.name": "Vine Maze",
    "level.2.description": "More trees, more choices! Watch the Banana Tax on each vine.",
    "level.3.name": "Storm's Coming",
    "level.3.description": "Tight time limit! Greedy choices might not work here...",
    "level.4.name": "Jungle Master",
    "level.4.description": "The ultimate challenge! Greedy will fail — think ahead!",
  },
  hi: {
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.toggle": "English / हिंदी",

    "start.title": "🐒 मंकी पाथ",
    "start.subtitle": "जग्गू को सबसे सस्ता रास्ता ढूँढने में मदद करो!",
    "start.story1": "जग्गू ने जंगल के उस पार एक सुनहरा केला देखा! 🌴",
    "start.story2": "लताओं पर झूलो, लेकिन हर लता पर लगने वाले",
    "start.storyTax": "Banana Tax",
    "start.story3": "से सावधान रहो!",
    "start.story4": "⛈️ तूफ़ान आने वाला है — जल्दी करो!",
    "start.levelCount": "जंगल की {count} पहेलियाँ तुम्हारा इंतज़ार कर रही हैं!",
    "start.button": "🎮 खेल शुरू करो!",

    "levels.title": "🌴 अपना जंगल चुनो",
    "levels.level": "लेवल {id}",
    "levels.trees": "{count} पेड़",
    "levels.timeLimit": "⏱ {seconds}से. सीमा",
    "levels.vines": "🌿 {count} लताएँ",
    "levels.back": "← वापस",
    "levels.howTitle": "कैसे खेलें",
    "levels.aimLabel": "लक्ष्य:",
    "levels.aim": "समय सीमा के भीतर कम-से-कम ऊर्जा में 🍌 तक पहुँचना।",
    "levels.step1": "START नोड से शुरू करें और सिर्फ connected vines चुनें।",
    "levels.step2": "हर move से energy cost और time बढ़ता है।",
    "levels.step3": "time limit के अंदर सबसे सस्ता valid path चुनें।",
    "levels.simulation": "त्वरित सिमुलेशन",
    "levels.timeHint": "तूफ़ान से पहले",

    "index.levelTitle": "🐒 लेवल {id}: {name}",
    "index.backToLevels": "🗺️ लेवल सूची पर वापस",

    "hud.undo": "↩ पीछे जाएँ",
    "hud.reset": "🔄 रीसेट",

    "board.start": "शुरुआत",
    "board.goal": "🍌 लक्ष्य",

    "gameOver.title.lost": "तूफ़ान ने जग्गू को पकड़ लिया!",
    "gameOver.title.optimal": "बेहतरीन रास्ता! 🌟",
    "gameOver.title.won": "मंज़िल मिल गई!",
    "gameOver.subtitle.lost": "जग्गू केले तक पहुँचने से पहले तूफ़ान आ गया। तेज़ रास्ता चुनो!",
    "gameOver.subtitle.optimal": "तुमने सबसे सस्ता रास्ता ढूँढ लिया — जग्गू खुश है!",
    "gameOver.subtitle.won": "तुम केले तक पहुँच गए, लेकिन इससे भी सस्ता रास्ता है...",
    "gameOver.yourPath": "तुम्हारा रास्ता:",
    "gameOver.energy": "🍌 ऊर्जा:",
    "gameOver.time": "⏱ समय:",
    "gameOver.bestPath": "सबसे अच्छा रास्ता:",
    "gameOver.bestEnergy": "🍌 न्यूनतम ऊर्जा:",
    "gameOver.how": "🧠 जग्गू कैसे सोचता है",
    "gameOver.replay": "🔄 फिर से खेलो",
    "gameOver.nextLevel": "➡️ अगला लेवल",
    "gameOver.deepDive": "📘 टॉपिक + गेम लिंक",

    "postLevel.title": "🧠 जग्गू का सुपर ब्रेन मोड!",
    "postLevel.subtitle": "एक ही आइडिया, दो दुनिया: क्लासरूम मैथ और जंगल गेम।",
    "postLevel.point.1": "🎯 मिशन गोल: क्लास में objective value कम करते हैं, गेम में जग्गू banana energy बचाता है।",
    "postLevel.point.2": "🛤️ चॉइस पावर: क्लास में routes variables होते हैं, गेम में हर vine jump एक decision है।",
    "postLevel.point.3": "⏱️ रूल चेक: मैथ में constraints होते हैं, जंगल में storm timer (time ≤ limit) होता है।",
    "postLevel.point.4": "✅ सिर्फ स्मार्ट paths: जो path देर करे वो बाहर, जो time में आए वही final race में।",
    "postLevel.point.5": "🌟 Level 4 secret: अगला सस्ता step हमेशा best नहीं होता; पूरी path देखकर जीत मिलती है।",
    "postLevel.startOver": "🔁 फिर से शुरू करें",

    "teaching.title": "🧠 जग्गू कैसे सोचता है",
    "teaching.subtitle": "एल्गोरिदम को चरण-दर-चरण समझें",
    "teaching.step1.title": "1️⃣ सभी रास्ते ढूँढो",
    "teaching.step1.description": "जग्गू जंगल में हर संभव रास्ता खोजता है:",
    "teaching.step2.title": "2️⃣ समय के अनुसार छाँटो",
    "teaching.step2.description": "जो रास्ते {limit} समय से ज़्यादा लेते हैं, उन्हें हटाओ (तूफ़ान सीमा):",
    "teaching.step3.title": "3️⃣ सबसे सस्ता चुनो",
    "teaching.step3.description": "बचे हुए रास्तों को ऊर्जा लागत के हिसाब से क्रम में रखो — सबसे सस्ता जीतता है!",
    "teaching.optimal": "⭐ सर्वश्रेष्ठ!",
    "teaching.tooSlow": "❌ बहुत धीमा!",
    "teaching.back": "← वापस",
    "teaching.next": "आगे →",
    "teaching.gotIt": "समझ गया! ✅",

    "learning.title": "जग्गू की सीख",
    "learning.level.1": "गेम सीख: जैसे प्लेटफ़ॉर्म गेम में कॉइन जुटाते हो, वैसे हर चाल की लागत तुलना करो—कम कदम हमेशा कम लागत नहीं होते।",
    "learning.level.2": "ऑप्टिमाइज़ेशन सीख: स्ट्रैटेजी गेम की तरह हर ब्रांच को (लागत + समय) से आँको, सिर्फ पहला अच्छा विकल्प मत चुनो।",
    "learning.level.3": "कंस्ट्रेंट सीख: टाइमर वाले मिशन की तरह पहले देर वाले रास्ते हटाओ, फिर बचे हुए में सबसे अच्छा चुनो।",
    "learning.level.4": "एडवांस सीख: पाथफाइंडिंग AI की तरह सोचो—लोकल बेस्ट (greedy) हमेशा ग्लोबल बेस्ट नहीं होता; आगे की स्थिति भी देखो।",

    "optimization.title": "ऑप्टिमाइज़ेशन विश्लेषण",
    "optimization.level.1": "लेवल 1 उद्देश्य-आधारित ऑप्टिमाइज़ेशन सिखाता है: लक्ष्य तक पहुँचते हुए कुल केला-लागत को न्यूनतम रखना। गेम उदाहरण में यह छोटे जोखिम भरे जंप और थोड़ा लंबे लेकिन सस्ते रास्ते की तुलना जैसा है। मुख्य बात: सिर्फ अगली चाल नहीं, पूरे रास्ते की कुल लागत देखो।",
    "optimization.level.2": "लेवल 2 ब्रांचिंग डिसीजन समस्या है। स्ट्रैटेजी गेम की तरह शुरुआती चालें आगे के विकल्प खोलती या बंद करती हैं। अच्छा ऑप्टिमाइज़ेशन वर्तमान चाल के भविष्य परिणामों का मूल्यांकन करता है। व्यावहारिक तरीका: रास्तों को कुल लागत से रैंक करो, फिर समय को constraint/tie-breaker की तरह देखो।",
    "optimization.level.3": "लेवल 3 में हार्ड constraint (तूफ़ान समय सीमा) जुड़ता है। यह constrained optimization बन जाता है: पहले सिर्फ feasible रास्ते रखो (समय <= सीमा), फिर उन्हीं में केला-लागत न्यूनतम करो। टाइमर वाले मिशन गेम में भी यही होता है—जो रास्ते countdown मिस करते हैं, वे पहले ही हट जाते हैं।",
    "optimization.level.4": "लेवल 4 दिखाता है कि greedy तरीका क्यों फेल हो सकता है। स्थानीय रूप से सबसे सस्ती edge आगे चलकर महँगा endgame दे सकती है। यहाँ global optimization (पूरी state-space देखकर निर्णय) बेहतर है। इसे ऐसे सोचो: सिर्फ वर्तमान move नहीं, 2-3 चाल आगे की स्थिति पर योजना बनाओ।",

    "level.1.name": "पहला झूला",
    "level.1.description": "लताओं को समझो! केले तक सबसे सस्ता रास्ता ढूँढो।",
    "level.2.name": "लता भूलभुलैया",
    "level.2.description": "ज़्यादा पेड़, ज़्यादा विकल्प! हर लता पर Banana Tax का ध्यान रखो।",
    "level.3.name": "तूफ़ान आ रहा है",
    "level.3.description": "समय सीमा बहुत कम है! जल्दबाज़ी वाले फैसले काम नहीं करेंगे...",
    "level.4.name": "जंगल मास्टर",
    "level.4.description": "आख़िरी चुनौती! सिर्फ लालच से नहीं, सोच-समझकर चलो!",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export const getTranslation = (language: Language, key: string, vars?: TranslationVariables) => {
  const scoped = translations[language] as Record<string, string>;
  const fallback = translations.en as Record<string, string>;
  const template = scoped[key] ?? fallback[key] ?? key;

  if (!vars) return template;

  return Object.entries(vars).reduce((text, [varName, value]) => {
    return text.replace(new RegExp(`\\{${varName}\\}`, "g"), String(value));
  }, template);
};
