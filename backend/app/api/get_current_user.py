from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User
from app.db.schemas import UserOut
from app.auth.auth import get_current_user 

router = APIRouter(prefix="/current-user", tags=["Current-user"])

@router.get("/", response_model=UserOut)
async def read_current_user(
    user: User = Depends(get_current_user)
):
    return user 