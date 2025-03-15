import json
from datetime import datetime, timedelta

def lambda_handler(event, context):
    try:
        # Parse the input event to get departure and return times
        departure_time_str = event['departure_time']  # Format: "2023-10-01T09:00:00"
        return_time_str = event['return_time']        # Format: "2023-10-01T17:00:00"

        # Convert strings to datetime objects
        departure_time = datetime.fromisoformat(departure_time_str)
        return_time = datetime.fromisoformat(return_time_str)

        # Calculate reminder times every 2 hours between departure and return time
        reminder_times = []
        current_time = departure_time

        # Add reminder times every 2 hours until return time
        while current_time < return_time:
            reminder_times.append(current_time.isoformat())  # Append time in ISO format
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
