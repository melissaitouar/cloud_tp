# cloud_tp

API REST Node.js + PostgreSQL, conteneurisée avec Docker Compose.

## Stack

- Node.js / Express
- PostgreSQL 16
- Docker Compose

## Structure

```
api/
├── src/
│   ├── index.js
│   ├── db.js
│   └── routes/
│       └── notes.js
├── package.json
└── Dockerfile
```

## Lancer le projet

```bash
cp .env.example .env
docker compose up --build
```

## Routes

| Méthode | Route       |
|---------|-------------|
| GET     | /health     |
| GET     | /notes      |
| POST    | /notes      |
| GET     | /notes/:id  |
| DELETE  | /notes/:id  |

## Quelques choix

Le `COPY` en deux temps dans le Dockerfile garde `npm install` en cache — un changement de code ne réinstalle pas les dépendances.

Les credentials passent par `.env` (voir `.env.example`). L'image reste identique entre les environnements, seule la config change.

L'API se connecte à `db` — le nom du service dans le réseau Compose — et non à `localhost`.

Les données PostgreSQL sont montées dans un volume `db_data` et survivent à un `docker compose down`. Un `docker compose down -v` les supprime.

## Commandes utiles

```bash
docker compose logs -f api
docker compose exec db psql -U user -d appdb
docker compose down
docker compose down -v
```
