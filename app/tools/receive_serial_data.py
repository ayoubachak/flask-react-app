from find_stm32_port import find_stm32_port
import serial

if __name__=='__main__':
    stm32_port = find_stm32_port()

    if stm32_port:
        print("Found STM32 board on port:", stm32_port)
         # Create a serial connection
        ser = serial.Serial(stm32_port, baudrate=115200, timeout=1)  # Adjust the baud rate as needed

        try:
            while True:
                data = ser.readline()  # Read a line of data from the serial port
                distance_data, voltage_data, current_data = [val.split("=")[1] for val in data.decode('utf-8').strip().split(";") ] 
                print(f"{distance_data=},{voltage_data=},{current_data=}")
        except KeyboardInterrupt:
            # Close the serial connection when the program is interrupted
            ser.close()
            print("Serial connection closed.")
    else:
        print("STM32 board not found on any available ports.")

