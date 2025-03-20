import os
import mysql.connector
import json

def lambda_handler(event, context):
    """
    AWS Lambda handler function that retrieves yearly skin cancer mortality data from MySQL database.
    Aggregates total mortality counts per year from the cancer_mortality table.

    Args:
        event: AWS Lambda event object (not used in this function)
        context: AWS Lambda context object (not used in this function)

    Returns:
        dict: Response object with:
            - statusCode (int): HTTP status code (200 for success, 500 for error)
            - headers (dict): CORS headers
            - body (str): JSON string containing:
                - year (list): List of years
                - count (list): List of corresponding mortality counts
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
        
        # Create cursor and execute query to get yearly mortality counts
        cursor = conn.cursor()
        query = """SELECT year, SUM(count) FROM cancer_mortality GROUP BY year ORDER BY year;"""
        
        cursor.execute(query)
        result = cursor.fetchall()
        
        # Transform query results into separate year and count lists
        response = {
            'year': [row[0] for row in result],  # Extract years
            'count': [int(row[1]) for row in result]  # Extract and convert counts to integers
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
