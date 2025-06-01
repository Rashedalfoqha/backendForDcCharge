# backendForDcCharge

A Node.js/Express backend API for managing electric vehicle (EV) charger services, products, brands, user authentication, news posts, and more. This backend is designed to serve as the foundation for a DC/AC charging solutions web platform.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

This backend provides a RESTful API for a charging solutions platform, supporting user authentication, service/product/news management, role-based access control, and file uploads (for images). The API is intended to support a frontend client for customers and administrators in the EV charging domain.

---

## Features

- User registration and login with JWT authentication
- Role and permissions management
- CRUD operations for:
  - EV chargers/products
  - Services and brands
  - News posts and updates
- Image upload and serving (with multer)
- Route-level authorization middleware
- MongoDB integration (via Mongoose)
- Security best practices (Helmet, rate limiting, mongo-sanitize, CORS)
- Multi-language support for content (e.g., English & Arabic)
- Error handling and 404 routes

---

## API Endpoints

- `/api/post` — Manage news posts (create, read, update, delete)
- `/api/services` — Manage services and products
- `/api/page-content` — Page content management for frontend pages
- `/role` — Roles and permissions management
- `/brands` — Brands management (multi-language support)
- `/customers` — Customer management
- `/user` — User registration and login

> Other endpoints may exist for additional features. See the `routes/` directory for details.

---

## Installation

### Prerequisites

- Node.js (version 14 or above)
- MongoDB database

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rashedalfoqha/backendForDcCharge.git
   cd backendForDcCharge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   DB_URL=mongodb://localhost:27017/your-db-name
   SECRET=your_jwt_secret
   ```

4. **Run the server:**
   ```bash
   npm start
   ```

   The server will run at `http://localhost:5000` (or your configured port).

---

## Usage

- Use an API client (like Postman) or connect your frontend to the endpoints listed above.
- Uploaded images are served from the `/uploads` route.
- Authentication is required for protected routes (provide JWT in `Authorization` header).

---

## Project Structure

```
/
├── controller/         # Controllers for routes (business logic)
├── middleware/         # Authentication, authorization, upload middleware
├── models/             # Mongoose models/schemas
├── routes/             # Express route definitions
├── uploads/            # Uploaded images (created at runtime)
├── index.js            # Main server entry point
└── ...
```

---

## Environment Variables

- `PORT` — Server port (default: 5000)
- `DB_URL` — MongoDB connection string
- `SECRET` — JWT secret for authentication

---

## Contributing

Pull requests and suggestions are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## Contact

- Maintainer: [@Rashedalfoqha](https://github.com/Rashedalfoqha)
- For issues, use the [GitHub Issues](https://github.com/Rashedalfoqha/backendForDcCharge/issues) page.

---

*This README was generated with repository code context. Please update as your project evolves.*
