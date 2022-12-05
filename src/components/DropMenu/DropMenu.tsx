import React, { useContext } from "react";
import { Menu, MenuList, Divider, ListItemText } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { StyledMenuItem, StyledLink, StyledATag } from "./DropMenu.styles";

export default function DropMenu({ open, onClose, anchorEl, signout }) {
  const { user } = useContext(UserContext);
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{ top: "8%", width: "16em" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuList sx={{ border: "none", padding: "0 1em" }} dense>
        <ListItemText>Signed in as</ListItemText>
        <StyledMenuItem>
          <ListItemText>{user?.username}</ListItemText>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemText>
            <StyledLink to={`/profile/${user?.username}`}>
              Your gists
            </StyledLink>
          </ListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText>
            <StyledLink to="/starred">Starred gists</StyledLink>
          </ListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText>
            {" "}
            <StyledLink to="/create">Create gist</StyledLink>
          </ListItemText>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemText>
            <StyledATag href={user?.url}>Your github profile</StyledATag>
          </ListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText onClick={signout}>Sign out</ListItemText>
        </StyledMenuItem>
      </MenuList>
    </Menu>
  );
}
