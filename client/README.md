# Frontend Deployment Guide for Vercel

This React frontend is configured to work with the deployed backend API and ready for Vercel deployment.

## Configuration

### Environment Variables
The frontend is configured with the following environment files:

- **`.env`** - Default environment (production API)
- **`.env.local`** - Local development (localhost API)
- **`.env.production`** - Production environment (production API)

### API Endpoints
The frontend connects to the deployed backend at:
- **Production API**: `https://flash-deployment-25ak.vercel.app/api`

## Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from the client directory
```bash
cd client
vercel
```

### 4. For production deployment
```bash
vercel --prod
```

## Build Configuration

The project is configured with:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **SPA Routing**: All routes redirect to `/index.html`
- **Asset Caching**: Static assets cached for 1 year

## Features

### API Integration
- All API calls use `import.meta.env.VITE_API_URL` for environment-specific endpoints
- Configured for both development and production environments
- Cookie-based authentication with credentials included

### Pages & Components
- **Home**: Landing page
- **News**: News articles listing and single article view
- **Admin Panel**: Protected admin interface for content management
- **Authentication**: Login system with JWT tokens
- **API Documentation**: API usage examples

### Routing
- React Router with protected routes
- Private routes require authentication
- 404 handling for unknown routes

## Local Development

For local development with the deployed backend:
```bash
npm run dev
```

For local development with local backend:
1. Update `.env.local` to point to `http://localhost:5001/api`
2. Run: `npm run dev`

## Production Build

To build for production:
```bash
npm run build
```

To preview production build:
```bash
npm run preview
```

## Environment Variables

The frontend uses these environment variables:
- `VITE_API_URL`: Backend API base URL
- `VITE_BASE_URL`: Frontend base URL

## Troubleshooting

1. **API Connection Issues**: Ensure the backend is deployed and accessible
2. **CORS Errors**: Backend CORS is configured for the frontend domain
3. **Build Errors**: Check that all dependencies are installed with `npm install`
4. **Routing Issues**: Vercel configuration handles SPA routing automatically

## Monitoring

- Use Vercel's built-in analytics
- Monitor API calls to the backend
- Check browser console for any client-side errors
