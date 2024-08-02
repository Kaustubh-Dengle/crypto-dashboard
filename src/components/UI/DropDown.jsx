export default function DropDown() {
  return (
    <>
      <div className="rounded-xl shadow-md p-4 bg-white mb-2 font-bold w-[96px] h-[56px] text-center">
        <select>
          <option>USD</option>
          <option>INR</option>
          <option>EUR</option>
        </select>
      </div>
    </>
  );
}
