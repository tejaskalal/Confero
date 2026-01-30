import React, { useState } from "react";
import WithAuth from "../utils/WithAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import RestoreIcon from "@mui/icons-material/Restore";
import Button from "@mui/material/Button";
import { IconButton, TextField } from "@mui/material";

function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  let handleJoinVideoCall = async () => {
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="naBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Confero Video Call</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <RestoreIcon />
          </IconButton>
          <p>History</p>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Call Juat Like Quality Butter</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              ></TextField>
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join Meeting
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/videocallimg.png" alt="video-call-img" />
        </div>
      </div>
    </>
  );
}

export default WithAuth(Home);
