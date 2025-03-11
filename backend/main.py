from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample location data
locations = [
    {"id": 1, "name": "Location A", "lat": 40.7128, "lon": -74.0060, "description": "New York City"},
    {"id": 2, "name": "Location B", "lat": 34.0522, "lon": -118.2437, "description": "Los Angeles"},
    {"id": 3, "name": "Location C", "lat": 51.5074, "lon": -0.1278, "description": "London"},
]

@app.get("/locations")
async def get_locations():
    return locations
