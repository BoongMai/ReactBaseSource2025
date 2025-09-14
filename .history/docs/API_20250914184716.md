# API Guide

## 🔗 Base URL

```typescript
const API_BASE_URL = 'https://api.example.com';
```

## 🔐 Authentication

```typescript
// Login
const response = await authApi.login({
  email: 'user@example.com',
  password: 'password123',
});

// Get profile
const profile = await authApi.getProfile();
```

## 📊 API Endpoints

### Auth

- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/logout` - Logout
- `GET /auth/profile` - Get profile

### Payments

- `GET /payments` - List payments
- `POST /payments` - Create payment
- `PUT /payments/:id` - Update payment
- `DELETE /payments/:id` - Delete payment

## 🔧 Usage

```typescript
import { authApi, paymentApi } from '@/shared/utils/api';

// Login
const user = await authApi.login(credentials);

// Get payments
const payments = await paymentApi.getList();
```

## 🛡️ Security

- JWT tokens
- CSRF protection
- Request validation
- Rate limiting

---

**API ready!** 🚀
