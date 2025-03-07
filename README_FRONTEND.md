# Frontend - Angular 19

Este es el frontend del proyecto, desarrollado con Angular 19.

## Requisitos

- Github
- Node.js (18+)
- Angular CLI
- Docker 

## Instalación y Configuración Local

1. Clona el repositorio:

En bash:
   git clone https://github.com/AlexPerez31/PruebaTecnica.git
   cd frontend


2. Instala las dependencias:

En bash:
   npm install
   

##################### EJECUTAR EN SERVIDOR DE DESARROLLO ##################

En bash:
   ng serve

El frontend estará disponible en `http://localhost:4200`.




##################### EJECUTAR CON DOCKER ###################################

1. Construye la imagen Docker:
En bash:
   docker build -t angular-app .


2. Disponible en http://localhost:8080/


NOTA: La primera vez que se ejecuta, puede demorarse varios minutos y mostrar
un mensaje de bienvenida de NGINX

