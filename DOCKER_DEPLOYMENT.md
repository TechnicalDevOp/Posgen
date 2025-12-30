# Docker Deployment Guide - Posgen Travel Consult

## Overview

This project is dockerized using a multi-stage build process:
- **Stage 1**: Builds the React/Vite application using Node.js 20 Alpine
- **Stage 2**: Serves the static build using nginx Alpine

The application runs on port **8089** and is configured to work with your lighttpd reverse proxy.

## Prerequisites

- Docker installed (version 20.10+)
- Docker Compose installed (version 2.0+)
- Port 8089 available on the host

## Quick Start

### 1. Build the Docker Image

```bash
chmod +x build.sh
./build.sh
```

Or manually:
```bash
docker-compose build
```

### 2. Deploy the Application

```bash
chmod +x deploy.sh
./deploy.sh
```

Or manually:
```bash
docker-compose up -d
```

### 3. View Logs

```bash
chmod +x logs.sh
./logs.sh
```

Or manually:
```bash
docker-compose logs -f
```

### 4. Stop the Application

```bash
docker-compose down
```

## Deployment on Ubuntu Server

### 1. Transfer Files to Server

Transfer the following files to your Ubuntu server:

```bash
scp -r Dockerfile docker-compose.yml nginx.conf .dockerignore \
    package*.json vite.config.js eslint.config.js index.html \
    src/ public/ build.sh deploy.sh logs.sh \
    user@5.180.182.129:/path/to/deployment/
```

### 2. On the Server

```bash
# Make scripts executable
chmod +x build.sh deploy.sh logs.sh

# Build the image
./build.sh

# Deploy the container
./deploy.sh
```

### 3. Verify Deployment

The application will be available at:
- Internal: `http://localhost:8089`
- External: `http://temp.allium-technologies.com` (via lighttpd proxy)

Test the health endpoint:
```bash
curl http://localhost:8089/health
```

Expected response: `healthy`

## Lighttpd Configuration

Your existing lighttpd configuration:

```conf
$HTTP["host"] =~ "^(www\.)?temp.allium-technologies\.com$" {
    proxy.server = (
        "" => ( "docker" => ( "host" => "5.180.182.129", "port" => 8089 ) )
    )
}
```

This routes all traffic from `temp.allium-technologies.com` to the Docker container on port 8089.

## Application Details

### Ports
- **Container Internal**: 80 (nginx)
- **Host Exposed**: 8089 (mapped via docker-compose)
- **Lighttpd Proxy**: Routes to 5.180.182.129:8089

### Health Check
- Endpoint: `/health`
- Interval: 30 seconds
- Timeout: 10 seconds
- Retries: 3

### Logging
- Driver: JSON file
- Max size: 10MB per file
- Max files: 3 (rotating logs)

## Container Management

### Check Container Status
```bash
docker-compose ps
```

### Restart Container
```bash
docker-compose restart
```

### Stop Container
```bash
docker-compose stop
```

### Remove Container and Image
```bash
docker-compose down
docker rmi posgen-posgen-web
```

### View Resource Usage
```bash
docker stats posgen-travel-consult
```

## Updating the Application

When you need to update the application code:

```bash
# 1. Pull latest changes (if using git)
git pull

# 2. Rebuild the image
./build.sh

# 3. Redeploy
./deploy.sh
```

## Troubleshooting

### Container Won't Start
```bash
# Check logs
./logs.sh

# Check container status
docker-compose ps

# Inspect container
docker inspect posgen-travel-consult
```

### Port Already in Use
```bash
# Check what's using port 8089
sudo lsof -i :8089

# Or on Ubuntu
sudo netstat -tulpn | grep 8089
```

### Build Fails
```bash
# Clean build cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Application Not Accessible
1. Check container is running: `docker-compose ps`
2. Check health endpoint: `curl http://localhost:8089/health`
3. Check nginx logs: `docker-compose logs`
4. Verify lighttpd proxy configuration
5. Check firewall rules: `sudo ufw status`

### Static Assets Not Loading
- Verify files exist in container:
  ```bash
  docker exec posgen-travel-consult ls -la /usr/share/nginx/html/
  ```
- Check nginx configuration:
  ```bash
  docker exec posgen-travel-consult cat /etc/nginx/conf.d/default.conf
  ```

## Performance Optimization

### Enable HTTP/2 (Optional)
Modify `nginx.conf` to add SSL and HTTP/2 support if needed.

### Adjust Resource Limits
Add to `docker-compose.yml`:
```yaml
services:
  posgen-web:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

## Security Considerations

1. **Container runs as root** - Consider adding a non-root user in Dockerfile
2. **Security headers** - Already configured in nginx.conf
3. **HTTPS** - Configure at lighttpd level for SSL termination
4. **Regular updates** - Keep base images updated:
   ```bash
   docker-compose pull
   docker-compose build --no-cache
   ```

## Backup Strategy

### Backup Application Data
Since all data is static JSON files baked into the image, ensure your source code is:
- Version controlled (git)
- Backed up regularly
- Tagged for releases

### Update Data Files
To update `packages_clean.json`:
1. Update the file in your source
2. Rebuild the Docker image: `./build.sh`
3. Redeploy: `./deploy.sh`

## Monitoring

### Health Checks
The container includes a built-in health check:
```bash
docker inspect --format='{{json .State.Health}}' posgen-travel-consult | jq
```

### Access Logs
```bash
# Real-time logs
./logs.sh

# Last 100 lines
docker-compose logs --tail=100

# Logs from specific time
docker-compose logs --since 1h
```

## Support

For issues or questions:
- Check container logs: `./logs.sh`
- Verify lighttpd configuration
- Check Docker daemon: `sudo systemctl status docker`
- Review this documentation

## File Structure

```
.
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Container orchestration
├── nginx.conf             # nginx web server config
├── .dockerignore          # Files to exclude from build
├── build.sh               # Build script
├── deploy.sh              # Deployment script
├── logs.sh                # Logs viewer script
└── DOCKER_DEPLOYMENT.md   # This file
```
