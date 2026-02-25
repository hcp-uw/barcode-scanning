from pydantic import BaseModel
from typing import List

class UserProfileResponse(BaseModel):
    email: str
    allergens: List[str]
