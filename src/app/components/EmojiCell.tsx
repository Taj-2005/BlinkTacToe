"use client";
export default function EmojiCell({ emoji, onClick }: { emoji: string | null; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-20 h-20 text-4xl bg-white rounded-xl flex items-center justify-center hover:rotate-6 hover:scale-110 transition transform shadow-md"
    >
      {emoji}
    </button>
  );
}