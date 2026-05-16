from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

class PaymentRequest(BaseModel):
    amount: float

@app.post("/process-payment")
def process_payment(request: PaymentRequest):
    approved = random.choices([True, False], weights=[80, 20])[0]
    status = "approved" if approved else "rejected"
    return {"status": status}
@app.get("/")
def read_root():
    return {"message": "Welcome to the Payment Service!"}