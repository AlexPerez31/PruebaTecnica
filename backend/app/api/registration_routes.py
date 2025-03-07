from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import EventRegistration, Event, User
from app.db.schemas import EventResponse
from app.auth.auth import get_current_user

registration_user_router = APIRouter(prefix="/users", tags=["User Registrations"])

@registration_user_router.get("/me/events", response_model=list[EventResponse])
def get_user_events(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    # Consultamos directamente los eventos a través de la relación
    events = db.query(Event).join(EventRegistration).filter(EventRegistration.user_id == user.id).all()
    return events
