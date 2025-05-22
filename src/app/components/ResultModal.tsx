export default function ResultModal({
  winner,
  categoryName,
  onRestart,
}: {
  winner: string;
  categoryName: string;
  onRestart: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-white p-6 rounded-xl max-w-md w-full text-center shadow-xl">
        <h2 className="text-3xl font-bold mb-4 text-green-600">🎉 Game Over!</h2>
        <p className="text-xl mb-2 text-black">
          <strong>{winner === "player1" ? "Player 1" : "Player 2"}</strong> wins with the <strong>{categoryName}</strong> pack! 🏆
        </p>
        <button
          onClick={onRestart}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold"
        >
          Play Again 🔁
        </button>
      </div>
    </div>
  );
}
