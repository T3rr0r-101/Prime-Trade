# PrimeTrader Dashboard

A modern, full-stack task management application with secure authentication, real-time CRUD operations, and a sleek responsive dashboard featuring light/dark mode support.

## 🚀 Tech Stack

**Frontend:**
- React.js 18
- Tailwind CSS
- React Context API
- Axios
- Responsive Design

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs Password Hashing

**Development Tools:**
- Postman API Collection
- Environment Configuration
- Git Version Control

## ✨ Features

### Authentication & Security
- 🔐 User registration and login
- 🛡️ JWT-based authentication
- 🔒 Secure password hashing with bcrypt
- 🚪 Protected routes and middleware
- 🔑 Automatic token management

### Dashboard & UI/UX
- 📊 Modern, intuitive dashboard
- 🌓 Light/Dark mode toggle
- 📱 Fully responsive design
- 🎨 Clean, professional interface
- ⚡ Real-time updates

### Task Management (CRUD)
- ➕ Create new tasks
- 📝 Update existing tasks
- 🗑️ Delete tasks
- 👀 View all tasks
- 🔍 Search and filter functionality
- 📈 Task status tracking

## 📁 Project Structure

```
PrimeTrader/
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   ├── layout/         # Layout components
│   │   │   └── ui/             # Reusable UI components
│   │   ├── context/            # React Context providers
│   │   ├── pages/              # Page components
│   │   ├── utils/              # Utility functions
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                     # Node.js Backend
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Authentication middleware
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API routes
│   ├── utils/                  # Helper functions
│   ├── server.js               # Entry point
│   └── package.json
├── PrimeTrader-API.postman_collection.json
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd PrimeTrader
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
MONGO_URI=mongodb://localhost:27017/primetrader
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

Start backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create `.env` file in client directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend development server:
```bash
npm start
```

### 4. Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 📚 API Documentation

Complete API documentation is available via Postman collection:

1. Import `PrimeTrader-API.postman_collection.json` into Postman
2. Set base URL to `http://localhost:5000/api`
3. Use the collection for testing all endpoints

### Key API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | User registration | No |
| POST | `/auth/login` | User login | No |
| GET | `/user/profile` | Get user profile | Yes |
| GET | `/tasks` | Get all tasks | Yes |
| POST | `/tasks` | Create new task | Yes |
| PUT | `/tasks/:id` | Update task | Yes |
| DELETE | `/tasks/:id` | Delete task | Yes |

## 🔒 Security Practices

- **Password Security:** bcrypt hashing with salt rounds
- **JWT Tokens:** Secure token-based authentication
- **Environment Variables:** Sensitive data stored in .env files
- **Input Validation:** Server-side validation for all inputs
- **Protected Routes:** Middleware-based route protection
- **CORS Configuration:** Proper cross-origin resource sharing setup

## 🚀 Scalability & Production Readiness

### Database
- MongoDB with proper indexing
- Scalable document-based architecture
- Connection pooling and optimization

### Backend Architecture
- RESTful API design
- Modular controller/route structure
- Middleware-based authentication
- Error handling and logging

### Frontend Architecture
- Component-based React architecture
- Context API for state management
- Responsive design patterns
- Optimized build process

### Deployment Considerations
- Environment-specific configurations
- Production build optimization
- Database connection security
- Static asset optimization

## 👨‍💻 Author

**Vikram Arun**
- GitHub: [@T3rr0r-101](https://github.com/T3rr0r-101)
- Email: vikramarunoff@gmail.com

## 📋 Project Status

**Current Status:** ✅ Complete and Production Ready

**Features Implemented:**
- ✅ User Authentication System
- ✅ Protected Dashboard
- ✅ Full CRUD Operations
- ✅ Search & Filter Functionality
- ✅ Light/Dark Mode Toggle
- ✅ Responsive Design
- ✅ API Documentation

**Future Enhancements:**
- 📧 Email notifications
- 📅 Task scheduling
- 👥 Team collaboration features
- 📊 Advanced analytics dashboard

---

*This project demonstrates full-stack development skills including modern React.js frontend development, Node.js backend architecture, database design, authentication systems, and responsive UI/UX design.*