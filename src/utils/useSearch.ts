import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useSearch() {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSearch = () => {
    navigate("/search", {
      state: {
        searchUserName: searchVal,
      },
    });
  };

  return [searchVal, handleSearchChange, handleSearch];
}
