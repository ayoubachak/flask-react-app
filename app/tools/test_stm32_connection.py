from find_stm32_port import find_stm32_port


import serial

def test_stm32_connection(port):
    try:
        # Create a serial connection to the STM32 board
        ser = serial.Serial(port, baudrate=115200, timeout=1)  # Adjust baud rate and timeout as needed

        if ser.is_open:
            print("Serial port is open.")

            # Send a test command to the STM32 board
            test_command = b"AT\r\n"  # Replace with your test command
            ser.write(test_command)

            # Read and print the response
            response = ser.readline()
            print("Response from STM32:", response.decode('utf-8'))

        else:
            print("Failed to open the serial port.")

    except serial.SerialException as e:
        print("Serial port error:", str(e))
    finally:
        # Close the serial port
        if ser.is_open:
            ser.close()

# Find the STM32 port using your existing function

if __name__=='__main__':
    stm32_port = find_stm32_port()

    if stm32_port:
        print("Found STM32 board on port:", stm32_port)
        test_stm32_connection(stm32_port)
    else:
        print("STM32 board not found on any available ports.")

