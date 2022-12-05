import React from "react";
import {
  StyledDiv,
  PaginationDiv,
  StyledFooter,
} from "./PaginationFooter.styles";
import { Pagination } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "../Button/Button";

export default function PaginationFooter({
  handleNextPage,
  handleChangePage,
  count,
  page,
}) {
  return (
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
  );
}
