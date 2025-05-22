"use client";
import { motion } from "framer-motion";

export default function ResultModal({ winner, onRestart }: { winner: string; onRestart: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white p-6 rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-2 text-purple-600 animate-bounce">
          🎉 {winner === "player1" ? "Animal Squad Wins!" : "Foodies Rule!"} 🎉
        </h2>
        <button
          onClick={onRestart}
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full animate-pulse"
        >
          Play Again 🔁
        </button>
      </div>
    </motion.div>
  );
}