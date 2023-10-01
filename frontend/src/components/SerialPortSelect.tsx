import axios from "axios";
import useFetchSerialPorts from "../hooks/useFetchSerialPorts";
import Port from "../types/Port";
import { autodetectSTMPort } from "../services/services";
import { useState } from "react";
interface SerialPortSelectProps {
    selectedPort: Port | null;
    setSelectedPort: (port: Port | null) => void;
}
  
const SerialPortSelect: React.FC<SerialPortSelectProps> = ({
    selectedPort,
    setSelectedPort,
}) => {
    const { serialPorts: ports, refresh } = useFetchSerialPorts();
    const [autoDetected, setAutoDetected] = useState<Boolean | null>(null); 

    const handlePortSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      // Find the Port object based on the selectedValue
      const newSelectedPort = ports.find((port) => port.name === selectedValue) || null;
      setSelectedPort(newSelectedPort);
    };

    const handleAutoDetect = async () => {
        try {
          const detectedPort = await autodetectSTMPort();
          setSelectedPort(detectedPort);
        } catch (error : any) {
          console.error('Error detecting STM device:', error.message);
          alert('STM device not found');
        }
      };
      const handleRefresh = ()=>{
        refresh();
      }

    return (
      <div className="setting-section" style={{ flex: "flex-start" }}>
        <label htmlFor="serial-port" className="m15">
          Select Port :
        </label>
        <select
          name="serial-port"
          className="m15"
          id="serial-port-select"
          value={selectedPort ? selectedPort.name : ""}
          onChange={handlePortSelect}
        >
          {ports.map((port) => (
            <option value={port.name} key={port.name}>
              {port.name}
            </option>
          ))}
        </select>
        <button onClick={handleRefresh}>🔁</button>
        <button className="m15" onClick={handleAutoDetect} >
        Auto-Detect Port
        </button>
        <button className="m15">Test Connection</button>
      </div>
    );
  };
  

export default SerialPortSelect;