import { useSelector, useDispatch } from 'react-redux';
import { setCurrency } from '../store/slices/currencySlice';
import DropDown from "./UI/DropDown";

const CurrencyDropdown = () => {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);

  const handleCurrencyChange = (currency) => {
    dispatch(setCurrency(currency));
  };

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'INR', label: 'INR' },
    { value: 'GBP', label: 'GBP' },
    // Add more currencies if needed
  ];

  return (
    <DropDown
      title="Select Currency"
      options={currencyOptions}
      selectedValue={selectedCurrency}
      onChange={handleCurrencyChange}
    />
  );
};

export default CurrencyDropdown;
