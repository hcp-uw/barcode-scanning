from fastapi import HTTPException
from typing import List, Dict

# Allergen → derivatives mapping (store in Firestore for production)
ALLERGEN_DERIVATIVES = {
    "milk": ["milk", "casein", "whey", "lactose", "cream", "butter", "cheese", "ghee"],
    "peanut": ["peanut", "peanut oil", "groundnut", "arachis oil"],
    "soy": ["soy", "soya", "soybean", "soy lecithin", "tofu", "edamame"],
    "wheat": ["wheat", "flour", "gluten", "semolina", "durum", "spelt"],
    "egg": ["egg", "albumin", "globulin", "lysozyme", "mayonnaise"],
    "tree nuts": ["almond", "cashew", "walnut", "pecan", "pistachio", "hazelnut", "macadamia"],
    "fish": ["fish", "cod", "salmon", "anchovy", "sardine"],
    "shellfish": ["shrimp", "crab", "lobster", "prawn", "crayfish", "scallop"],
}

def get_derivatives(allergens: List[str]) -> Dict[str, List[str]]:
    """Get derivative ingredients for given allergens"""
    result = {}
    for allergen in allergens:
        allergen_lower = allergen.lower()
        if allergen_lower in ALLERGEN_DERIVATIVES:
            result[allergen_lower] = ALLERGEN_DERIVATIVES[allergen_lower]
        else:
            # Unknown allergen - return itself as only derivative
            result[allergen_lower] = [allergen_lower]
    
    if not result:
        raise HTTPException(status_code=404, detail="No allergens found in mapping")
    
    return result

def analyze_ingredients(user_allergens: List[str], ingredients: List[str]) -> Dict[str, List[str]]:
    """Find which allergens appear in ingredient list"""
    # Get all derivatives for user's allergens
    derivatives = get_derivatives(user_allergens)
    
    found_allergens = {}
    
    for allergen, derivative_list in derivatives.items():
        matched = []
        for derivative in derivative_list:
            # Check if derivative appears in any ingredient
            for ingredient in ingredients:
                if derivative in ingredient.lower():
                    matched.append(derivative)
                    break
        
        if matched:
            found_allergens[allergen] = matched
    
    return found_allergens