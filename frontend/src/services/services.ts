import Port from "../types/Port";
import api from "./api";


export const fetchSerialPorts = async (): Promise<Port[]> => {
    try {
      const response = await api.get('/serial/ports');
      console.log("Data : ", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const autodetectSTMPort =async (): Promise<Port> => {
  try {
    const response = await api.post('/serial/autodetect');
    console.log("AutoDetected : ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};