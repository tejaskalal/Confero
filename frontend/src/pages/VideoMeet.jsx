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

  let gotMessageFromServer = (formId, message) => {};

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: "false" });

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href);

      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        setVideo((videos) => videos.filter((video) => video.socketId !== id));
      });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(peeringConnections);

          connections[socketListId].onicecandidate = (event) => {
            if (event.candidate !== null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate }),
              );
            }
          };

          connect[socketListId].onaddstream = (event) => {
            let videoExists = videoRef.current.find(
              (video) => video.socketId === socketListId,
            );

            if (videoExists) {
              setVideo((videos) => {
                const updateVideos = videos.map((video) =>
                  video.socketId === socketListId
                    ? { ...video, stream: event.stream }
                    : video,
                );

                videoRef.current = updateVideos;
                return updateVideos;
              });
            } else {
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoPlay: true,
                playsinline: true,
              };

              setVideos((videos) => {
                const updateVideos = [...video, newVideo];
                videoRef.current = updatedVideos;
                return updateVideos;
              });
            }
          };

          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            //todo black silence
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {}

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.cuurent.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription }),
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

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
