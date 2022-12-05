import React, { useState, useEffect, useContext } from "react";
import UserInfo from "../UserInfo/UserInfo";
import { Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { UserContext } from "../../contexts/UserContext";
import {
  EachDiv,
  LineNumberText,
  UpperDiv,
  BorderedDiv,
  StyledDiv,
  StyledCard,
  CenterDiv,
  FlexDiv,
  StyledText,
} from "./UserGist.styles";
import {
  starGist,
  unStarGist,
  getGistContent,
  isGistStarred,
  forkGist,
} from "../../api/api";
import { formatFileContent } from "../../utils/utils";

export default function UserGist({ item, onGistClick }) {
  const [filecontent, setFileContent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [starred, setStarred] = useState<Boolean | undefined>(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getFileContent();
    checkGistStar(item.id);
  }, []);

  const getFileContent = async () => {
    if (item) {
      setLoading(true);
      try {
        const filename = Object.keys(item.files)[0];
        const response = await getGistContent(item.files[filename].raw_url);
        const result = formatFileContent(response);
        setFileContent(result);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }
  };

  const toggleStar = async (gistID: string) => {
    if (!starred) {
      const res = await starGist(gistID);
      if (res) setStarred(true);
    } else {
      const res = await unStarGist(gistID);
      if (res) setStarred(false);
    }
  };

  const checkGistStar = async (gistID: string) => {
    const res = await isGistStarred(gistID);
    setStarred(res);
  };

  const fork = async (gistID: string) => {
    const res = await forkGist(gistID);
  };

  const displayFileContent = () => {
    if (error) {
      return (
        <CenterDiv>
          <Typography>Unable to load gist...</Typography>
        </CenterDiv>
      );
    } else if (filecontent.length > 0) {
      return React.Children.toArray(
        filecontent.map((line, index) => {
          return (
            <FlexDiv>
              {" "}
              <LineNumberText>{index + 1}</LineNumberText>
              <StyledText>{line}</StyledText>
            </FlexDiv>
          );
        })
      );
    }
  };
  return (
    <>
      <UpperDiv>
        <UserInfo item={item} />
        {user && (
          <StyledDiv>
            <EachDiv onClick={() => toggleStar(item.id)}>
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
            </EachDiv>
            <EachDiv onClick={() => fork(item.id)}>
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
            </EachDiv>
          </StyledDiv>
        )}
      </UpperDiv>
      <StyledCard onClick={() => onGistClick(item)} elevation={3}>
        {displayFileContent()}
      </StyledCard>
    </>
  );
}
