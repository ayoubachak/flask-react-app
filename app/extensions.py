from typing import Optional
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from serial import Serial


db = SQLAlchemy()

#### async mode  #################################
async_mode = 'threading' # None

if async_mode is None:
    try:
        import eventlet
        async_mode = 'eventlet'
    except ImportError:
        pass

    if async_mode is None:
        try:
            from gevent import monkey
            async_mode = 'gevent'
        except ImportError:
            pass

    if async_mode is None:
        async_mode = 'threading'

    print('async_mode is ' + async_mode)

# monkey patching is necessary because this application uses a background
# thread
if async_mode == 'eventlet':
    import eventlet
    eventlet.monkey_patch()
elif async_mode == 'gevent':
    from gevent import monkey
    monkey.patch_all()
################################

socketio : SocketIO = SocketIO(cors_allowed_origins=['http://localhost:5173', 'http://localhost:5000'], async_mode=async_mode) # Still not sure about this server setup
STM32_Conn : Optional[Serial] = None