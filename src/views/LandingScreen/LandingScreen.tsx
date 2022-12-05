import React from "react";
import Button from "../../components/Button/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import { Pagination } from "@mui/material";
import { StyledDiv, PaginationDiv, StyledFooter } from "./LandingScreen.styles";
import { LandingScreenProps } from "../../types/types";
import TableView from "../TableView/TableView";
import ToggleView from "../../components/ToggleView/ToggleView";
import CardView from "../CardView";
import { LIST, CARD } from "../../constants/constants";

export default function LandingScreen(props: LandingScreenProps) {
  const {
    emptyScreen,
    gists,
    loading,
    count,
    openGistDetails,
    viewType,
    setViewType,
    page,
    handleChangePage,
    handleNextPage,
    handleStar,
    handleUnstar,
  } = props;
  const displayScreen = () => (
    <div>
      {emptyScreen ? (
        <div>No Results Found!</div>
      ) : (
        <>
          <ToggleView viewType={viewType} setViewType={setViewType} />
          {viewType === LIST && (
            <TableView
              handleStar={handleStar}
              handleUnstar={handleUnstar}
              gists={gists}
              onRowClick={openGistDetails}
            />
          )}
          {viewType === CARD && (
            <CardView gists={gists} onCardClick={openGistDetails} />
          )}
        </>
      )}
      <StyledFooter>
        <StyledDiv>
          <Button
            customstyle="dark"
            onClick={handleNextPage}
            text={"Next Button"}
            type="button"
          >
            <ArrowForwardIcon sx={{ marginLeft: ".2em" }} />
          </Button>
        </StyledDiv>
        <PaginationDiv>
          <Pagination page={page} count={count} onChange={handleChangePage} />
        </PaginationDiv>
      </StyledFooter>
    </div>
  );
  return loading ? <CircularProgress /> : <>{displayScreen()}</>;
}
