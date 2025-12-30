import requests
import json

base_url = "http://127.0.0.1:5000"

def test_get_locations():
    try:
        r = requests.get(f"{base_url}/get_location_names")
        if r.status_code == 200:
            data = r.json()
            locations = data.get('locations', [])
            print(f"SUCCESS: Fetched {len(locations)} locations.")
            print(f"Sample: {locations[:5]}")
        else:
            print(f"FAIL: Status {r.status_code}")
    except Exception as e:
        print(f"FAIL: {e}")

def test_predict():
    payload = {
        "total_sqft": 1000,
        "location": "whitefield",
        "bhk": 2,
        "bath": 2
    }
    try:
        r = requests.post(f"{base_url}/predict", json=payload)
        if r.status_code == 200:
            data = r.json()
            print(f"SUCCESS: Prediction for 1000sqft, 2BHK, 2Bath, Whitefield: {data['estimated_price']} Lakhs")
        else:
            print(f"FAIL: Status {r.status_code}")
            print(r.text)
    except Exception as e:
        print(f"FAIL: {e}")

if __name__ == "__main__":
    print("Testing API...")
    test_get_locations()
    test_predict()
