import { useState } from 'react';

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);
  
    const products = [];
  
    const handleChange = (e) => {
      const value = e.target.value;
      setSearchInput(value);
  
      
      if (value.trim() === '') {
        setResults([]);
      } else {
        const filtered = products.filter(products =>
          products.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={handleChange}
          placeholder="Search..."
        />
  
        {}
        {results.map((products, index) => (
          <div key={index}>{products}</div>
        ))}
      </div>
    );
  }