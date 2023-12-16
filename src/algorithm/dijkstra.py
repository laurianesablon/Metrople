import json
import numpy as np

# Load the JSON data from the file
with open('../data/metroStations.json', 'r') as file:
    metro_data = json.load(file)

# Create a dictionary with stop names as keys and properties as values
stations = {feature['properties']['stop_name']: feature 
            for feature in metro_data['features']}

print(stations)