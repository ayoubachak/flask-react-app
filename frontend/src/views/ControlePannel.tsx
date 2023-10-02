import { useEffect, useState } from "react";
import RealTimeChart from "../components/ChartTest";
import Header from "../components/Header";
import DataPoint from "../types/DataPoint";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";

function* dataGenerator(): Generator<DataPoint | null, any, unknown> {
    const maxCount = 10; // Change this number to the desired count
    while(true){
        for (let i = 0; i<maxCount; i++){
            yield { time: new Date(), value: Math.random() * 100 };
        }
        for (let i = 0; i<maxCount; i++){
            yield null;
        }
    }
  }
function * nullGenerator(): Generator<DataPoint | null, any, unknown> {
    while(true){
        yield null;
    }
}

const ControlPannel : React.FC = ()=>{
    const { com } = useParams(); // get the com port from the params 
    const [voltageVal, setVoltageVal] = useState(19);
    const [currentVal, setCurrentVal] = useState(0.3);
    const [powertVal, setPowerVal] = useState(voltageVal * currentVal);
    const [uartData, setUartData] = useState<string | null>(null);


    const socket = useSocket();
    
    // socket operations
    const startReception = () => {
        console.log("Sent socket request data read")
        socket.emit('serial-data-request', com); // Replace with your com port
      };
    const stopReception = ()=>{
        socket.emit('serial-data-stop');
    }
    
      useEffect(() => {
        // Listen for UART data from the backend
        socket.on('serial-data', (data : any) => {
          // Update the state with the received UART data
          console.log(data)
          setUartData(JSON.stringify(data)); // You can parse the data as needed
        });
    
        return () => {
          socket.off('serial-data'); // Remove the event listener
        };
      }, []);

    return <>
        <Header/>
        <div className="content">
            <div style={{ paddingBottom: '20px', borderBottom: '2px white solid' }}>
                <button className="m15" onClick={startReception}>Start Reception</button>
                <button className="m15" onClick={stopReception}>Stop Reception</button>
                <p>Data received : {uartData}</p>
            </div>
            <div className="distance-control">
                <label className="m15" htmlFor="distance">Entrer la distance :</label>
                <input type="number" className="m15" name="distance" id="distance" placeholder="Distance en mm"/>
                <button>Set</button>
                <div className="m15">
                    <button className="m15 up">👆</button>
                    <button className="m15 down">👇</button>
                </div>
            </div>
            <h2>Data</h2>
            <div className="data-display">
                <div className="data-element">
                    <div className="data-label">
                        Voltage (V)
                    </div>
                    <div className="data-value">
                        {voltageVal}
                    </div>
                </div>
                <div className="data-element">
                    <div className="data-label">
                        Courant (V)
                    </div>
                    <div className="data-value">
                        {currentVal}
                    </div>
                </div>
                <div className="data-element">
                    <div className="data-label">
                        Puissance (W)
                    </div>
                    <div className="data-value">
                        {powertVal}
                    </div>
                </div>
            </div>
            <h2>Graphs</h2>
            <div className="graphs">
                <RealTimeChart dataGenerator={nullGenerator} title="Graph du Voltage" xAxisLabel="Temps" yAxisLabel="Voltage"/>
                <RealTimeChart dataGenerator={nullGenerator} title="Graph du Courant" xAxisLabel="Temps" yAxisLabel="Courant"/>
            </div>
        </div>
    </>
}

export default ControlPannel;
