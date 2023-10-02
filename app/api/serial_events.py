from app.extensions import socketio
from serial import Serial
import threading
from app.extensions import STM32_Conn

class SerialListener:
    def __init__(self):
        self.listener_started = False
        self.stop_listener = False
        self.conn = None

    def start_listener_thread(self, connection_port):
        if self.listener_started:
            return  # Listener is already running

        if STM32_Conn is not None:
            self.conn = STM32_Conn
        else:
            self.conn = Serial(connection_port, baudrate=115200, timeout=1)

        if self.conn is None:
            socketio.emit("data-error", "Failed to connect")
            return

        self.stop_listener = False  # Reset the stop flag

        listener_thread = threading.Thread(target=self.serial_data_listener, args=(self.conn,))
        listener_thread.daemon = True
        listener_thread.start()
        self.listener_started = True

    def stop_listener_thread(self):
        if self.listener_started:
            self.stop_listener = True
            print("Stopping listener...")

    def serial_data_listener(self, conn):
        while True:
            data = conn.readline()
            if self.stop_listener:
                conn.close()
                self.listener_started = False
                print("Serial connection closed.")
                return

            try:
                distance_data, voltage_data, current_data = [val.split("=")[1] for val in data.decode('utf-8').strip().split(";")]
                serial_data = f"{distance_data=},{voltage_data=},{current_data=}"
                print(serial_data)
                socketio.emit("serial-data", {"distance_data": distance_data, "voltage_data": voltage_data, "current_data": current_data})
            except ValueError:
                socketio.emit("data-error", "Something went wrong when reading the data from the STM32 board")
                conn.close()
                self.listener_started = False
                print("Serial connection closed.")

# Create an instance of SerialListener
serial_listener = SerialListener()

@socketio.on("serial-data-request")
def start_listener(connection_port):
    print("Received data request from client")
    serial_listener.start_listener_thread(connection_port)

@socketio.on("serial-data-stop")
def stop_listener():
    serial_listener.stop_listener_thread()