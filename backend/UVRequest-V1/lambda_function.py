import json
import requests
import os

# Environment variables for API configuration
API_KEY = os.environ["API_KEY"]
OPENUV_URL = os.environ["OPENUV_URL"]

def get_uv_index(lat: float, lon: float) -> float | None:
    """
    Fetches the current UV index from the OpenUV API for given coordinates.

    Args:
        lat (float): Latitude of the location
        lon (float): Longitude of the location

    Returns:
        float | None: UV index if successful, None if the API request fails
    """
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

def get_uv_color(uv_index: float) -> str:
    """
    Determines the risk level color based on the UV index value.

    Args:
        uv_index (float): UV index value

    Returns:
        str: Color code representing UV risk level:
            - green: Low risk (0-2)
            - yellow: Moderate risk (3-5)
            - red: High risk (6-10)
            - purple: Extreme risk (11+)
    """
    if uv_index <= 2:
        return "green"
    elif 3 <= uv_index <= 5:
        return "yellow"
    elif 6 <= uv_index <= 10:
        return "red"
    else:
        return "purple"

def lambda_handler(event, context):
    """
    AWS Lambda handler function that processes requests for UV index data.

    Args:
        event: AWS Lambda event object containing request data:
            - lat (float): Latitude of the location
            - lon (float): Longitude of the location
        context: AWS Lambda context object

    Returns:
        dict: Response object with:
            - statusCode (int): HTTP status code
            - headers (dict): CORS and other HTTP headers
            - body (str): JSON string containing:
                - uv_index (float): Current UV index
                - color (str): Risk level color code
                - error (str): Error message if something fails
    """
    print("Received Event:", json.dumps(event, indent=2))

    # Validate API key is present
    if not API_KEY:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "API_KEY is missing"})
        }

    try:
        body = event
        print("Parsed Body:", body)
        
        # Extract and validate coordinates
        lat = float(body.get("lat", 0))
        lon = float(body.get("lon", 0))
        print("Parsed Latitude:", lat)
        print("Parsed Longitude:", lon)

        # Get UV index from OpenUV API
        uv_index = get_uv_index(lat, lon)
        if uv_index is None:
            return {
                "statusCode": 500,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                },
                "body": json.dumps({"error": "Failed to fetch UV index"})
            }

        # Determine risk level color
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