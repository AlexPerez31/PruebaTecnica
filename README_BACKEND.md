# Backend - FastAPI

Este es el backend del proyecto, desarrollado con FastAPI y administrado con Poetry.

## Requisitos

- Github
- Python 3.12
- Poetry
- Docker 


## Instalación y Configuración Local

1. Clona el repositorio:

En bash:

   git clone https://github.com/AlexPerez31/PruebaTecnica.git
   cd backend
   

2. Instala las dependencias con Poetry:

 En bash:

   poetry install
   

3. Activa el entorno virtual:

En bash:
   poetry shell
   

##################### EJECUTAR EN SERVIDOR DE DESARROLLO ##################


1. Ejecuta el servidor de desarrollo:

En bash:

   uvicorn app.main:app --reload
   

El servidor estará disponible en `http://127.0.0.1:8000`.




##################### EJECUTAR CON DOCKER ##################

1. Construye la imagen Docker:

En bash:
   docker build -t fastapi-app .
   

2. Restore backup de la base de datos:

En bash:
   Get-Content backup.sql | docker exec -i postgres_db psql -U postgres -d prueba_db
   


######################## URL DE DOCUMENTACION

📌 Swagger UI 👉 http://127.0.0.1:8000/docs
📌 Redoc UI 👉 http://127.0.0.1:8000/redoc
