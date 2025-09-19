# Server Deployment Guide for Vercel

This server is configured to run as a serverless function on Vercel with MongoDB Atlas.

## Prerequisites

1. **MongoDB Atlas Account**: Create a free MongoDB Atlas cluster
2. **Vercel Account**: Sign up for a free Vercel account
3. **Environment Variables**: Set up the required environment variables

## Environment Variables

Set these environment variables in your Vercel dashboard:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
NODE_ENV=production
```

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from the server directory
```bash
cd server
vercel
```

### 4. Set Environment Variables
After deployment, go to your Vercel dashboard:
- Navigate to your project
- Go to Settings > Environment Variables
- Add all the required environment variables listed above

### 5. Redeploy
```bash
vercel --prod
```

## API Endpoints

Your API is now deployed and available at:
- `http://localhost:3000/api/health` - Health check
- `http://localhost:3000/api/auth/login` - Authentication
- `http://localhost:3000/api/news` - News articles
- `http://localhost:3000/api/admin` - Admin panel (requires auth)

## File Structure

```
server/
├── index.js          # Main serverless function entry point
├── server.js         # Original server file (for local development)
├── vercel.json       # Vercel configuration
├── package.json      # Dependencies and scripts
├── .env.example      # Environment variables template
├── middleware/       # Authentication middleware
├── models/          # MongoDB models
└── routes/          # API routes
```

## Local Development

For local development, you can still use:
```bash
npm run dev
```

This will run the server using the original `server.js` file.

## Important Notes

1. **File Uploads**: File uploads are configured to work with Vercel's serverless environment
2. **Database Connection**: Uses connection caching to optimize serverless performance
3. **Error Handling**: Comprehensive error handling for production reliability
4. **CORS**: Configured for your frontend domain
5. **Static Files**: Frontend build files are served from the client/dist directory

## Troubleshooting

1. **Database Connection Issues**: Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges
2. **Environment Variables**: Double-check all environment variables are set correctly in Vercel dashboard
3. **Build Errors**: Check the Vercel build logs for specific error messages
4. **CORS Issues**: Update the CORS origins in index.js to include your production domain

## Monitoring

- Use Vercel's built-in analytics and logs
- Monitor your MongoDB Atlas cluster usage
- Set up alerts for function errors and timeouts