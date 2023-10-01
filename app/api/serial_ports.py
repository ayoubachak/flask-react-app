from flask import jsonify
import serial.tools.list_ports
from app.api import serial_ports_api

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
