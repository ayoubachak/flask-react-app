// hooks/useFetchSerialPorts.js
import { useEffect, useState } from 'react';
import { fetchSerialPorts } from '../services/services';
import Port from '../types/Port';

interface FetchSerialPortsResult {
    serialPorts: Port[];
    isLoading: boolean;
    error: Error | null;
    refresh : () => void
  }
  
  const useFetchSerialPorts = (): FetchSerialPortsResult => {
    const [serialPorts, setSerialPorts] = useState<Port[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    const fetchData = async () => {
      try {
        const ports = await fetchSerialPorts();
        setSerialPorts(ports);
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  
    const refresh = ()=>{
      fetchData();
    }

    return { serialPorts, refresh, isLoading, error };
  };
  
  export default useFetchSerialPorts;