"use client";
import { useEffect, useState } from "react";
import EmojiCell from "./EmojiCell";
import ResultModal from "./ResultModal";
import EmojiPicker from "./EmojiPicker";
import { checkWin, getRandomEmoji } from "@/lib/gameLogic";
import useSound from "@/hooks/useSound";

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

  const { playBlast, playOops, playWin } = useSound();

  function handleClick(index: number) {
    if (board[index] || winner || !categories) return;

    const currentEmoji = getRandomEmoji(categories[turn]);
    const newBoard = [...board];
    newBoard[index] = currentEmoji;
    const newHistory = [...history, { player: turn, index }];

    // Vanishing rule
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

  if (!categories) {
    return <EmojiPicker onSelect={(c) => setCategories(c)} options={defaultCategories} />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl mb-4 font-semibold text-white animate-pulse">
        {turn === "player1" ? "Player 1 🔥" : "Player 2 🍕"}'s Turn!
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((emoji, i) => (
          <EmojiCell key={i} emoji={emoji} onClick={() => handleClick(i)} />
        ))}
      </div>
      {winner && <ResultModal winner={winner} onRestart={resetGame} />}
    </div>
  );
}