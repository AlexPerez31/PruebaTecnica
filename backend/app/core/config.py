import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

class Settings(BaseModel):
    # Generales
    ALLOWED_HOSTS: list[str] = os.getenv("ALLOWED_HOSTS", "").split(",")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    DEBUG: bool = os.getenv("DEBUG", "False") == "True"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 10))
    ALGORITHM: str = "HS256"

    # Configuración de la base de datos
    POSTGRES_USER: str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB")
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT")
    DATABASE_URL: str = os.getenv("DATABASE_URL")

    # Frontend

    FRONTEND_PORT: str = os.getenv("FRONTEND_PORT")
    FRONTEND_PORT_DOCKER: str = os.getenv("FRONTEND_PORT_DOCKER")

settings = Settings()
