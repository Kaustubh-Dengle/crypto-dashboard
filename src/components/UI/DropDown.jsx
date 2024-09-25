export default function DropDown() {
  return (
    <>
      <div className="col-span-1 w-full rounded-xl shadow-md p-4 bg-white mb-2 font-bold  h-[56px] text-center">
        <select>
          <option>USD</option>
          <option>INR</option>
          <option>EUR</option>
        </select>
      </div>
    </>
  );
}
