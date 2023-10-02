from flask import jsonify, request
import serial.tools.list_ports
from app.api import serial_ports_api
from app.extensions import STM32_Conn

class Port():
    def __init__(self, name, description, device) -> None:
        self.name = name
        self.description = description
        self.device = device


@serial_ports_api.route('/ports', methods=['GET'])
def get_all_serial_ports():
    ports = list(serial.tools.list_ports.comports())
    port_list = []

    for ind, port in enumerate(ports):
        port_info = {
            'id':ind,
            'name': port.device,
            'description': port.description,
            'device': str(port),
        }
        port_list.append(port_info)

    return jsonify(port_list)

@serial_ports_api.route('/autodetect', methods=['POST'])
def auto_detect_stm_port():
    stm_description = "STM" 
    ports = list(serial.tools.list_ports.comports())

    for port in ports:
        if stm_description in port.description:
            return jsonify({
                'name': port.device,
                'description': port.description,
                'device': str(port)
            })

    return jsonify({'message': 'STM device not found'}), 404

@serial_ports_api.route('/testconnection', methods=['POST'])
def test_stm_connection():
    global STM32_Conn

    if STM32_Conn is not None: # check if the connection is already established
        if isinstance(STM32_Conn, serial.Serial) and STM32_Conn.is_open:
            return jsonify({'message': 'Connection successful'})
    # Get the selected port from the request data
    selected_port = request.json.get('selected_port')

    # Check if the selected port description contains "STM"
    try:
        # Attempt to establish a serial connection
        serial_conn = serial.Serial(selected_port, baudrate=115200, timeout=1)
        if serial_conn.is_open:
            # Store the successful connection in STM32_Conn
            STM32_Conn = serial_conn
            return jsonify({'message': 'Connection successful'})
    except serial.SerialException as e:
        return jsonify({'error': str(e)}), 500

