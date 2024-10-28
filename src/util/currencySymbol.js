export default function SymbolSelector(currency){
    const symbols = {
        USD: '$',
        EUR: '€',
        INR: '₹',
        GBP: '£',
      };

      return symbols[currency]
}