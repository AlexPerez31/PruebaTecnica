FROM python:3.12

ENV PYTHONUNBUFFERED=1 \
    POETRY_VIRTUALENVS_CREATE=false \
    PYTHONPATH=/backend

WORKDIR /backend
COPY . .

RUN pip install --no-cache-dir poetry
RUN poetry install --no-root --no-interaction

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]