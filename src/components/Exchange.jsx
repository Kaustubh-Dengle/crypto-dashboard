import { useDispatch, useSelector } from "react-redux";
import Button from "./UI/Button";
import DropDown from "./UI/DropDown";
import coinOptions from "../util/coinOptions";
import { 
  fetchExchangeRate, 
  setFromCurrency, 
  setToCurrency, 
  setAmount, 
  setInputError,
  resetConversion 
} from "../store/slices/exchangeSlice";

export default function Exchange() {
  const dispatch = useDispatch();
  const { 
    fromCurrency, 
    toCurrency, 
    amount, 
    convertedAmount, 
    loading, 
    error,
    inputError 
  } = useSelector((state) => state.exchange);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      dispatch(setAmount(''));
      return;
    }
    
    // Validate input is a number
    if (isNaN(value) || value < 0) {
      dispatch(setInputError('Please enter a valid number'));
      return;
    }
    
    dispatch(setAmount(value));
    dispatch(setInputError(null));
  };

  const handleExchange = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      dispatch(setInputError('Please enter a valid amount'));
      return;
    }

    dispatch(resetConversion());
    try {
      await dispatch(fetchExchangeRate({ 
        fromCurrency, 
        toCurrency,
        amount: parseFloat(amount)
      })).unwrap();
    } catch (error) {
      console.error('Exchange failed:', error);
    }
  };

  return (
    <div className="grid col-span-1 row-span-1">
      <div className="grid grid-rows-4 grid-cols-2 gap-2 shadow-md rounded-xl pb-4 bg-white border border-gray-300">
        <div className="col-span-2 font-bold p-4 flex items-center">
          Exchange Coins
        </div>
        <div className="flex col-span-1 items-center">
          <p className="text-[#ED7B2B] px-8 font-bold">Sell</p>
          <div className="z-50 w-full">
            <DropDown
              title="Currency"
              options={coinOptions}
              onSelect={(value) => dispatch(setFromCurrency(value))}
            />
          </div>
        </div>
        <div className="pl-3">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className={`bg-white text-gray-700 shadow-md h-[56px] max-w-[150px] mt-[3px] px-3 rounded-xl border ${
              inputError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {inputError && (
            <p className="text-red-500 text-sm mt-1">{inputError}</p>
          )}
        </div>
        <div className="flex col-span-1 items-center">
          <p className="text-[#4C9D8A] px-8 font-bold">Buy</p>
          <div className="z-10 w-full">
            <DropDown
              title="Currency"
              options={coinOptions}
              onSelect={(value) => dispatch(setToCurrency(value))}
            />
          </div>
        </div>
        <div className="pl-3 flex items-center">
          {loading ? (
            <p>Calculating...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <p>Value: {convertedAmount || '0.00'}</p>
          )}
        </div>
        <div className="flex col-span-2 justify-center mt-1">
          <Button onClick={handleExchange}>Exchange</Button>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import Button from "./UI/Button";

// function CurrencySelect({ label, options }) {
//   return (
//     <div className="flex items-center">
//       <p className="text-[#ED7B2B] px-8">{label}</p>
//       <select className="rounded-xl shadow-md p-4 bg-white mb-2 font-bold h-[56px] text-center">
//         {options.map((option) => (
//           <option key={option.value}>{option.label}</option>
//         ))}
//       </select>
//     </div>
//   );
// }

// function InputAmount({ placeholder, value, onChange }) {
//   return (
//     <input
//       type="number"
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className="bg-white text-gray-700 shadow-md h-[56px] border-gray-400 rounded-xl"
//     />
//   );
// }

// function Exchange() {
//   const [sellCurrency, setSellCurrency] = useState("Bitcoin");
//   const [buyCurrency, setBuyCurrency] = useState("Ethereum");
//   const [sellAmount, setSellAmount] = useState("");
//   const [buyAmount, setBuyAmount] = useState("");

//   const handleSellCurrencyChange = (event) => {
//     setSellCurrency(event.target.value);
//   };

//   const handleBuyCurrencyChange = (event) => {
//     setBuyCurrency(event.target.value);
//   };

//   const handleSellAmountChange = (event) => {
//     setSellAmount(event.target.value);
//     // Calculate buyAmount based on exchange rates (not implemented here)
//   };

//   const handleBuyAmountChange = (event) => {
//     setBuyAmount(event.target.value);
//     // Calculate sellAmount based on exchange rates (not implemented here)
//   };

//   return (
//     <div className="grid grid-rows-4 grid-cols-2 gap-2 shadow-md rounded-xl w-1/4 pb-4">
//       <div className="col-span-2 bg-white font-bold p-2 pl-8 flex items-center">
//         Exchange Coins
//       </div>
//       <div className="flex col-span-1">
//         <CurrencySelect
//           label="Sell"
//           options={[
//             { value: "Bitcoin", label: "Bitcoin" },
//             { value: "Ethereum", label: "Ethereum" },
//             { value: "Dogecoin", label: "Dogecoin" },
//           ]}
//           onChange={handleSellCurrencyChange}
//         />
//       </div>
//       <div className="flex col-span-1">
//         <InputAmount
//           placeholder="Avl bal."
//           value={sellAmount}
//           onChange={handleSellAmountChange}
//         />
//       </div>
//       <div className="flex col-span-1">
//         <CurrencySelect
//           label="Buy"
//           options={[
//             { value: "Bitcoin", label: "Bitcoin" },
//             { value: "Ethereum", label: "Ethereum" },
//             { value: "Dogecoin", label: "Dogecoin" },
//           ]}
//           onChange={handleBuyCurrencyChange}
//         />
//       </div>
//       <div className="flex col-span-1">
//         <p className="">Value: {buyAmount}</p>
//       </div>
//       <div className="flex col-span-2 justify-center">
//         <Button>Exchange</Button>
//       </div>
//     </div>
//   );
// }

// export default Exchange;
