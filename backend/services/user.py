from firebase.firebase import db
from fastapi import HTTPException

def get_user_profile(uid: str) -> dict:
    """Fetch user profile from Firestore"""
    doc = db.collection("users").document(uid).get()
    
    if not doc.exists:
        raise HTTPException(status_code=404, detail="User not found")
    
    data = doc.to_dict()
    return {
        "email": data.get("email", ""),
        "allergens": data.get("allergens", [])
    }

def update_user_allergens(uid: str, allergens: list) -> bool:
    """Update user's allergens in Firestore"""
    doc_ref = db.collection("users").document(uid)
    
    # Check user exists
    if not doc_ref.get().exists:
        raise HTTPException(status_code=404, detail="User not found")
    
    doc_ref.update({"allergens": allergens})
    return True