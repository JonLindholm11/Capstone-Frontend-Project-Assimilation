import { useState } from 'react';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    // e.target.value is what the user typed
    setSearchInput(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchInput}
      onChange={handleInputChange}
      placeholder="Search..."
    />
  );
}