#!/bin/bash

# Deployment script for Posgen Travel Consult Docker container

set -e

echo "🚀 Deploying Posgen Travel Consult..."

# Stop and remove existing container
echo "Stopping existing container..."
docker-compose down || true

# Start the container
echo "Starting container..."
docker-compose up -d

# Wait for health check
echo "Waiting for application to be healthy..."
sleep 5

# Check container status
if docker-compose ps | grep -q "Up"; then
    echo "✅ Deployment successful!"
    echo ""
    echo "Application is running on port 8089"
    echo "Access it at: http://localhost:8089"
    echo ""
    echo "To view logs, run: ./logs.sh"
    echo "To stop the container, run: docker-compose down"
else
    echo "❌ Deployment failed. Checking logs..."
    docker-compose logs
    exit 1
fi
