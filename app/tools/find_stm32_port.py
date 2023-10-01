import serial.tools.list_ports

def find_stm32_port():
    # Get a list of available serial ports
    ports = list(serial.tools.list_ports.comports())
    
    stm32_port = None
    
    for port in ports:
        # Check if the USB VID/PID matches that of STM32
        # print(f"Found Port : Port(\nname={port.name},\ndescription={port.description},\ndevice={port.device})" )
        if "STM" in port.description or "STM" in port.device:
            stm32_port = port.device
            break
    
    return stm32_port

if __name__ == "__main__":
    stm32_port = find_stm32_port()
    if stm32_port:
        print(f"STM32 is connected to port: {stm32_port}")
    else:
        print("STM32 not found. Check your connections.")
