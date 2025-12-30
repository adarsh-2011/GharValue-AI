from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import json
import numpy as np

app = Flask(__name__)
# Allow CORS for all domains for simplicity in this project
CORS(app)

__model = None
__data_columns = None

def load_saved_model():
    print("Loading saved model...start")
    global __data_columns
    global __model

    with open("./columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']

    with open("./model.pkl", "rb") as f:
        __model = pickle.load(f)
    print("Loading saved model...done")

@app.route('/predict', methods=['POST'])
def predict_home_price():
    data = request.json
    total_sqft = float(data['total_sqft'])
    location = data['location']
    bhk = int(data['bhk'])
    bath = int(data['bath'])

    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = total_sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return jsonify({
        'estimated_price': float(__model.predict([x])[0])
    })

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': __data_columns[3:]
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server for Home Price Prediction...")
    load_saved_model()
    app.run(debug=True)
