import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.user_routes import router as user_router
from app.api.event_routes import router as event_router
from app.api.session_routes import router as session_router
from app.api.registration_routes import registration_user_router
from app.api.admin_routes import router as admin_router
from app.api.get_current_user import router as get_current_user

app = FastAPI(
    title="Prueba Gestion Eventos",
    description="Prueba técnica, API para gestionar eventos, sesiones y usuarios con autenticación y roles específicos",
    contact={
        "name": "Alex Perez",
        "email": "alexjordanperez31@gmail.com",
    }
)

origins = [
    "http://localhost:4200",
    "http://localhost:8080"
]

#origins = [
#    settings.FRONTEND_PORT,
#    settings.FRONTEND_PORT_DOCKER
#]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(get_current_user)
app.include_router(event_router)
app.include_router(session_router)
app.include_router(registration_user_router)
app.include_router(admin_router)


@app.get("/")
def read_root():
    return {"message": "Bienvenido"}

if __name__ == "__main__":
    uvicorn.run(
        app,
        host=os.getenv("APP_HOST", "0.0.0.0"), 
        port=int(os.getenv("APP_PORT", "8000")),
        reload=True
    )