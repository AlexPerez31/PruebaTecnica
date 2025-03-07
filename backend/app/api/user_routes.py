from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.db.models import User
from app.db.schemas import UserCreate, UserLogin, UserOut
from app.db.database import get_db
from app.utils.helpers import get_password_hash, verify_password
from app.auth.auth import create_access_token
from app.utils.helpers import verify_password

router = APIRouter()

@router.post("/register")
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El email ya esta registrado")

    new_user = User(email=user_data.email, hashed_password=get_password_hash(user_data.password.get_secret_value()), name=user_data.name, role=user_data.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"detail": "El usuario se creo"}


@router.post("/login")
def login_user(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not verify_password(user_data.password.get_secret_value(), user.hashed_password):
        raise HTTPException(status_code=400, detail="Credenciales invalidas")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}