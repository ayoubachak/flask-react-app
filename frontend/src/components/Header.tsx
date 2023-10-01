// Header.tsx
import React, { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

const Header: React.FC = () => {
  const socket = useSocket();
  const [statusMessage, setStatusMessage] = useState("Disconnected");
  const [dotColor, setDotColor] = useState("red");
  // Determine the status message and dot color based on socket connection
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setStatusMessage("Connected");
        setDotColor("green");
      });

      socket.on("disconnect", () => {
        setStatusMessage("Disconnected");
        setDotColor("red");
      });
    }
  }, [socket]);

  return (
    <header style={{ position: "sticky", top: "0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div> </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: dotColor,
              borderRadius: "50%",
              marginRight: "5px",
            }}
          ></div>
          <div>{statusMessage}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
