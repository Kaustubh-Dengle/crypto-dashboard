export default function SearchBar() {
  return (
    <>
      <div className="h-14 w-full">
        <input
          type="search"
          placeholder="Search by coin"
          className="w-full h-full pl-4 pr-12 bg-white text-gray-700 rounded-xl shadow-md"
        ></input>
      </div>
    </>
  );
}
