import json
import os
import requests

API_KEY = "openuv-h8j7rm85ksa0l-io"
OPENUV_URL = "https://api.openuv.io/api/v1/uv"

def get_uv_index(lat, lon):
    headers = {"x-access-token": API_KEY}
    params = {"lat": lat, "lng": lon}
    
    response = requests.get(OPENUV_URL, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        uv_index = data.get("result", {}).get("uv", 0)
        return uv_index
    else:
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
    print("API_KEY:", API_KEY)
    if not API_KEY:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "API_KEY is missing"})
        }
    try:

        query_params = event.get("queryStringParameters", {})
        lat = float(query_params.get("lat", 0))
        lon = float(query_params.get("lon", 0))


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
        return {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": "*",  
            },
            "body": json.dumps({"error": str(e)})
        }