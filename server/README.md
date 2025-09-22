# Aidonic JSON Server

This is the mock API server for the Aidonic application, providing a single source of truth for all distribution data used by both web and mobile applications.

## Features

- **Single Source of Truth**: All mock data is centralized in `db.json`
- **RESTful API**: Provides standard REST endpoints for distributions
- **Filtering & Pagination**: Supports region and status filtering with pagination
- **CORS Enabled**: Allows cross-origin requests from web and mobile apps
- **Real-time**: Changes to data are immediately reflected in all applications

## API Endpoints

### Get All Distributions
```
GET /api/distributions
```

**Query Parameters:**
- `region` (string): Filter by region name (partial match)
- `status` (string): Filter by exact status
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Items per page (default: 10)

**Example:**
```
GET /api/distributions?region=West&status=Planned&page=1&limit=5
```

**Response:**
```json
{
  "data": [...],
  "total": 8,
  "page": 1,
  "limit": 5
}
```

### Get Distribution by ID
```
GET /api/distributions/:id
```

**Example:**
```
GET /api/distributions/dst--001
```

**Response:**
```json
{
  "data": {
    "id": "dst--001",
    "region": "West Nile",
    "date": "2025-06-15",
    "status": "Planned",
    "beneficiaries": 1200,
    "aidType": "Food",
    "deliveryChannel": "Vouchers",
    "beneficiaryList": [...]
  }
}
```

## Setup and Running

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Development mode (with auto-restart):**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001` by default.

## Data Structure

The mock data follows the Distribution interface defined in `@aidonic/shared-types`:

```typescript
interface Distribution {
  id: string;
  region: string;
  date: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Cancelled';
  beneficiaries: number;
  aidType: string;
  deliveryChannel: string;
  beneficiaryList: Beneficiary[];
}

interface Beneficiary {
  id: string;
  name: string;
}
```

## Integration

Both web and mobile applications use the shared services from `@aidonic/shared-services` package, which automatically connects to this JSON server. No additional configuration is needed in the applications.

## Development

- **Data Changes**: Edit `db.json` to modify the mock data
- **API Changes**: Modify `server.js` to add new endpoints or modify existing ones
- **Restart**: The server needs to be restarted after changes to `server.js`

## Production Considerations

This is a development mock server. For production, replace with a real API server that implements the same interface.
