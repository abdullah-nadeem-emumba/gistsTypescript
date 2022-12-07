import React, { useState } from "react";
import Root from "../../layout/Root/Root";
import Header from "../../layout/Header/Header";
import GistForm from "../../views/GistForm/GistForm";
import { useNavigate } from "react-router-dom";
import GistHookForm from "../../views/GistHookForm/GistHookForm";

export default function CreateGist() {
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
      main={<GistHookForm />}
    />
  );
}
