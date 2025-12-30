#!/bin/bash

# Build script for Posgen Travel Consult Docker container

set -e

echo "🔨 Building Posgen Travel Consult Docker image..."

# Build the Docker image
docker-compose build --no-cache

echo "✅ Build completed successfully!"
echo ""
echo "To start the container, run: ./deploy.sh"
