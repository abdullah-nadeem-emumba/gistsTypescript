import React, { useState, useEffect } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { isGistStarred, starGist, unStarGist } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Star({ id, handleStar, handleUnstar }) {
  const navigate = useNavigate();
  const [starred, setStarred] = useState<Boolean | undefined>(false);

  useEffect(() => {
    checkGistStar(id);
  }, []);

  const checkGistStar = async (gistID: string) => {
    const res = await isGistStarred(gistID);
    setStarred(res);
  };

  const star = async (gistID: string) => {
    const res = await starGist(gistID);
    if (res) setStarred(true);
  };

  const unStar = async (gistID: string) => {
    const res = await unStarGist(gistID);
    if (res) {
      setStarred(false);
    }
  };

  return starred ? (
    <StarIcon
      onClick={() => handleUnstar(id, setStarred)}
      sx={{ color: "#5acba1", cursor: "pointer" }}
    />
  ) : (
    <StarBorderIcon
      onClick={() => handleStar(id, setStarred)}
      sx={{ color: "#5acba1", cursor: "pointer" }}
    />
  );
}
