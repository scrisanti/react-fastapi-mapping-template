from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import Base, engine, SessionLocal, Location

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000",
    "http://backend:8000"
]


# Database initialization
Base.metadata.create_all(bind=engine)

# Dependency to get a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Sample endpoint to fetch all locations
@app.get("/locations")
async def get_locations(db: Session = Depends(get_db)):
    locations = db.query(Location).all()
    print("DEBUG - Locations Data:", locations)
    return locations # db.query(Location).all()

# Endpoint to add sample data (for testing)
@app.post("/add_location")
def add_location(name: str, description: str, lat: float, lon: float, db: Session = Depends(get_db)):
    new_location = Location(name=name, description=description, lat=lat, lon=lon)
    db.add(new_location)
    db.commit()
    db.refresh(new_location)
    return new_location

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(CORSMiddleware, allow_origins=["*"])
