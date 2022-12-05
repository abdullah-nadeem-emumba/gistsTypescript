import React, { useState } from "react";
import Root from "../../layout/Root/Root";
import Header from "../../layout/Header/Header";
import UserView from "../../views/UserView/UserView";
import { useParams, useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { username } = useParams();
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
      main={<UserView username={username} />}
    />
  );
}