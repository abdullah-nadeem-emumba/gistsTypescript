import React, { useState, useEffect } from "react";
import Root from "../../layout/Root/Root";
import StarredGists from "../../views/StarredGists/StarredGists";
import Header from "../../layout/Header/Header";
import { getStarredGists, starGist, unStarGist } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function StarredGistsScreen() {
  const [viewType, setViewType] = useState("LIST");
  const [loading, setLoading] = useState(false);
  const [gists, setGists] = useState([]);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
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

  useEffect(() => {
    listStarredGists();
  }, []);

  useEffect(() => {
    listStarredGists();
  }, [page]);

  const handleSearch = () => {
    navigate("/search", {
      state: {
        searchUserName: searchVal,
      },
    });
  };

  const listStarredGists = async () => {
    setLoading(true);
    const data = await getStarredGists(9, page);
    setGists(data);
    setLoading(false);
    // setPage(1);
  };

  const star = async (
    gistID: string,
    setStarred: (starred: Boolean) => void
  ) => {
    const res = await starGist(gistID);
    if (res) {
      setStarred(true);
      navigate(0);
    }
  };

  const unStar = async (
    gistID: string,
    setStarred: (starred: Boolean) => void
  ) => {
    const res = await unStarGist(gistID);
    if (res) {
      setStarred(false);
      navigate(0);
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
        <StarredGists
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
