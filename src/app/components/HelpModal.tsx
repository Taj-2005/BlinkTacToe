"use client";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] p-4">
      <div className="bg-white p-6 rounded-xl max-w-lg w-full text-center shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-purple-600">How to Play 🎮</h2>
        <ul className="text-left text-md space-y-2 text-black">
          <li>🧠 2 players pick their emoji category.</li>
          <li>🎲 Random emoji appears each turn.</li>
          <li>🔄 Only 3 emojis allowed per player — oldest disappears if a 4th is placed!</li>
          <li>💥 Emojis vanish with style (and a blast!)</li>
          <li>🏆 First to align 3 of their own emojis wins!</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full font-bold"
        >
          Got it! 🚀
        </button>
      </div>
    </div>
  );
}