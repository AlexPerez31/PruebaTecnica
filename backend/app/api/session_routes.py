from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Session as SessionModel, Event
from app.db.schemas import SessionCreate, SessionResponse
from app.auth.auth import require_role

router = APIRouter(prefix="/events", tags=["Sessions"])

@router.get("/{event_id}/sessions", response_model=list[SessionResponse])
def get_sessions(event_id: int, db: Session = Depends(get_db)):
    sessions = db.query(SessionModel).filter(SessionModel.event_id == event_id).all()
    if not sessions:
        raise HTTPException(status_code=404, detail="No hay sesiones para este evento")
    return sessions

@router.post("/{event_id}/sessions", response_model=SessionResponse)
def create_session(event_id: int, session: SessionCreate, db: Session = Depends(get_db), user=Depends(require_role(["admin", "organizer"]))):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    new_session = SessionModel(event_id=event_id, **session.dict())
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session

@router.put("/{event_id}/sessions/{session_id}", response_model=SessionResponse)
def update_session(event_id: int, session_id: int, session_data: SessionCreate, db: Session = Depends(get_db), user=Depends(require_role(["admin", "organizer"]))):
    session = db.query(SessionModel).filter(SessionModel.id == session_id, SessionModel.event_id == event_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Sesión no encontrada")

    for key, value in session_data.dict().items():
        setattr(session, key, value)

    db.commit()
    db.refresh(session)
    return session

@router.delete("/{event_id}/sessions/{session_id}")
def delete_session(event_id: int, session_id: int, db: Session = Depends(get_db), user=Depends(require_role(["admin", "organizer"]))):
    session = db.query(SessionModel).filter(SessionModel.id == session_id, SessionModel.event_id == event_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Sesión no encontrada")

    db.delete(session)
    db.commit()
    return {"message": "Sesión eliminada"}
