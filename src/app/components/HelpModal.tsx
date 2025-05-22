"use client";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] p-4"
      // Prevent clicking outside from closing modal
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white p-8 rounded-xl max-w-lg w-full text-center shadow-lg"
        // Stop click propagation to parent div
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-purple-700">
          How to Play 🎮
        </h2>
        <ol className="text-left text-lg space-y-4 text-gray-900 leading-relaxed">
          <li>
            🧠 <strong>Choose your emoji category.</strong> Player 1 and Player 2
            must pick different packs.
          </li>
          <li>
            🎲 <strong>Take turns placing random emojis</strong> from your
            chosen category onto the board.
          </li>
          <li>
            🔄 <strong>Only 3 emojis per player</strong> can be on the board at
            once. Placing a 4th removes your oldest emoji automatically.
          </li>
          <li>
            💥 <strong>Emojis disappear with a fun blast effect!</strong>
          </li>
          <li>
            🏆 <strong>First to align 3 emojis in a row</strong> (horizontally,
            vertically, or diagonally) wins the game!
          </li>
        </ol>
        <button
          onClick={onClose}
          className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-full font-bold shadow-md transition-colors"
        >
          Got it! Let’s Play 🚀
        </button>
      </div>
    </div>
  );
}
