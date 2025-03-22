import { useDispatch } from 'react-redux';
import { setCurrency } from '../store/slices/currencySlice';
import DropDown from "./UI/DropDown";
import currencyOptions from '../util/currencyOptions';

const CurrencyDropdown = () => {
  const dispatch = useDispatch();
  // const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);

  const handleCurrencyChange = (currency) => {
    dispatch(setCurrency(currency));
  };

  

  return (
    <DropDown
      title="Select Currency"
      options={currencyOptions}
      onSelect={handleCurrencyChange}
    />
  );
};

export default CurrencyDropdown;
