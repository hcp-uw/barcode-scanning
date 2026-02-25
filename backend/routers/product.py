from fastapi import APIRouter, HTTPException
from services.openfoodfacts import fetch_product
from schemas.product import ProductResponse

router = APIRouter(prefix="/product-info", tags=["Product"])

@router.get("/{barcode}", response_model=ProductResponse)
async def get_product_info(barcode: str):
    """
    Fetch product information from OpenFoodFacts API.
    Returns ingredients, product name, and brand.
    """
    if not barcode or not barcode.strip():
        raise HTTPException(status_code=400, detail="Invalid or missing barcode")
    
    # fetch_product handles 404 and 500 errors internally
    product = await fetch_product(barcode)
    return product