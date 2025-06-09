# Scalable Booking Backend System

**Overview**
This project is a scalable backend system for a multi-provider appointment booking platform. It provides RESTful APIs for user registration, authentication, provider availability management, appointment booking, and admin functions. The system is designed with scalability, security, and maintainability in mind.

# Features
**User Authentication:** JWT-based registration and login

**Provider Availability:** Providers can set their available time slots

**Appointment Booking:** Clients can book available slots

**Admin Dashboard:** View all bookings

**Scalable Architecture:** Designed for horizontal scaling

**API Documentation:** Interactive Swagger UI

# Technologies
**Backend:** Node.js, Express

**Database:** MongoDB

**Authentication:** JWT

**API Documentation:** Swagger UI

**Rate Limiting:** Express Rate Limit

# Dependencies

**Backend** - `npm i`

**For Running The App** - `npm run dev`

## Env Variables

**Essential Variables**

```PORT = ```

```MONGODB_URI = ```

```JWT_SECRET = ```


# API Documentation

The system provides interactive API documentation using Swagger UI. After starting the server:

Access Swagger UI at: ```http://localhost:5000/api-docs```

First authenticate by:

Registering a user at ```/api/auth/register```

Logging in at ```/api/auth/login``` to get a JWT token

Click the "Authorize" button and enter your token as: Bearer <your-token>

# Available Endpoints
**Authentication**

```POST /api/auth/register: Register a new user```

```POST /api/auth/login: Login with credentials```

**Providers**

```POST /api/providers/availability: Set availability slots (Provider role required)```

```GET /api/providers/available?providerId=&date=: Get available slots```

**Bookings**

```POST /api/bookings: Create a new booking```

```GET /api/bookings: Get user's bookings```

**Admin**

```GET /api/admin/bookings: Get all bookings (Admin role required)```
