from flask import Flask, request, Response, jsonify
import random

temperature = 25
humidity = 70
luminosity = 2000
water_level = 2

app = Flask(__name__)

@app.route('/healthcheck', methods=['GET'])
def healthcheck():
    return Response(status=200)

@app.route('/sensor/temperature', methods=['GET'])
def temperature_sensor():
    try:
        diff = round(random.uniform(-1.0, 1.0), 2)
        return jsonify(
            temperature=temperature+diff,
            status=200
        )
    except:
        return jsonify(
            status=500
        )
@app.route('/sensor/humidity', methods=['GET'])
def humidity_sensor():
    try:
        diff = round(random.uniform(-1, 1), 2)
        return jsonify(
            humidity=humidity+diff,
            status=200
        )
    except:
        return jsonify(
            status=500
        )

@app.route('/sensor/luminosity', methods=['GET'])
def luminosity_sensor():
    try:
        diff = round(random.uniform(-10, 10), 2)
        return jsonify(
            luminosity=luminosity+diff,
            status=200
        )
    except:
        return jsonify(
            status=500
        )

@app.route('/sensor/water', methods=['GET'])
def water_sensor():
    try:
        diff = round(random.uniform(-0.2, 0.2), 2)
        return jsonify(
            water_level=water_level+diff,
            status=200
        )
    except:
        return jsonify(
            status=500
        )
    
app.run(debug=True, use_reloader=True)