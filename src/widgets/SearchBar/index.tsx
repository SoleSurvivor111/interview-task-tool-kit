import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface SearchBarProps {
  query: string;
  debounceDelay?: number;
  onChange: (query: string) => void;
  dataTestId?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, debounceDelay = 500, onChange, dataTestId }) => {
  const [inputValue, setInputValue] = useState(query);
  const debouncedValue = useDebounce(inputValue, debounceDelay);

  useEffect(() => {
    if (debouncedValue[0] !== query) {
      onChange(debouncedValue[0]);
    }
  }, [debouncedValue, query, onChange]);

  return (
    <div>
      <input
        placeholder="поиск..."
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        data-test={dataTestId}
      />
    </div>
  );
};

export default SearchBar;
