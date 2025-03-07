import pytest
import httpx
from httpx import AsyncClient, ASGITransport
from app.main import app
from fastapi.testclient import TestClient

@pytest.fixture(scope="module")
def event_loop():
    import asyncio
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()

client = TestClient(app)

# Prueba para el main
def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Bienvenido"}

# Aca realice pruebas para registrar y logear ususarios, que al final se borran de la bd
@pytest.fixture(scope="module")
async def async_client():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as client:
        yield client

@pytest.fixture(scope="module")
async def organizer_auth(async_client):
    await async_client.post("/users/register", json={
        "email": "test1@example.com",
        "password": "securepassword",
        "role": "organizer"
    })
    
    login_response = await async_client.post("/users/login", json={
        "email": "test1@example.com",
        "password": "securepassword"
    })

    token = login_response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

@pytest.fixture(scope="module")
async def attendee_auth(async_client):
    await async_client.post("/users/register", json={
        "email": "test2@example.com",
        "password": "securepassword",
        "role": "attendee"
    })

    login_response = await async_client.post("/users/login", json={
        "email": "test2@example.com",
        "password": "securepassword"
    })

    token = login_response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

# Aca realice pruebas para registrar eventos
@pytest.fixture(scope="module")
async def test_events(async_client, organizer_auth):
    events = []
    event_data = [
        {
            "name": "Evento 2",
            "description": "Descripción del evento 2",
            "capacity": 50,
            "status": "active",
            "date": "2025-06-01T10:00:00"
        },
        {
            "name": "Evento 3",
            "description": "Descripción del evento 3",
            "capacity": 70,
            "status": "active",
            "date": "2025-07-01T10:00:00"
        }
    ]
    
    for data in event_data:
        response = await async_client.post(
            "/events/",
            json=data,
            headers=organizer_auth
        )
        events.append(response.json())
    
    yield events
    
    # Limpiarlos de la BD
    for event in events:
        await async_client.delete(
            f"/events/{event['id']}",
            headers=organizer_auth
        )