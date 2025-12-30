import requests
from dotenv import load_dotenv
import os
import math

load_dotenv()

GEOCODING_API = os.getenv("GEOCODING_API")
def address_to_coords(gym):
    # ideally cached
    address = f"{gym['street']}, {gym['city']}, {gym['state']} {gym['zip']}"

    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": GEOCODING_API
    }

    resp = requests.get(url, params, timeout=5)
    data = resp.json()
    resp.raise_for_status()
    if data["status"] != "OK" or not data["results"]:
        raise ValueError("Invalid address or geocoding failed")

    location = data["results"][0]["geometry"]["location"]

    return location["lat"], location["lng"]

def zip_to_coords(zip):
    # ideally cached
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": zip,
        "key": GEOCODING_API
    }

    resp = requests.get(url, params, timeout=5)
    data = resp.json()
    resp.raise_for_status()
    if data["status"] != "OK" or not data["results"]:
        raise ValueError("Invalid address or geocoding failed")

    location = data["results"][0]["geometry"]["location"]

    return location["lat"], location["lng"]


def haversine(lat1, lon1, lat2, lon2):
    R = 3958.8  # miles
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat/2)**2 +
        math.cos(math.radians(lat1)) *
        math.cos(math.radians(lat2)) *
        math.sin(dlon/2)**2
    )
    return 2 * R * math.asin(math.sqrt(a))