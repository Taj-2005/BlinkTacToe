"use client";
import { useEffect, useState } from "react";
import EmojiCell from "./EmojiCell";
import ResultModal from "./ResultModal";
import { toast } from "sonner";
import { checkWin, getRandomEmoji } from "@/lib/gameLogic";
import useSound from "@/hooks/useSound";
import HelpModal from "./HelpModal";
import confetti from "canvas-confetti";

const defaultCategories = {
  animals: ["🐶", "🐱", "🐵", "🦊", "🐼", "🐸", "🐯", "🦁"],
  food: ["🍕", "🍔", "🍟", "🌮", "🍣", "🍩", "🍫", "🍎"],
  sports: ["⚽", "🏀", "🏈", "🎾", "⚾", "🥊", "🏓", "🏸"],
  nature: ["🌵", "🌲", "🍄", "🌻", "🌞", "🌈", "🌊", "⛰️"],
  faces: ["😀", "😂", "😎", "😍", "🤩", "😜", "🥳", "😡"],
  travel: ["✈️", "🚗", "🚀", "🚢", "🗼", "🗽", "🏖️", "🏰"],
  tech: ["💻", "📱", "🕹️", "📷", "🎧", "💡", "🔋", "🖱️"],
  fantasy: ["🧙", "🧝", "🐉", "🧛", "🧚", "🪄", "🧞", "🦄"]
};

function getRandomEmojis(array: string[], count = 4) {
  return array
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

export default function GameBoard() {
  const [selectedPackNames, setSelectedPackNames] = useState<{ player1: string; player2: string } | null>(null);
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"player1" | "player2">("player1");
  const [history, setHistory] = useState<{ player: string; index: number }[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ player1: string[]; player2: string[] } | null>(null);
  const [selectedPacks, setSelectedPacks] = useState<{ player1: string | null; player2: string | null }>({ player1: null, player2: null });
  const [score, setScore] = useState<{ player1: number; player2: number }>({ player1: 0, player2: 0 });
  const [showHelp, setShowHelp] = useState(false);

  const { playBlast, playOops, playWin, playStart, playOnClick } = useSound();

  function handleClick(index: number) {
    if (board[index] || winner || !categories) return;

    const currentEmoji = getRandomEmoji(categories[turn]);
    const newBoard = [...board];
    newBoard[index] = currentEmoji;
    const newHistory = [...history, { player: turn, index }];

    const playerMoves = newHistory.filter((h) => h.player === turn);
    if (playerMoves.length > 3) {
      const oldest = playerMoves[0];
      newBoard[oldest.index] = null;
      playOops();
      newHistory.splice(newHistory.findIndex((h) => h.index === oldest.index), 1);
    } else {
      playBlast();
    }

    setBoard(newBoard);
    setHistory(newHistory);

    if (checkWin(newBoard, categories[turn])) {
      playWin();
      setWinner(turn);
      setScore((prev) => ({ ...prev, [turn]: prev[turn] + 1 }));

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: turn === "player1" ? ["#FFD700", "#FF69B4"] : ["#00FF7F", "#1E90FF"],
      });
    } else {
      setTurn(turn === "player1" ? "player2" : "player1");
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn("player1");
    setHistory([]);
    setWinner(null);
  }

  function resetScores() {
    setScore({ player1: 0, player2: 0 });
  }

  function startGame() {
    const { player1, player2 } = selectedPacks;

    if (player1 && player2 && player1 === player2) {
      toast.error("Both players cannot choose the same emoji pack!");
      return;
    }

    const p1 =
      (player1 as keyof typeof defaultCategories) ||
      (Object.keys(defaultCategories)[Math.floor(Math.random() * Object.keys(defaultCategories).length)] as keyof typeof defaultCategories);

    const availablePacks = Object.keys(defaultCategories).filter((k) => k !== p1) as (keyof typeof defaultCategories)[];
    const p2 =
      (player2 as keyof typeof defaultCategories) ||
      availablePacks[Math.floor(Math.random() * availablePacks.length)];

    setCategories({
      player1: getRandomEmojis(defaultCategories[p1], 5),
      player2: getRandomEmojis(defaultCategories[p2], 5),
    });

    setSelectedPackNames({ player1: p1, player2: p2 });

    playStart();
  }

  if (!categories) {
    return (
      <div className="flex flex-col items-center text-white">
        <h2 className="text-3xl font-bold mb-4">Choose Emoji Packs 🎯</h2>

        <div className="flex flex-col sm:flex-row gap-10 mb-4">
          {["player1", "player2"].map((player) => (
            <div key={player} className="text-center">
              <label className="text-xl mb-2 block">
                {player === "player1" ? "Player 1" : "Player 2"}
              </label>
              <select
                className="text-black rounded px-2 py-1 mb-2"
                onChange={(e) =>
                  setSelectedPacks((prev) => ({ ...prev, [player]: e.target.value }))
                }
                value={selectedPacks[player as "player1" | "player2"] || ""}
              >
                <option value="">Random</option>
                {Object.keys(defaultCategories).map((pack) => (
                  <option key={pack} value={pack}>
                    {pack.charAt(0).toUpperCase() + pack.slice(1)}
                  </option>
                ))}
              </select>
              <div className="flex justify-center gap-1 text-2xl">
                {(defaultCategories[selectedPacks[player as "player1" | "player2"] as keyof typeof defaultCategories] ||
                  Object.values(defaultCategories)[0]
                ).map((emoji, i) => (
                  <span key={i}>{emoji}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-full shadow-md"
        >
          Start Game 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="absolute top-4 left-4 z-40">
        <button
          onClick={() => {
            setCategories(null);
            resetGame();
          }}
          className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded shadow-sm"
        >
          ⬅ Back
        </button>
      </div>

      <div className="text-lg font-semibold text-white mb-2">
        Score: <span className="text-yellow-300">Player 1: {score.player1}</span> |{" "}
        <span className="text-green-300">Player 2: {score.player2}</span>
      </div>

      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={() => setShowHelp(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-sm"
        >
          How to Play ❓
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            playOnClick();
            resetScores();
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm"
        >
          Reset Scores
        </button>
      </div>

      <div className="text-xl mb-4 font-semibold text-white animate-pulse">
        {turn === "player1" ? "Player 1" : "Player 2"}'s Turn!
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((emoji, i) => (
          <EmojiCell key={i} emoji={emoji} onClick={() => handleClick(i)} />
        ))}
      </div>

      {winner && selectedPackNames && (
        <ResultModal
          winner={winner}
          categoryName={selectedPackNames[winner as "player1" | "player2"]}
          onRestart={resetGame}
        />
      )}

      <button
        onClick={() => {
          playOnClick();
          resetGame();
        }}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-full shadow-lg"
      >
        Replay 🔁
      </button>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}
