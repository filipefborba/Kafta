import json
from kafka import KafkaConsumer
from flask import Flask, make_response, request
import os

app = Flask(__name__)

@app.route('/pacific_topic', methods=['GET'])
def get_pacific_topic():
    consumer = KafkaConsumer(
        group_id=None,
        auto_offset_reset='latest',
        bootstrap_servers='ec2-18-232-74-24.compute-1.amazonaws.com:9092')
    consumer.subscribe(['Pacific'])
    lastMessage = None
    for message in consumer:
        lastMessage = message.value.decode('utf-8')
        # message value and key are raw bytes -- decode if necessary!
        # e.g., for unicode: `message.value.decode('utf-8')`
        print ("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition,
                                              message.offset, message.key,
                                              message.value))
        break

    content = json.dumps(lastMessage)
    response = make_response(
        content, 200, {'Content-Type': 'application/json'})
    # Check utils.json_response ;)
    return response


@app.route('/atlantic_topic', methods=['GET'])
def get_atlantic_topic():
    consumer = KafkaConsumer(auto_offset_reset='latest',
                             bootstrap_servers='18.232.74.24:9092')
    consumer.subscribe(['Atlantic'])
    lastMessage = None
    for message in consumer:
        lastMessage = message.value.decode('utf-8')
        # message value and key are raw bytes -- decode if necessary!
        # e.g., for unicode: `message.value.decode('utf-8')`
        print ("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition,
                                              message.offset, message.key,
                                              message.value))
        break

    content = json.dumps(lastMessage)
    response = make_response(
        content, 200, {'Content-Type': 'application/json'})
    # Check utils.json_response ;)
    return response

host = os.environ.get('IP', '0.0.0.0')
port = int(os.environ.get('PORT', 8888))
app.run(host=host, port=port)
