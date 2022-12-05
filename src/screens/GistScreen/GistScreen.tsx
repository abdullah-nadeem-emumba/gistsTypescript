import React, { useState } from "react";
import Root from "../../layout/Root/Root";
import Header from "../../layout/Header/Header";
import GistDetails from "../../views/GistDetails/GistDetails";
import { useNavigate } from "react-router-dom";

export default function GistScreen() {
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

  return (
    <Root
      header={
        <Header
          searchVal={searchVal}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        />
      }
      main={<GistDetails />}
    />
  );
}
