import React from "react";
import { LIST, CARD } from "../../constants/constants";
import TableView from "../TableView/TableView";
import ToggleView from "../../components/ToggleView/ToggleView";
import CardView from "../CardView";
import CircularProgress from "@mui/material/CircularProgress";
import PaginationFooter from "../../components/PaginationFooter/PaginationFooter";

export default function StarredGists({
  loading,
  viewType,
  gists,
  setViewType,
  openGistDetails,
  page,
  count,
  handleChangePage,
  handleNextPage,
  handleStar,
  handleUnstar,
}) {
  const displayScreen = () => (
    <div>
      <ToggleView viewType={viewType} setViewType={setViewType} />
      {viewType === LIST && (
        <TableView
          gists={gists}
          onRowClick={openGistDetails}
          handleStar={handleStar}
          handleUnstar={handleUnstar}
        />
      )}
      {viewType === CARD && (
        <CardView gists={gists} onCardClick={openGistDetails} />
      )}
      <PaginationFooter
        handleChangePage={handleChangePage}
        page={page}
        count={count}
        handleNextPage={handleNextPage}
      />
    </div>
  );
  return loading ? <CircularProgress /> : <>{displayScreen()}</>;
}
