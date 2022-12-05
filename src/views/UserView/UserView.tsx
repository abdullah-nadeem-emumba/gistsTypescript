import React, { useState, useEffect, useContext } from "react";
import UserGist from "../../components/UserGist/UserGist";
import { Typography, Avatar, Button } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserGists, getAuthUserGists } from "../../api/api";
import {
  GridContainer,
  LeftDiv,
  RightDiv,
  CenterDiv,
  StyledLink,
} from "./UserView.styles";
import Loader from "../../components/Loader/Loader";

export default function UserView({ username }) {
  const [gists, setGists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const owner: any = gists.length > 0 && gists[0].owner;

  useEffect(() => {
    getGists();
  }, [username, user]);

  useEffect(() => {
    getGists();
  }, []);

  const getGists = async () => {
    setLoading(true);
    if (user && username === user.username) {
      const res = await getAuthUserGists();
      setGists(res);
    } else {
      const response = await getUserGists(username);
      setGists(response);
    }
    setLoading(false);
  };

  const openGistDetails = (gist: any) => {
    navigate("/gistdetails", { state: { ...gist } });
  };

  const listGists = () => {
    if (gists && gists.length > 0) {
      return React.Children.toArray(
        gists.map((item) => (
          <UserGist onGistClick={() => openGistDetails(item)} item={item} />
        ))
      );
    }
  };

  return (
    <div>
      <GridContainer>
        <LeftDiv>
          <CenterDiv>
            <Avatar
              src={state?.owner?.avatar_url || owner?.avatar_url}
              sx={{ width: "12em", height: "12em", marginBottom: "1.7em" }}
            />
            <Typography variant="h5">
              {state?.owner?.login || owner.login}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                padding: ".4em 3em",
                textTransform: "none",
                marginTop: "2em",
              }}
            >
              <StyledLink href={state?.owner?.html_url || owner.html_url}>
                View Github Profile
              </StyledLink>
            </Button>
          </CenterDiv>
        </LeftDiv>
        <RightDiv>{loading ? <Loader /> : listGists()}</RightDiv>
      </GridContainer>
    </div>
  );
}
