"use client";
import { useEffect, useState } from "react";
import EmojiCell from "./EmojiCell";
import ResultModal from "./ResultModal";
import EmojiPicker from "./EmojiPicker";
import { checkWin, getRandomEmoji } from "@/lib/gameLogic";
import useSound from "@/hooks/useSound";
import HelpModal from "./HelpModal";

const defaultCategories = {
  animals: ["🐶", "🐱", "🐵", "🐰"],
  food: ["🍕", "🍟", "🍔", "🍩"],
  sports: ["⚽", "🏀", "🏈", "🎾"]
};

export default function GameBoard() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"player1" | "player2">("player1");
  const [history, setHistory] = useState<{ player: string; index: number }[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ player1: string[]; player2: string[] } | null>(null);
  const [score, setScore] = useState<{ player1: number; player2: number }>({ player1: 0, player2: 0 });
  const [showHelp, setShowHelp] = useState(false);

  const { playBlast, playOops, playWin } = useSound();

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

  if (!categories) {
    return <EmojiPicker onSelect={(c) => setCategories(c)} options={defaultCategories} />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-semibold text-white mb-2">
        Score: <span className="text-yellow-300">Player 1: {score.player1}</span> | <span className="text-green-300">Player 2: {score.player2}</span>
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
    onClick={resetScores}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm"
  >
    Reset Scores
  </button>
</div>
      <div className="text-xl mb-4 font-semibold text-white animate-pulse">
        {turn === "player1" ? "Player 1 🔥" : "Player 2 🍕"}'s Turn!
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((emoji, i) => (
          <EmojiCell key={i} emoji={emoji} onClick={() => handleClick(i)} />
        ))}
      </div>
      {winner && <ResultModal winner={winner} onRestart={resetGame} />}
      <button
        onClick={resetGame}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-full shadow-lg"
      >
        Replay 🔁
      </button>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}