// Home.tsx
import React, { useState } from "react";
import Port from "../types/Port";
import SerialPortSelect from "../components/SerialPortSelect";
import Header from "../components/Header";

const Home: React.FC = () => {
    const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  
  return (<>
    <Header/>
    <div className="home">
      <h1>Welcome to IPS IHM</h1>
      <SerialPortSelect selectedPort={selectedPort} setSelectedPort={setSelectedPort}/>
    </div>
    {/* <Footer/> */}
  </>
  );
};

export default Home;
 