#!/usr/bin/env python3
import os
import json
from pymongo import MongoClient
from dotenv import load_dotenv

# Load from .env only if running locally
load_dotenv()

# Get Mongo URI from environment variable
mongo_uri = os.getenv("MONGODB_URI")

if not mongo_uri:
    raise ValueError("❌ MONGODB_URI environment variable not set!")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client.get_default_database()

# Backup all collections
backup_data = {}
for name in db.list_collection_names():
    backup_data[name] = list(db[name].find({}, {"_id": 0}))  # omit _id (ObjectId not JSON-serializable)

# Write to backup file
with open("backup.json", "w") as f:
    json.dump(backup_data, f, indent=2)

print("✅ Backup saved as backup.json")
