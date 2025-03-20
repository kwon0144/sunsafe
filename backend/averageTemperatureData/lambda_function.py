import os
import mysql.connector
import json

def lambda_handler(event, context):
    """
    AWS Lambda handler function that retrieves monthly average temperature data from MySQL database.
    Calculates rounded average temperatures for each month from the temperature table.

    Args:
        event: AWS Lambda event object (not used in this function)
        context: AWS Lambda context object (not used in this function)

    Returns:
        dict: Response object with:
            - statusCode (int): HTTP status code (200 for success, 500 for error)
            - headers (dict): CORS headers
            - body (str): JSON string containing:
                - month (list): List of months
                - average (list): List of corresponding average temperatures (rounded)
                - error (str): Error message if database query fails
    """
    try:
        # Establish database connection using environment variables
        conn = mysql.connector.connect(
            host = os.environ["DB_HOST"], 
            user = os.environ["DB_USER"],       
            password = os.environ["DB_PASSWORD"],
            database = os.environ["DB_NAME"]
        )
        
        # Create cursor and execute query to get monthly average temperatures
        cursor = conn.cursor()
        query = """SELECT month, ROUND(AVG(temperature)) FROM temperature GROUP BY month;"""
        
        cursor.execute(query)
        result = cursor.fetchall()
        
        # Transform query results into separate month and temperature lists
        response = {
            'month': [row[0] for row in result],  # Extract months
            'average': [row[1] for row in result]  # Extract rounded average temperatures
        }

        # Clean up database resources
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            'body': json.dumps(response)
        }
    
    except mysql.connector.Error as err:
        # Handle database-related errors
        return {
            'statusCode': 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            'body': json.dumps({'error': str(err)})  # Fixed variable name from 'e' to 'err'
        }
