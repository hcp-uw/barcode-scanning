from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import product, user, allergen

app = FastAPI(title="Barcode Scanner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(product.router)
app.include_router(user.router)
app.include_router(allergen.router)

@app.get("/")
def root():
    return {"status": "API is running"}
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
