import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Avatar,
} from "@mui/material";
import TableStar from "../../components/TableStar/TableStar";
import Checkbox from "../../components/Checkbox/Checkbox";
import moment from "moment";
import { TableViewProps } from "../../types/types";
import {
  FlexDiv,
  StyledHeaderRow,
  StyledHeaderCell,
  StyledTableCell,
} from "./TableView.styles";
import { UserContext } from "../../contexts/UserContext";

export default function TableView(props: TableViewProps) {
  const { user } = useContext(UserContext);
  const { gists, onRowClick } = props;
  const displayFileNames = (filesArr: string[]) => {
    return React.Children.toArray(
      filesArr.map((file) => {
        return (
          <span>
            {file} {filesArr.length > 1 ? " / " : ""}{" "}
          </span>
        );
      })
    );
  };
  return (
    <>
      <TableContainer sx={{ marginTop: "2em" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledHeaderRow>
              <TableCell sx={{ width: "2em" }}>
                <Checkbox />
              </TableCell>
              <TableCell></TableCell>
              <StyledHeaderCell>Name</StyledHeaderCell>
              <StyledHeaderCell>Date</StyledHeaderCell>
              <StyledHeaderCell>Time</StyledHeaderCell>
              <StyledHeaderCell>Keyword</StyledHeaderCell>
              <StyledHeaderCell>Notebook Name</StyledHeaderCell>
              <TableCell></TableCell>
            </StyledHeaderRow>
          </TableHead>
          <TableBody>
            {React.Children.toArray(
              gists &&
                gists.length > 0 &&
                gists.map((row: any) => {
                  const filenames = Object.keys(row.files);
                  const date = moment(row.created_at).format("D MMM YYYY");
                  const time = moment(row.created_at).format("h:mm A");

                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ width: ".1em", paddingRight: ".2em" }}>
                        <Checkbox />
                      </TableCell>
                      <TableCell
                        sx={{
                          width: ".1em",
                          paddingRight: ".2em",
                          paddingLeft: ".2em",
                        }}
                      >
                        <Avatar src={row.owner.avatar_url} />
                      </TableCell>

                      <StyledTableCell
                        onClick={() => onRowClick(row)}
                        sx={{ cursor: "pointer" }}
                      >
                        <FlexDiv>{row.owner.login}</FlexDiv>
                      </StyledTableCell>
                      <StyledTableCell>{date}</StyledTableCell>
                      <StyledTableCell>{time}</StyledTableCell>
                      <StyledTableCell>{"WebServer"}</StyledTableCell>
                      <StyledTableCell className="notebook-name">
                        {displayFileNames(filenames)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {user && (
                          <TableStar
                            id={row.id}
                            handleStar={props.handleStar}
                            handleUnstar={props.handleUnstar}
                          />
                        )}
                      </StyledTableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
