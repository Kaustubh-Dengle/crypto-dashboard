import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

export default function DropDown({ title = "Select a currency", options, onSelect}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(title);

  function handleDropdownOpen() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick(option){
    setSelectedOption(option.label);
    onSelect(option.value)
    setIsOpen(false)
  }

  return (
    <>
      <div className="relative">
        <button
          className="flex items-center justify-between w-full h-[56px] px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleDropdownOpen}
        >
          {selectedOption}
          <div className="flex w-6 h-6 items-center font-medium px-1">
            <TiArrowSortedDown />
          </div>
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-full rounded-xl max-h-[200px] overflow-y-auto shadow-lg bg-white border border-gray-300">
            <ul className="py-2">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  onClick={()=>handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
