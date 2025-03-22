export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1C5DDB] h-[56px] text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-800 transition-colors"
    >
      {children}
    </button>
  );
}
