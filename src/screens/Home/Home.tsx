import React, { useState, useEffect } from "react";
import Root from "../../layout/Root/Root";
import LandingScreen from "../../views/LandingScreen/LandingScreen";
import Header from "../../layout/Header/Header";
import {
  getPublicGists,
  getSearchedGists,
  getStarredGists,
  starGist,
  unStarGist,
} from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const [viewType, setViewType] = useState("LIST");
  const [loading, setLoading] = useState(false);
  const [gists, setGists] = useState([]);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  //   const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  //   const { user } = useContext(UserContext);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const openGistDetails = (gist: any) => {
    navigate("/gistdetails", { state: { ...gist } });
  };

  //   useEffect(() => {
  //     if (searchVal) {
  //       getUserGists();
  //     } else {
  //       getGists();
  //     }
  //   }, [page, viewType]);

  useEffect(() => {
    console.log(state);

    // if (state && state.hasOwnProperty("searchUserName")) {
    //   searchGists(state.searchUserName);
    // } else {
    //   getData();
    // }
    getData();
  }, []);

  useEffect(() => {
    // if (searchVal) {
    //   searchGists(searchVal);
    // } else if (state && state.hasOwnProperty("searchUserName")) {
    //   searchGists(state.searchUserName);
    // } else {
    getData();
    //}
  }, [page]);

  console.log("GISTS", gists);

  const getData = async () => {
    setLoading(true);
    const data = await getPublicGists(9, page);
    if (data) {
      setGists(data);
    }
    setLoading(false);
  };

  // const searchGists = async (searchValue: string) => {
  //   setLoading(true);
  //   const data = await getSearchedGists(searchValue, 9, page);
  //   console.log(data);
  //   setGists(data);
  //   setPage(1);
  //   setLoading(false);
  // };

  const handleSearch = () => {
    navigate("/search", {
      state: {
        searchUserName: searchVal,
      },
    });
  };

  const star = async (
    gistID: string,
    setStarred: (starred: Boolean) => void
  ) => {
    const res = await starGist(gistID);
    if (res) {
      setStarred(true);
    }
  };

  const unStar = async (
    gistID: string,
    setStarred: (starred: Boolean) => void
  ) => {
    const res = await unStarGist(gistID);
    if (res) {
      setStarred(false);
    }
  };

  const handleKeypress = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      await getData();
    }
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
      main={
        <LandingScreen
          viewType={viewType}
          setViewType={setViewType}
          gists={gists}
          loading={loading}
          count={gists.length}
          openGistDetails={openGistDetails}
          handleChangePage={handleChangePage}
          handleNextPage={handleNextPage}
          page={page}
          handleStar={star}
          handleUnstar={unStar}
        />
      }
    />
  );
}
