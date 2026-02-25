from fastapi import APIRouter, HTTPException
from services.user import get_user_profile, update_user_allergens
from schemas.user import UserProfileResponse, UpdateAllergensRequest

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/profile/{firebase_uid}", response_model=UserProfileResponse)
def get_profile(firebase_uid: str):
    """Fetch user profile including email and allergens."""
    if not firebase_uid or not firebase_uid.strip():
        raise HTTPException(status_code=400, detail="Invalid or missing uid")
    
    return get_user_profile(firebase_uid)

@router.post("/update-allergens", status_code=200)
def update_allergens(request: UpdateAllergensRequest):
    """Update user's allergens in the database."""
    if not request.uid or not request.uid.strip():
        raise HTTPException(status_code=400, detail="Invalid request: missing uid")
    
    update_user_allergens(request.uid, request.allergens)
    return {"status": "success"}