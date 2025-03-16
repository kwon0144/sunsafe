import os
import mysql.connector
import json

def lambda_handler(event, context):    
    try:
        # Establish database connection
        conn = mysql.connector.connect(
            host = os.environ["DB_HOST"], 
            user = os.environ["DB_USER"],       
            password = os.environ["DB_PASSWORD"],
            database = os.environ["DB_NAME"]
        )
        
        cursor = conn.cursor()
        query = """SELECT year, COUNT(*) FROM cancer_statistics GROUP BY year ORDER BY year;"""
        
        cursor.execute(query)
        result = cursor.fetchall()
        
        # Extract years and counts into separate lists
        response = {
            'year': [row[0] for row in result],
            'count': [row[1] for row in result]
        }

        # Close the cursor and connection
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
        return {
            'statusCode': 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            'body': json.dumps({'error': str(e)})
        }