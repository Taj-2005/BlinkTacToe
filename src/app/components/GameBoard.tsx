"use client";
import { useState } from "react";
import EmojiCell from "./EmojiCell";
import ResultModal from "./ResultModal";
import { checkWin, getRandomEmoji } from "@/lib/gameLogic";

const categories = {
  animals: ["🐶", "🐱", "🐵", "🐰"],
  food: ["🍕", "🍟", "🍔", "🍩"],
};

export default function GameBoard() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"player1" | "player2">("player1");
  const [history, setHistory] = useState<{ player: string; index: number }[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const emojiSet = {
    player1: categories.animals,
    player2: categories.food,
  };

  function handleClick(index: number) {
    if (board[index] || winner) return;

    const currentEmoji = getRandomEmoji(emojiSet[turn]);
    const newBoard = [...board];
    newBoard[index] = currentEmoji;
    const newHistory = [...history, { player: turn, index }];

    // Enforce vanishing rule
    const playerMoves = newHistory.filter((h) => h.player === turn);
    if (playerMoves.length > 3) {
      const oldest = playerMoves[0];
      newBoard[oldest.index] = null;
      newHistory.splice(newHistory.findIndex((h) => h.index === oldest.index), 1);
    }

    setBoard(newBoard);
    setHistory(newHistory);

    if (checkWin(newBoard, emojiSet[turn])) {
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

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl mb-4 font-semibold text-white animate-pulse">
        {turn === "player1" ? "🐶 Your Turn!" : "🍕 Your Turn!"}
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