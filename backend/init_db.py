from models import Base, engine, SessionLocal, Location

def init_db():
    db = SessionLocal()
    Base.metadata.create_all(bind=engine)

    # Sample locations
    sample_locations = [
        Location(name="New York", description="The Big Apple", lat=40.7128, lon=-74.0060),
        Location(name="Los Angeles", description="City of Angels", lat=34.0522, lon=-118.2437),
        Location(name="Chicago", description="The Windy City", lat=41.8781, lon=-87.6298)
    ]

    db.add_all(sample_locations)
    db.commit()
    db.close()

if __name__ == "__main__":
    init_db()
