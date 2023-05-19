import { Input } from 'antd';
import React, { useState } from 'react';
import './search-input.css';

const SearchInput: React.FC<{
  onSearch(query: string): void;
  initValue: string;
}> = ({ onSearch, initValue }) => {
  const [inputValue, setInputValue] = useState(initValue);
  const onChange = (query: string) => {
    setInputValue(query);
    onSearch(query);
  };
  return (
    <Input
      value={inputValue}
      placeholder='Type to search...'
      className='search-input'
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchInput;
