import React, { useEffect, useRef } from "react";

const Search = ({ showSearch }) => {

  const inputRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    showSearch && (
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="border p-2 outline-none"
      />
    )
  );
};

export default Search;
