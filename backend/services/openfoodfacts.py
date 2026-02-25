import httpx
from fastapi import HTTPException

OPENFOODFACTS_URL = "https://world.openfoodfacts.org/api/v0/product"

async def fetch_product(barcode: str) -> dict:
    """Fetch product from OpenFoodFacts API"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{OPENFOODFACTS_URL}/{barcode}.json")
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error contacting OpenFoodFacts")
    
    data = response.json()
    
    # Check if product exists
    if data.get("status") != 1:
        raise HTTPException(status_code=404, detail="Product not found in OpenFoodFacts")
    
    product = data.get("product", {})
    
    # Extract ingredients list
    ingredients_list = []
    ingredients_data = product.get("ingredients", [])
    for ing in ingredients_data:
        if "text" in ing:
            ingredients_list.append(ing["text"].lower())
    
    # Fallback: parse ingredients_text if structured data missing
    if not ingredients_list and product.get("ingredients_text"):
        ingredients_list = [
            i.strip().lower() 
            for i in product["ingredients_text"].split(",")
        ]
    
    return {
        "ingredients": ingredients_list,
        "product_name": product.get("product_name", "Unknown"),
        "brand": product.get("brands", None)
    }