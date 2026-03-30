# Deployment Guide for House Price Prediction System

This guide covers deploying both the backend API and frontend application.

## Prerequisites

- Python 3.8+
- Node.js 16+
- Git
- Docker (optional, for containerized deployment)

## Backend Deployment

### Option 1: Heroku Deployment

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create a new Heroku app
heroku create your-app-name

# Create Procfile
echo "web: uvicorn api.app:app --host 0.0.0.0 --port \$PORT" > Procfile

# Push to Heroku
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: AWS Deployment (EC2)

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Python and dependencies
sudo yum install python3 python3-pip

# Clone the repository
git clone your-repo-url
cd project

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the model (if not already done)
python main.py

# Run with Gunicorn for production
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 api.app:app

# Use systemd for auto-start
# Create /etc/systemd/system/houseprice.service
```

### Option 3: DigitalOcean App Platform

```bash
# Connect your GitHub repository to DigitalOcean
# Use doctl command-line tool or web interface

# Configure app.yaml:
name: houseprice-api
services:
- name: api
  github:
    repo: your-username/your-repo
    branch: main
  build_command: pip install -r requirements.txt && python main.py
  run_command: uvicorn api.app:app --host 0.0.0.0
  http_port: 8000
```

### Option 4: Docker Deployment

```bash
# Create Dockerfile
# (Example provided in project root)

# Build image
docker build -t houseprice-api .

# Run container
docker run -p 8000:8000 houseprice-api

# Push to Docker Hub
docker tag houseprice-api your-username/houseprice-api
docker push your-username/houseprice-api
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-api-domain.com
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend
cd frontend

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Set environment variables in Netlify dashboard
```

### Option 3: GitHub Pages

```bash
# Update vite.config.js base URL
export default {
  base: '/houseprice-ai/',  // Your repo name
  ...
}

# Build
cd frontend
npm run build

# Push to gh-pages branch
# (Use GitHub Actions for automation)
```

### Option 4: Traditional Server (nginx)

```bash
# Build frontend
cd frontend
npm run build

# SCP files to server
scp -r dist/* user@your-server:/var/www/html/

# Configure nginx
# /etc/nginx/sites-available/default
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    try_files $uri $uri/ /index.html;
    
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Restart nginx
sudo systemctl restart nginx
```

## Environment Configuration

### Backend Environment Variables (.env)

```
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=False
LOG_LEVEL=INFO
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
MODEL_PATH=models/rf_pipeline.pkl
DATA_RAW_PATH=data/raw/housing.csv
```

### Frontend Environment Variables (.env)

```
VITE_API_URL=https://api.your-domain.com
VITE_API_TIMEOUT=10000
```

## SSL/TLS Certificate

For production, always use HTTPS:

```bash
# Using Let's Encrypt
sudo certbot certonly --standalone -d your-domain.com
sudo certbot install --nginx
```

## Database Integration (Optional)

For production deployments with logging:

```bash
# Install PostgreSQL adapter
pip install psycopg2-binary SQLAlchemy

# Set DATABASE_URL environment variable
export DATABASE_URL=postgresql://user:password@host:5432/dbname
```

## Monitoring & Logging

### API Monitoring

```bash
# Install monitoring tools
pip install prometheus-client

# View logs
tail -f /var/log/houseprice-api.log
```

### Frontend Monitoring

Consider using:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage

## Performance Optimization

### Backend
- Use Redis caching for frequent predictions
- Implement rate limiting
- Use CDN for static assets
- Enable compression

### Frontend
- Enable gzip compression
- Minify bundles (done by Vite)
- Lazy load components
- Use service workers for offline support

## Scaling

For high-traffic deployments:

1. **Load Balancing**: Use nginx or AWS ALB
2. **Caching**: Implement Redis for predictions
3. **Database**: Use PostgreSQL with replication
4. **API**: Deploy multiple instances
5. **Frontend**: Use CDN (Cloudflare, AWS CloudFront)

## Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
      
      - name: Deploy Frontend to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID}}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID}}
```

## Troubleshooting

### API Not Starting
- Check logs: `heroku logs --tail` or server logs
- Verify model file exists
- Check Python dependencies: `pip list`

### Frontend Not Loading
- Check API endpoint in .env
- Verify CORS settings
- Check browser console for errors

### Predictions Taking Too Long
- Check server resources
- Consider caching
- Optimize preprocessor
- Use load balancing

## Support

For deployment issues:
1. Check the provided documentation
2. Review logs carefully
3. Test locally first
4. Consult framework documentation (FastAPI, React, Vite)
