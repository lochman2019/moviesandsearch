import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import React, { useState } from 'react';
import { SearchBox, Hits, Configure } from 'react-instantsearch-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  
  const handleSearch = (event) => {
    setQuery(event.currentTarget.value);
  };
  
  return (
    <div>
      <SearchBox onChange={handleSearch} />
      <Configure hitsPerPage={10} />
      <Hits />
    </div>
  );
};

export default SearchPage;