from pydantic import BaseModel
from typing import List, Dict

class AllergenDerivativesRequest(BaseModel):
    allergens: List[str]

class AllergenDerivativesResponse(BaseModel):
    derivatives: Dict[str, List[str]]

class AllergenAnalysisResponse(BaseModel):
    allergens: Dict[str, List[str]]
    # risk_level: str = "low"  # Post-MVP