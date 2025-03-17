import json
import requests
import os

API_KEY = os.environ["API_KEY"]
OPENUV_URL = os.environ["OPENUV_URL"]

def get_uv_index(lat, lon):
    headers = {"x-access-token": API_KEY}
    params = {"lat": lat, "lng": lon}
    print("Sending request to OpenUV API with params:", params)
    
    response = requests.get(OPENUV_URL, headers=headers, params=params)
    print("API Response Status Code:", response.status_code)
    print("API Response Body:", response.json())
    
    if response.status_code == 200:
        data = response.json()
        uv_index = data.get("result", {}).get("uv", 0)
        print("Extracted UV Index:", uv_index)
        return float(uv_index)
    else:
        print("API request failed")
        return None

def get_uv_color(uv_index):
    if uv_index <= 2:
        return "green"
    elif 3 <= uv_index <= 5:
        return "yellow"
    elif 6 <= uv_index <= 10:
        return "red"
    else:
        return "purple"

def lambda_handler(event, context):
    print("Received Event:", json.dumps(event, indent=2))

    if not API_KEY:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "API_KEY is missing"})
        }

    try:
        body = event
        print("Parsed Body:", body)
        
        lat = float(body.get("lat", 0))
        lon = float(body.get("lon", 0))
        print("Parsed Latitude:", lat)
        print("Parsed Longitude:", lon)

        uv_index = get_uv_index(lat, lon)
        if uv_index is None:
            return {
                "statusCode": 500,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                },
                "body": json.dumps({"error": "Failed to fetch UV index"})
            }

        uv_color = get_uv_color(uv_index)
        print("Calculated UV Color:", uv_color)

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({
                "uv_index": uv_index,
                "color": uv_color
            })
        }

    except Exception as e:
        print("Error occurred:", str(e))
        return {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": str(e)})
        }