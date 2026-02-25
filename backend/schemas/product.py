from pydantic import BaseModel
from typing import List, Optional

class ProductResponse(BaseModel):
    ingredients: List[str]
    product_name: str
    brand: Optional[str] = None