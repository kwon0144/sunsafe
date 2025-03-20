import json
from datetime import datetime, timedelta

def lambda_handler(event, context):
    """
    AWS Lambda handler function that calculates sunscreen reapplication reminder times.
    Generates reminders every 2 hours between the provided departure and return times.

    Args:
        event: AWS Lambda event object containing:
            - departure_time (str): ISO format datetime string (e.g., "2023-10-01T09:00:00")
            - return_time (str): ISO format datetime string (e.g., "2023-10-01T17:00:00")
        context: AWS Lambda context object

    Returns:
        dict: Response object with:
            - statusCode (int): HTTP status code (200 for success, 500 for error)
            - body (str): JSON string containing:
                - reminder_times (list): List of ISO format datetime strings for reminders
                - or error message if something fails
    """
    try:
        # Parse the input event to get departure and return times
        departure_time_str = event['departure_time']  # Format: "2023-10-01T09:00:00"
        return_time_str = event['return_time']        # Format: "2023-10-01T17:00:00"

        # Convert strings to datetime objects for calculations
        departure_time = datetime.fromisoformat(departure_time_str)
        return_time = datetime.fromisoformat(return_time_str)

        # Initialize list to store reminder times
        reminder_times = []
        current_time = departure_time

        # Add reminder times every 2 hours until return time
        while current_time < return_time:
            reminder_times.append(current_time.isoformat())  # Store time in ISO format
            current_time += timedelta(hours=2)  # Increment by 2 hours

        # Return the calculated reminder times
        return {
            'statusCode': 200,
            'body': json.dumps({
                'reminder_times': reminder_times
            })
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps('Failed to calculate reminder times.')
        }
