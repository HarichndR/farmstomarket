# FarmstoMarket — Backend

 high lvele backend for an e‑Farm marketplace connecting farmers, nurseries, carriers and equipment owners with buyers and service requesters.

This repository contains the server-side implementation: REST routes, controllers, services, Kafka/Redis integrations, Firebase notifications and authentication scaffolding.

---

**Highlights**
- Modular architecture separating `controller`, `services`, `schema`, `Route`, and `middlewares` for clear ownership.
- Event-driven booking pipeline using Kafka producers/consumers for resilient notifications and DB write events.
- Centralized logging with `winston` and standardized API responses via `utils/response.js`.
- Push notifications via Firebase (FCM) and in‑app notifications stored in MongoDB.

---

**Quick links**
- Entry point: [index.js](index.js)
- Central logger: [utils/logger.js](utils/logger.js)
- Standard API responses: [utils/response.js](utils/response.js)
- Booking controller: [controller/booking.controller.js](controller/booking.controller.js)

---

## Architecture Overview

- HTTP API (Express): organised into route modules under `Route/api/*`.
- Controllers: request validation, authentication checks and orchestration live in `controller/`.
- Services: business logic and integrations (Kafka producers/consumers, Redis cache, Firebase) live in `services/`.
- Schemas: Mongoose schemas in `schema/` define the data model.
- Middlewares: authentication, logging and error handling in `midlewares/` (adapters exist under `middlewares/` for corrected naming).

Flow example — booking an equipment:
1. Client posts booking request to `/booking/requistBooking/FarmingEquipment`.
2. Controller validates and builds request object and calls booking service.
3. Service publishes Kafka event (`Booking-Requiest`) and returns status.
4. Kafka consumer sends notifications via FCM and/or in‑app storage, and emits DB‑save events.

**Architecture Diagram**

```mermaid
flowchart LR
  A[Client] -->|HTTP| B[API Gateway - Express]
  B --> C[Controllers]
  C --> D[Services]
  D --> E[MongoDB]
  D --> F[Redis]
  D --> G[Kafka Producers]
  G --> H[Kafka Brokers]
  H --> I[Kafka Consumers]
  I --> J[Notification Service]
  J --> M[Firebase FCM]
  I --> E
  D --> K[External APIs - Twilio/LocationIQ/GSTIN]
  B --> L[Middlewares]
  F --> N[FCM Token Cache]
```

- **Client → API Gateway:** Mobile/web clients call Express routes under `Route/api/*`.
- **Controllers:** Validate/authorize and forward requests to `services/`.
- **Services:** Handle business logic, DB access, caching, and produce Kafka events.
- **Kafka:** Decouples async workflows — consumers handle notifications, retries, and DB-side effects.
- **Notifications:** Consumers push to Firebase (FCM) and persist in‑app notifications in MongoDB.
- **Redis:** Caches FCM tokens and other ephemeral state to speed lookups.

---

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Kafka (kafkajs) for event-driven processing
- Redis for caching (FCM tokens) and quick lookups
- Firebase Admin for push notifications (FCM)
- Winston for structured logging

---

## Getting Started (developer)

Prerequisites:
- Node.js >= 16
- MongoDB instance (connection string)
- Kafka cluster (or local dev alternative)
- Redis instance
- Firebase service account credentials (for FCM)

1. Install dependencies:

```bash
npm install
```

2. Environment variables (create a `.env` file)

Required env vars (examples):

- `PORT=3000`
- `MONGDB_Conection_String=mongodb://user:pass@host:port/db`
- `KAFKA_BROKER=broker:9092`
- `REDIS_URL=redis://localhost:6379`
- `firebaseserviceAC=<firebase-service-account-json-or-path>`
- `LOG_LEVEL=info`

3. Run locally:

```bash
npm run dev
```

---

## Important Files & Folders

- `index.js` — app bootstrap, middleware ordering, route mounting.
- `Route/api/` — HTTP routes grouped by domain (users, products, booking, carriers, equipments).
- `controller/` — request handlers and orchestration.
- `services/` — business logic, Kafka producers/consumers, notification senders, helpers.
- `schema/` — Mongoose models.
- `midlewares/` & `middlewares/` — authentication and logging (note: adapters exist to avoid breaking imports while filenames are being normalized).
- `utils/logger.js` — central Winston logger writing to console and `logs/` files.
- `utils/response.js` — standard API response helpers (adds `res.apiSuccess` and `res.apiError`).

---

## API Overview (selected endpoints)

- `POST /User/Register` — create user (various roles supported).
- `GET /User/profile` — get current user profile (auth required).
- `POST /Farm-Product/add-farm-product` — add farm product (Farmer role).
- `POST /booking/requistBooking/FarmingEquipment` — request booking for equipment.
- `POST /booking/requistBooking/Carriers` — request booking for carrier.
- `POST /pushNotifiction/sendPushNotifiction` — send FCM notification (auth).

All controllers are being migrated to use standardized responses via `res.apiSuccess(...)` and `res.apiError(...)` from [utils/response.js](utils/response.js). Responses follow the shape:

```json
{
  "success": true|false,
  "message": "string",
  "data": { ... } | null,
  "meta": { ... } | {}
}
```

---

## Logging & Monitoring

- Structured logs are produced by `winston` in `utils/logger.js` to `logs/combined.log` and `logs/error.log` and the console. Adjust `LOG_LEVEL` via environment.
- Add your preferred log collector (ELK, Datadog, Papertrail) in production for centralized monitoring and alerting.

---

## Notifications

- Firebase Cloud Messaging is used for push notifications. The service account is read from `firebaseserviceAC` env var and initialized in `notification/config/firebase.config.js` (adapter to `notifiction/config/*` exists to preserve prior layout).
- In‑app notifications are persisted in MongoDB and can be retried via Kafka consumer flows.

---

## Contributing & Code Quality

- Run `npm install` then `npm run dev` for local development.
- Recommended next steps for maintainability and production quality:
  - Normalize folder/file names (some adapters exist already to preserve imports).
  - Replace remaining `console.log` with `logger` calls.
  - Add input validation (express-validator or Joi) on all public routes.
  - Add unit and integration tests (Jest/Mocha + Supertest) and a CI pipeline.
  - Add linting (ESLint) and format (Prettier) rules.

---

## Roadmap (suggested high‑impact items)

1. Complete renaming cleanup and remove compatibility adapters.
2. Add validation middleware and consistent status code handling.
3. Add test suite with coverage thresholds.
4. Add production deployment recipe (Dockerfile, k8s manifests or Docker Compose + CI).
5. Configure log rotation and metrics (Prometheus + Grafana).

---

## Security Notes

- Validate and sanitize all inputs before persisting or producing to Kafka.
- Rotate and secure Firebase credentials and Kafka credentials.
- Limit CORS origins and add rate limiting for public endpoints.

---

If you'd like, I can:
- finish the folder/filename normalization (rename & update imports),
- replace remaining `console.log` uses with `logger`, or
- convert a representative controller (e.g., booking) to use `res.apiSuccess`/`res.apiError` and validators.

Tell me which of the above to prioritize and I'll continue.
# farmstomarket — Backend for E‑Farm Market

Professional backend service for an e‑commerce marketplace connecting farmers, nurseries, carriers, and equipment renters. This repository contains the Node.js/Express backend powering product listings, bookings, carrier management, notifications, and async workflows using Kafka and Redis.

## Highlights

- Modular Express routes for Users, Products, Carriers, Equipment and Bookings
- Event-driven components using Kafka for decoupled async processing
- Redis used for caching and runtime state (rate-limiting, FCM caching, etc.)
- Firebase Admin integration for push notifications
- Twilio for SMS OTPs and verification flows
- MongoDB (via Mongoose) as primary persistence
- Container-ready with a Dockerfile

## Tech stack

- Node.js + Express
- MongoDB (Mongoose)
- Apache Kafka (kafkajs)
- Redis (node-redis)
- Firebase Admin (push notifications)
- Twilio (SMS/OTP)
- Bull (background jobs)

## Quick start — development

Prerequisites:
- Node.js 16+
- MongoDB instance/URI
- Redis server
- Kafka cluster (or a local dev broker)
- Environment variables (see below)

Clone and run locally:

```bash
git clone <repo-url>
cd farmstomarket
npm install
npm run dev    # uses nodemon
```

By default the app will read configuration from environment variables (see next section). The server is started with `node index.js` (or `npm run dev` for nodemon).

## Environment variables

Create a `.env` in the project root (do not commit secrets). The repository references several env vars; common ones found in code:

- `PORT` — HTTP port the app listens on
- `MONGDB_Conection_String` — MongoDB connection URI
- `REDISURL` — Redis connection URL (e.g. `redis://localhost:6379`)
- `JWT_Secret` — Secret for signing/verifying JWTs
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` — Twilio credentials for SMS
- `LOCATIONIQ_API_KEY` — (optional) Location/Geocoding API key
- `zeroBounceAPI` — (optional) email validation API key
- `firebaseserviceAC` — Firebase service account (object or path) used by firebase-admin

Note: Kafka is currently configured in `kafka/config/kafka.config.js`. Update the `brokers` array to point to your Kafka broker endpoints (the example uses `broker1:9092`).

## Docker

The included `Dockerfile` builds a Node container and runs `npm start`. Typical usage:

```bash
docker build -t farmstomarket:latest .
docker run -e MONGDB_Conection_String="<mongo-uri>" -e REDISURL="<redis-uri>" -p 3000:3000 farmstomarket:latest
```

For production, wire Kafka, Redis and MongoDB as external services (Docker Compose or managed services).

## Project layout (high level)

- `index.js` — App entry: loads routes, middleware and DB connection
- `controller/` — Route handlers for resources (users, bookings, products, equipment, carriers, orders)
- `Route/api/` — Express route definitions organized by resource
- `schema/` — Mongoose schemas/models
- `kafka/` — Kafka producers, consumers and config
- `Redis/` — Redis client and cache helpers
- `notification/` and `notifiction/` — Firebase/Twilio notification code (note: duplicate folders — see cleanup note)
- `midlewares/` — Logging, error handling, auth checks
- `services/` — Reusable service helpers (JWT, OTP, validation, external API integrations)

## Important notes & TODOs

- Kafka config currently uses a hardcoded `brokers` entry. Replace with environment-based configuration for flexibility.
- Add a `.env.example` to document required environment variables without leaking secrets.


## Troubleshooting

- Unable to connect to MongoDB: verify `MONGDB_Conection_String` and that network access/firewalls allow the connection.
- Redis connection errors: confirm `REDISURL` and that the Redis server is reachable.
- Kafka errors: ensure brokers list points to running Kafka brokers and that topics used by producers/consumers exist (or allow auto-create where appropriate).

## Contributing

1. Fork the repo and create a feature branch
2. Open a PR with a clear description and relevant tests or run instructions

## License & Contact
Email:harichndrsolunke4@gmail.com
Mobile:9307541477
Maintainer: Harichndr salunkhe 

