# Backend Service

A Node.js backend service with Express and SQLite for data storage.

## Features

- Node.js + Express framework
- SQLite database for data storage
- RESTful API endpoints
- CORS support
- Error handling

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/data` | Save data with { key, value } |
| GET | `/api/data/:key` | Read data by key |
| GET | `/api/data` | Get all data |
| DELETE | `/api/data/:key` | Delete data by key |

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

### Development Mode (with nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on port 3001 by default.

## Database

- The database file `data.db` will be created automatically
- Data is stored in a `data` table with the following structure:
  - `key` (TEXT, PRIMARY KEY)
  - `value` (TEXT, NOT NULL)
  - `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
  - `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

## Example Usage

### Save Data
```bash
curl -X POST http://localhost:3001/api/data \
  -H "Content-Type: application/json" \
  -d '{"key": "test", "value": "Hello World"}'
```

### Read Data
```bash
curl http://localhost:3001/api/data/test
```

### Get All Data
```bash
curl http://localhost:3001/api/data
```

### Delete Data
```bash
curl -X DELETE http://localhost:3001/api/data/test
```