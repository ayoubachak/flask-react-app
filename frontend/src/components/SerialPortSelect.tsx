import axios from "axios";
import useFetchSerialPorts from "../hooks/useFetchSerialPorts";
import Port from "../types/Port";
import { autodetectSTMPort, testSTMConnection } from "../services/services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface SerialPortSelectProps {
    selectedPort: Port | null;
    setSelectedPort: (port: Port | null) => void;
}
  
const SerialPortSelect: React.FC<SerialPortSelectProps> = ({
    selectedPort,
    setSelectedPort,
}) => {
    const { serialPorts: ports, refresh } = useFetchSerialPorts();
    const [connectionState, setConnectionState] = useState<Boolean | null>(null);
    const navigate = useNavigate();

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
      
      const handleTestConnection = async () => {
        try {
            if ( selectedPort !== null){
                await testSTMConnection(selectedPort?.name); // Replace 'COM3' with the selected port
                setConnectionState(true);
                navigate('/control/'+selectedPort.name);
            }
        } catch (error : any) {
            setConnectionState(false);
            alert(`Error: ${error.message}`);
        }
      };

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
        <button className="m15" onClick={handleTestConnection}>
            {
                connectionState !== null ? 
                    connectionState ? 'Connected' : 'Not Connected'
                :"Test Connection" 
            }
        </button>
      </div>
    );
  };
  

export default SerialPortSelect;