from kafka import KafkaProducer
from kafka.errors import KafkaError
from threading import Thread, current_thread
import json
import random

# Initial parameters
temperature = 23
luminosity = 2000
salinity = 35

def threaded_function():
    while(True):
        data = {}
        sensor_id = current_thread().getName()
        diff_temp = round(random.uniform(-1.0, 1.0), 2)
        diff_luminosity = round(random.uniform(-10, 10), 2)
        diff_salinity = round(random.uniform(-0.1, 0.1), 2)
        data["id"] = sensor_id
        data["temperatura"] = temperature+diff_temp
        data["luminosidade"] = luminosity+diff_luminosity
        data["salinidade"] = salinity+diff_salinity
        producer.send('Atlantic', str.encode(json.dumps(data)))

producer = KafkaProducer(bootstrap_servers=['35.174.9.63:9092'])

thread1 = Thread(target=threaded_function, name="atlantic-1")
thread1.start()

thread2 = Thread(target=threaded_function, name="atlantic-2")
thread2.start()

thread3 = Thread(target=threaded_function, name="atlantic-3")
thread3.start()

thread4 = Thread(target=threaded_function, name="atlantic-4")
thread4.start()

thread5 = Thread(target=threaded_function, name="atlantic-5")
thread5.start()
