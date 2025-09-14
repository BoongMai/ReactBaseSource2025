# Base Source

Modern React application template built with React + TypeScript + Vite.

## 🚀 Quick Start

### **Clone Repository:**
```bash
git clone https://github.com/BoongMai/ReactBaseSource2025.git
cd ReactBaseSource2025
```

### **Install Dependencies:**
```bash
npm install
```

### **Start Development:**
```bash
npm run dev
```

### **Build for Production:**
```bash
npm run build
```

### **Preview Production Build:**
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── features/          # Feature modules
│   ├── auth/         # Login/Register
│   ├── dashboard/    # Dashboard
│   ├── profile/      # User profile
│   └── settings/     # Settings
├── shared/           # Shared components
└── pages/            # Page components
```

## 🛠 Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Ant Design** - UI components
- **Zustand** - State management
- **React Query** - Server state
- **React Router** - Routing

## 🔧 Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build production
npm run preview          # Preview build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code
npm run type-check       # TypeScript check

# Testing
npm run test             # Run tests
npm run test:coverage    # Test coverage

# Docker
npm run deploy:qa        # Deploy QA
npm run deploy:uat       # Deploy UAT
```

## 🔒 Security Features

- JWT authentication
- CSRF protection
- Secure token storage
- API security headers

## 📊 Monitoring

- Performance monitoring
- Error tracking
- Health checks
- Bundle analysis

## 🚀 Deployment

```bash
# QA Environment
npm run deploy:qa

# UAT Environment
npm run deploy:uat
```

## 📝 Environment

Create `.env.local`:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=BaseSource
```

---

Base source template for React applications.
