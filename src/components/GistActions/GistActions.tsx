import React from "react";
import {
  HeaderRightDiv,
  ActionItemDiv,
  BorderedDiv,
} from "./GistActions.styles";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import { GistActionsProps } from "../../types/types";

export default function GistActions(props: GistActionsProps) {
  const {
    starred,
    toggleStar,
    fork,
    editGist,
    user,
    owner,
    id,
    showEditDelete,
  } = props;
  const showGistActions = () => {
    return user ? (
      <>
        {user.username === owner.login && showEditDelete && (
          <>
            {" "}
            <ActionItemDiv onClick={editGist}>
              <EditIcon sx={{ color: "#0C76FF" }} />
              <Typography color={"#0C76FF"}>Edit</Typography>
            </ActionItemDiv>
            <ActionItemDiv onClick={() => props.deleteMyGist?.(id)}>
              <DeleteIcon sx={{ color: "#0C76FF" }} />
              <Typography color={"#0C76FF"}>Delete</Typography>
            </ActionItemDiv>
          </>
        )}
        <ActionItemDiv onClick={() => toggleStar(id)}>
          {starred ? (
            <StarIcon sx={{ color: "#0C76FF" }} />
          ) : (
            <StarBorderIcon sx={{ color: "#0C76FF" }} />
          )}
          <Typography color={"#0C76FF"}>Star</Typography>
          <BorderedDiv>
            <Typography
              sx={{
                fontSize: ".9em",
                margin: "0.2em 0 0 0",
                padding: 0,
                color: "#787a79",
              }}
            >
              {starred ? 1 : 0}
            </Typography>
          </BorderedDiv>
        </ActionItemDiv>
        <ActionItemDiv onClick={() => fork(id)}>
          <StarBorderIcon sx={{ color: "#0C76FF" }} />
          <Typography color={"#0C76FF"}>Fork</Typography>
          <BorderedDiv>
            <Typography
              sx={{
                fontSize: ".9em",
                margin: "0.2em 0 0 0",
                padding: 0,
                color: "#787a79",
              }}
            >
              0
            </Typography>
          </BorderedDiv>
        </ActionItemDiv>
      </>
    ) : null;
  };
  return <HeaderRightDiv>{showGistActions()}</HeaderRightDiv>;
}
