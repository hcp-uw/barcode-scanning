from fastapi import APIRouter, HTTPException, Depends
from services.user import get_user_profile, update_user_allergens
from schemas.user import UserProfileResponse
from firebase.firebase import get_current_firebase_uid
from typing import List

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/profile/{firebase_uid}", response_model=UserProfileResponse)
def get_profile(uid: str = Depends(get_current_firebase_uid)):
    """Fetch user profile including email and allergens."""
    return get_user_profile(uid)

@router.post("/update-allergens", status_code=200)
def update_allergens(allergens: List[str], uid: str = Depends(get_current_firebase_uid)):
    """Update user's allergens in the database."""
    update_user_allergens(uid, allergens)
    return {"status": "success"}