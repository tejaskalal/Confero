# Confero – Real-Time Video Conferencing Web App

Confero is a full-stack real-time video conferencing web application that allows users to connect through **video, audio, and chat** directly from their browser. The application uses **WebRTC** for peer-to-peer media streaming and **Socket.IO** for real-time signaling and chat communication, ensuring low latency and secure communication.

---
**Live Demo:** https://conferofrontend.onrender.com
**Backend API:** https://conferobackend.onrender.com  

## Features

- User authentication (Login / Signup)
- Real-time video calling
- Screen sharing
- Microphone & camera toggle
- Live chat during video meetings
- Room-based video conferencing
- Meeting history tracking
- Browser-based (No downloads required)

---

## Technologies used

- **Frontend:** React (Vite), Material UI  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Realtime Communication:** Socket.IO (WebSockets)  
- **Media Streaming:** WebRTC  
- **Deployment:** Render

---

## How It Works

1. Users authenticate using REST APIs over HTTP/HTTPS.
2. When a user joins a meeting, a WebSocket connection is established via Socket.IO.
3. Socket.IO is used for:
   - WebRTC signaling (SDP offers/answers, ICE candidates)
   - Real-time chat messages
   - User join/leave events
4. WebRTC establishes a **peer-to-peer connection** between participants.
5. Audio and video streams are exchanged directly between browsers using **encrypted SRTP channels**.
6. Chat messages are delivered instantly using WebSockets.
7. Meeting details and history are stored in MongoDB.

---

## Real-Time Chat Communication

- Chat runs alongside video calls
- Instant message delivery using WebSockets
- Improves collaboration during meetings
- Lightweight and scalable

---

## Security

- End-to-end encrypted media using SRTP
- Secure WebSocket signaling
- Backend validation and CORS handling

---

## Scalability

- Peer-to-peer media streaming reduces server load
- Signaling and chat handled by Socket.IO
- Supports multiple concurrent meeting rooms
- TURN server support for restrictive networks

---

##  Why Confero?

Unlike traditional video conferencing platforms that route media through servers, Confero uses **direct peer-to-peer communication**, resulting in lower latency, better performance, and improved scalability.

---

## Future Enhancements

- File sharing in chat
- Chat message persistence
- Meeting recording
- Advanced participant controls

---
