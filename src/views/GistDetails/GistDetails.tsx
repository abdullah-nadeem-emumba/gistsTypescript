import React, { useState, useContext, useEffect } from "react";
import {
  HeaderRightDiv,
  StyledHeaderDiv,
  GistScreenContainer,
  EachDiv,
  BorderedDiv,
  StyledGistCard,
  CardHeader,
  CardContent,
  StyledText,
  LineNumberText,
  FlexDiv,
  CenterDiv,
} from "./GistDetails.styles";
import { Typography, CircularProgress } from "@mui/material";
import UserInfo from "../../components/UserInfo/UserInfo";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import ArrowsBox from "../../components/ArrowBox/ArrowBox";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { formatFileContent } from "../../utils/utils";
import {
  isGistStarred,
  getGistContent,
  starGist,
  unStarGist,
  deleteGist,
  forkGist,
} from "../../api/api";

export default function GistDetails() {
  const [filecontent, setFileContent] = useState<string[]>([]);
  const [filesData, setFilesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [starred, setStarred] = useState<Boolean | undefined>(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { files, owner, id, description } = state;
  const filename = Object.keys(files)[0];
  const { user } = useContext(UserContext);

  const checkGistStar = async (gistID: string) => {
    const res = await isGistStarred(gistID);
    setStarred(res);
  };

  const editGist = () => {
    navigate("/create", {
      state: { files: filesData, description, id },
    });
  };

  const deleteMyGist = async (gistID: string) => {
    const res = await deleteGist(gistID);
    if (res) navigate("/");
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

  const fork = async (gistID: string) => {
    const res = await forkGist(gistID);
  };

  const getFileContent = async () => {
    setLoading(true);
    try {
      const filesArr = Object.keys(files);
      let filesArray: any[] = [];
      filesArr.forEach(async (file) => {
        const res = await getGistContent(files[file].raw_url);
        filesArray.push({
          filename: file,
          content: res,
        });
      });
      const response = await getGistContent(files[filename].raw_url);
      const formattedContent = formatFileContent(response);
      setFilesData(filesArray);
      setFileContent(formattedContent);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkGistStar(id);
    getFileContent();
  }, []);

  const displayFileContent = () => {
    if (error) {
      return (
        <CenterDiv>
          <Typography>Unable to load gist...</Typography>
        </CenterDiv>
      );
    } else if (filecontent && filecontent.length > 0) {
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

  const showGistActions = () => {
    return user ? (
      <HeaderRightDiv>
        {user.username === owner.login && (
          <>
            {" "}
            <EachDiv onClick={editGist}>
              <EditIcon sx={{ color: "#0C76FF" }} />
              <Typography color={"#0C76FF"}>Edit</Typography>
            </EachDiv>
            <EachDiv onClick={() => deleteMyGist(id)}>
              <DeleteIcon sx={{ color: "#0C76FF" }} />
              <Typography color={"#0C76FF"}>Delete</Typography>
            </EachDiv>
          </>
        )}
        <EachDiv onClick={() => toggleStar(id)}>
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
        <EachDiv onClick={() => fork(id)}>
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
      </HeaderRightDiv>
    ) : null;
  };

  return loading ? (
    <CenterDiv>
      <CircularProgress />
    </CenterDiv>
  ) : (
    <GistScreenContainer>
      <StyledHeaderDiv>
        <UserInfo item={state} />
        {showGistActions()}
      </StyledHeaderDiv>
      <StyledGistCard elevation={5}>
        <CardHeader>
          <ArrowsBox />
          <Typography color={"#0C76FF"}>{filename}</Typography>
        </CardHeader>
        <CardContent>{displayFileContent()}</CardContent>
      </StyledGistCard>
    </GistScreenContainer>
  );
}
