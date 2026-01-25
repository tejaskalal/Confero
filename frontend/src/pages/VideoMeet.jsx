import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "../styles/VideoMeet.css";
const server_url = "http://localhost:8000";

var connections = {};

const peeringConnections = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302"],
    },
  ],
};

function VideoMeet() {
  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = React.useState(true);
  let [audioAvailable, setAudioAvailable] = React.useState(true);
  let [video, setVideo] = React.useState();
  let [audio, setAudio] = React.useState();
  let [screen, setScreen] = React.useState();
  let [showModel, setShowModel] = React.useState();
  let [screeAvailable, setScreenAvailable] = React.useState();
  let [messages, setMessages] = React.useState([]);
  let [message, setMessage] = React.useState("");
  let [newMessages, setNewMessages] = React.useState(0);
  let [askForUsername, setAskForUsername] = React.useState(true);
  let [username, setUsername] = React.useState("");

  const videoRef = useRef();
  let [videos, setVideos] = React.useState([]);

  const getPermmission = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoPermission) setVideoAvailable(true);
      else setVideoAvailable(false);

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (audioPermission) setAudioAvailable(true);
      else setAudioAvailable(false);

      let screenPermission;
      if (navigator.mediaDevices.getDisplayMedia) {
        screenPermission = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

        if (screenPermission) setScreenAvailable(true);
        else setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable || screeAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });

        if (userMediaStream && localVideoRef.current) {
          localVideoRef.current.srcObject = userMediaStream;
        }
      }
    } catch (err) {
      console.log("Permission error:", err);
    }
  };

  useEffect(() => {
    getPermmission();
  }, []);

  let getUserMediaSuccess = (stream) => {};

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({
          video: video,
          audio: audio,
        })
        .then((stream) => {
          getUserMediaSuccess(stream);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [video, audio]);

  let getMedia = () => {
    setAudio(videoAvailable);
    setVideo(audioAvailable);
  };

  let connect = () => {
    getMedia();
  };

  return (
    <div>
      {askForUsername === true ? (
        <div>
          <h2>Enter into Lobby</h2>

          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Button variant="contained" onClick={connect}>
            Connect
          </Button>

          <div>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default VideoMeet;
