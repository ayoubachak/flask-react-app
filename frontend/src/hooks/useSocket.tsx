import { useEffect } from 'react';
import { socket } from '../services/socket';



const useSocket = () => {
    useEffect(() => {
      const handleConnect = () => {
        console.log('Connected to Socket.io server');

    };
  
      const handleDisconnect = () => {
        console.log('Disconnected from Socket.io server');
      };


      // Event listeners for connect and disconnect
      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
  
      // Clean up event listeners
      return () => {
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
      };
    }, []);
  
    return socket;
  };
  
  export default useSocket;