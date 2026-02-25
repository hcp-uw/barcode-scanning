from fastapi import APIRouter, HTTPException, Depends
from services.allergen import get_derivatives, analyze_ingredients
from services.openfoodfacts import fetch_product
from services.user import get_user_profile
from schemas.allergen import (
    AllergenDerivativesRequest,
    AllergenDerivativesResponse,
    AllergenAnalysisResponse
)
from firebase.firebase import get_current_firebase_uid

router = APIRouter(tags=["Allergen"])

@router.post("/allergen-derivatives", response_model=AllergenDerivativesResponse)
def get_allergen_derivatives(request: AllergenDerivativesRequest):
    """Get derivative ingredients for given allergens."""
    if not request.allergens:
        raise HTTPException(status_code=400, detail="Invalid request: missing allergens")
    
    derivatives = get_derivatives(request.allergens)
    return {"derivatives": derivatives}

@router.get("/allergens/{uid}/{barcode}", response_model=AllergenAnalysisResponse)
async def analyze_product_allergens(barcode: str, uid: str = Depends(get_current_firebase_uid)):
    """
    Analyze a product for allergens based on user's allergen profile.
    Returns matching allergens and their derivatives found in the product.
    """
    if not barcode or not barcode.strip():
        raise HTTPException(status_code=400, detail="Invalid or missing barcode")
    
    # Get user's allergens
    user_allergens = get_user_profile(uid)["allergens"]
    
    if not user_allergens:
        return {"allergens": {}}
    
    # Get product ingredients
    product = await fetch_product(barcode)
    ingredients = product["ingredients"]
    
    # Analyze for allergens
    found_allergens = analyze_ingredients(user_allergens, ingredients)
    return {"allergens": found_allergens}