"use client";

import { X } from "lucide-react";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 scrollbar-none">
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          🎮 How to Play: Blink Tac Toe
        </h2>

        <div className="text-gray-800 text-base space-y-6">

          <div>
            <h3 className="text-xl font-semibold mb-2">Board Structure</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Game is played on a classic 3x3 grid.</li>
              <li>Only 6 emojis (3 per player) can be active on the board at once.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Emoji Categories</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Each player chooses a category before the game starts.</li>
              <li>Examples:
                <ul className="ml-6 list-disc">
                  <li className="list-inside">Animals: 🐶 🐱 🐵 🐰</li>
                  <li className="list-inside">Food: 🍕 🍟 🍔 🍩</li>
                  <li className="list-inside">Sports: ⚽ 🏀 🏈 🎾</li>
                </ul>
              </li>
              <li>Each turn, a random emoji from the player’s category is used.</li>
              <li>You can create your own emoji categories in the code!</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Turn-Based Play</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Player 1 starts, followed by Player 2 — alternating every turn.</li>
              <li>Players can place their emoji on any empty cell.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Vanishing Rule 🌀</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Each player can only have 3 emojis on the board at any time.</li>
              <li>Placing a 4th emoji removes the oldest one automatically (FIFO).</li>
              <li>The removed cell cannot be reused in the same turn.</li>
              <li>Visually, the emoji disappears and the cell is empty again.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Winning Condition 🏆</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Win by aligning 3 of your own emojis:
                <ul className="ml-6 list-disc">
                  <li className="list-inside">Horizontally</li>
                  <li className="list-inside">Vertically</li>
                  <li className="list-inside">Diagonally</li>
                </ul>
              </li>
              <li>All emojis in the winning line must be from the same player (same category).</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Game Ending & Replay 🔁</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Game continues until one player wins.</li>
              <li>Draws are impossible since the board never completely fills.</li>
              <li>After a win:
                <ul className="ml-6 list-disc">
                  <li className="list-inside">A message appears: “Player X Wins!” 🎉</li>
                  <li className="list-inside">A “Play Again” button lets you restart the game from scratch.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onClose}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-semibold text-lg transition-all"
          >
            Got it! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
