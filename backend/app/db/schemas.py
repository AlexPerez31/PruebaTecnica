from pydantic import EmailStr, SecretStr, BaseModel
from datetime import datetime

# Para usuarios
class UserCreate(BaseModel):
    email: EmailStr
    password: SecretStr
    name: str
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: SecretStr

class UserOut(BaseModel):
    id: int
    email: str
    name: str
    role: str

    class Config:
        orm_mode = True


# Para eventos
class EventBase(BaseModel):
    name: str
    description: str
    capacity: int
    status: str = "pending" 
    date: datetime

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int

    class Config:
        from_attributes = True


# Para sesiones
class SessionBase(BaseModel):
    title: str
    speaker: str
    start_time: datetime
    end_time: datetime

class SessionCreate(SessionBase):
    pass

class SessionResponse(SessionBase):
    id: int
    event_id: int

    class Config:
        from_attributes = True


# Registrarse a eventos
class EventRegistrationResponse(BaseModel):
    id: int
    user_id: int
    event_id: int

    class Config:
        from_attributes = True


# Gestion de usuarios
class AdminUserCreate(BaseModel):
    name: str
    role: str
    email: EmailStr
    password: SecretStr 

class AdminUserUpdate(BaseModel):
    name: str
    role: str
    email: EmailStr
    password: SecretStr

class AdminUserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True