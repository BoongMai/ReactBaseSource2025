# Deployment Guide

## 🚀 Quick Deploy

```bash
# QA Environment
npm run deploy:qa

# UAT Environment
npm run deploy:uat
```

## 📋 URLs

- **QA**: http://localhost:3001
- **UAT**: http://localhost:3002

## 🛠 Commands

```bash
# Deploy
npm run deploy:qa     # Deploy QA
npm run deploy:uat    # Deploy UAT

# Stop
npm run stop:qa       # Stop QA
npm run stop:uat      # Stop UAT

# Logs
npm run logs:qa       # View QA logs
npm run logs:uat      # View UAT logs
```

## ⚙️ Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://api-qa.example.com  # For QA
VITE_API_URL=https://api-uat.example.com # For UAT
VITE_APP_NAME=BaseSource
```

## 🔧 Manual Commands

```bash
# Build and start QA
docker-compose -f deploy-qa.yml up -d --build

# Build and start UAT
docker-compose -f deploy-uat.yml up -d --build

# Stop containers
docker-compose -f deploy-qa.yml down
docker-compose -f deploy-uat.yml down
```

## 📊 Monitoring

```bash
# Check container status
docker ps

# View logs
docker-compose -f deploy-qa.yml logs -f

# Health check
curl http://localhost:3001/health
```

---

**Ready to deploy!** 🚀
