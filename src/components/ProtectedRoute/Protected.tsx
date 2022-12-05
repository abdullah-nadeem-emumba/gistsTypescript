import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected({ Component }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return <Component />;
}
