# 🌐 DC Charge - Enterprise Backend Infrastructure

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

A robust, scalable backend solution for managing EV charging networks. This engine powers the DC Charge platform with secure authentication, dynamic content delivery, and automated administrative analytics.

---

## 🚀 Key Features

- **🛡️ Secure Authentication**: JWT-based auth flow with salted Bcrypt password hashing.
- **📊 Analytics Engine**: Real-time aggregation of transaction and user data for the dashboard.
- **📝 Dynamic CMS Core**: Multi-language content delivery for home and service pages.
- **📁 Integrated Media Server**: Automated file handling and image serving via absolute path resolution.
- **⚡ Performance Optimized**: High-limit JSON payloads (10MB) for complex content synchronization.
- **🛠️ Robust Seeding**: Comprehensive automation scripts for production-ready data instantiation.

---

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Bcrypt, JWT, CORS, Helmet
- **File Handling**: Multer

---

## 📦 API Overview

### Authentication
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/user/login` | `POST` | Authenticate admin and return JWT |
| `/user/register` | `POST` | Create new administrative accounts |

### Content Management (CMS)
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/page-content/:page/:lang` | `GET` | Fetch dynamic page content |
| `/api/page-content` | `POST` | Upsert/Sync page sections |

### Administrative Modules
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/dashboard/stats` | `GET` | Aggregated dashboard analytics |
| `/api/upload` | `POST` | Image upload to media directory |
| `/brands` | `GET/POST` | Manage partner brand entities |

---

## 🛠️ Installation & Setup

1. **Clone the Project**
   ```bash
   git clone https://github.com/Rashedalfoqha/backendForDcCharge.git
   cd backendForDcCharge
   ```

2. **Install Core Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file:
   ```env
   PORT=5000
   DB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/dc_charge
   SECRET=your_jwt_signing_secret
   ```

4. **Initialize Database**
   ```bash
   npm run seed
   ```

5. **Start Production Server**
   ```bash
   npm run start
   ```

---

## 📂 Project Architecture

```text
├── controller/     # Business logic handlers
├── middleware/     # Auth & Upload interceptors
├── models/         # Mongoose schemas
├── routes/         # Express endpoint definitions
├── uploads/        # Static media storage
└── index.js        # Application entry point
```

---

## 📄 License
This project is licensed under the MIT License.

---

## 🤝 Connect
Developed and Maintained by **Rashed Alfoqha**.
[GitHub Profile](https://github.com/Rashedalfoqha) | [Project Issues](https://github.com/Rashedalfoqha/backendForDcCharge/issues)
