from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Event, EventRegistration, User
from app.db.schemas import EventCreate, EventResponse, EventRegistrationResponse
from app.auth.auth import get_current_user, require_role

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("/", response_model=list[EventResponse])
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).all()

@router.get("/search")
def search_events(query: str, db: Session = Depends(get_db)):
    events = db.query(Event).filter(Event.name.ilike(f"%{query}%")).all()
    return {"results": events}

@router.get("/{event_id}", response_model=EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return event

@router.post("/", response_model=EventResponse)
def create_event(event: EventCreate, db: Session = Depends(get_db), user=Depends(require_role(["admin", "organizer"]))):
    new_event = Event(**event.dict())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@router.put("/{event_id}", response_model=EventResponse)
def update_event(event_id: int, event_data: EventCreate, db: Session = Depends(get_db), user=Depends(require_role(["admin", "organizer"]))):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    for key, value in event_data.dict().items():
        setattr(event, key, value)

    db.commit()
    db.refresh(event)
    return event

@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db), user=Depends(require_role(["admin", "organizer"]))):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    db.delete(event)
    db.commit()
    return {"message": "Evento eliminado"}


@router.post("/{event_id}/register", response_model=EventRegistrationResponse)
def register_for_event(event_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    existing_registration = db.query(EventRegistration).filter(
        EventRegistration.event_id == event_id,
        EventRegistration.user_id == user.id
    ).first()
    if existing_registration:
        raise HTTPException(status_code=400, detail="Ya estás registrado en este evento")

    registered_count = db.query(EventRegistration).filter(EventRegistration.event_id == event_id).count()
    if registered_count >= event.capacity:
        raise HTTPException(status_code=400, detail="El evento está lleno")

    new_registration = EventRegistration(event_id=event_id, user_id=user.id)
    db.add(new_registration)
    db.commit()
    db.refresh(new_registration)
    return new_registration