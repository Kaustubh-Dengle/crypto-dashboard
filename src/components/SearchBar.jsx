import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${searchQuery}`
        );
        
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        setSearchResults(data.coins.slice(0, 5)); // Limit to 5 results
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = (coinId) => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    navigate(`/coin/${coinId}`);
  };

  return (
    <div className="relative h-14 w-full col-span-2" ref={searchRef}>
      <div className="relative">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by coin name or symbol"
          className="w-full h-[56px] pl-4 pr-12 bg-white text-gray-700 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {showResults && (searchResults.length > 0 || isLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            searchResults.map((coin) => (
              <button
                key={coin.id}
                onClick={() => handleResultClick(coin.id)}
                className="w-full p-4 hover:bg-gray-50 flex items-center gap-3 text-left"
              >
                <img src={coin.thumb} alt={coin.name} className="w-6 h-6" />
                <div>
                  <div className="font-medium">{coin.name}</div>
                  <div className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
