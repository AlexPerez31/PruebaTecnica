from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User
from app.db.schemas import AdminUserCreate, AdminUserUpdate, AdminUserResponse
from app.auth.auth import require_role
from app.utils.helpers import get_password_hash

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/users", response_model=list[AdminUserResponse])
def get_users(db: Session = Depends(get_db), user=Depends(require_role(["admin"]))):
    return db.query(User).filter(User.role.in_(["organizer", "attendee"])).all()

@router.post("/users", response_model=AdminUserResponse)
def create_user(user_data: AdminUserCreate, db: Session = Depends(get_db), user=Depends(require_role(["admin"]))):
    hashed_password = get_password_hash(user_data.password.get_secret_value())
    new_user = User(email=user_data.email, hashed_password=hashed_password, role=user_data.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.put("/users/{user_id}", response_model=AdminUserResponse)
def update_user(user_id: int, user_data: AdminUserUpdate, db: Session = Depends(get_db), user=Depends(require_role(["admin"]))):
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    existing_user.email = user_data.email
    existing_user.role = user_data.role
    db.commit()
    db.refresh(existing_user)
    return existing_user

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), user=Depends(require_role(["admin"]))):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(user)
    db.commit()
    return {"message": "Usuario eliminado"}
