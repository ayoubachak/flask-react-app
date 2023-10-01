// Home.tsx
import React, { useState } from "react";
import Port from "../types/Port";
import SerialPortSelect from "../components/SerialPortSelect";

const Home: React.FC = () => {
    const [selectedPort, setSelectedPort] = useState<Port | null>(null);

  return (
    <div className="home">
      <h1>Welcome to IPS IHM</h1>
      <SerialPortSelect selectedPort={selectedPort} setSelectedPort={setSelectedPort}/>
    </div>
  );
};

export default Home;
 