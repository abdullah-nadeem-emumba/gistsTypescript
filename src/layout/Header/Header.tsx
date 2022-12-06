import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledHeader } from "./Header.styles";
import SearchField from "../../components/SearchField/SearchField";
import { Avatar, Typography } from "@mui/material";
import Button from "../../components/Button/Button";
import DropMenu from "../../components/DropMenu/DropMenu";
import { USER } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import { HeaderProps } from "../../types/types";
import { RightDiv, LeftDiv, StyledLink } from "./Header.styles";
import logo from "../../assets/emumba-logo.png";
import { login, logout } from "../../store/userSlice";
import { RootState } from "../../store/store";

export default function Header(props: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  //const { user, setUser } = useContext(UserContext);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  console.log("REDUX STATE", user);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogin = () => {
    //setUser(USER);
    dispatch(login());
    localStorage.setItem("user", JSON.stringify(USER));
    console.log(localStorage.getItem("user"));
  };

  const signout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    //setUser(null);
    setAnchorEl(null);
  };

  return (
    <StyledHeader>
      <LeftDiv>
        <Typography variant="h4">
          <StyledLink to="/">
            <img width={200} height={30} src={logo} alt="EMUMBA" />
          </StyledLink>
        </Typography>
      </LeftDiv>
      <RightDiv>
        <SearchField
          value={props.searchVal}
          handleSearchChange={props?.handleSearchChange}
          handleSearch={props?.handleSearch}
          handleKeyPress={props?.handleKeyPress}
          label="Search Notes..."
          placeholder="Search Notes..."
        />
        {!user?.username ? (
          <Button
            customstyle="light"
            onClick={userLogin}
            text="Login"
            type="button"
          ></Button>
        ) : (
          <Avatar
            onClick={handleOpen}
            sx={{ width: "2.9em", height: "2.9em", cursor: "pointer" }}
          />
        )}
        <DropMenu
          signout={signout}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        />
      </RightDiv>
    </StyledHeader>
  );
}
