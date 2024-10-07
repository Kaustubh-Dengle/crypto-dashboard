import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

export default function DropDown({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleDropdownOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="relative">
        <button
          className="flex items-center justify-between w-full h-full px-4 py-2 font-bold text-gray-700 bg-white border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleDropdownOpen}
        >
          {title}
          <div className="flex w-6 h-6 items-center font-bold px-1">
            <TiArrowSortedDown />
          </div>
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-full rounded-xl shadow-lg bg-white">
            <ul className="py-2">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
