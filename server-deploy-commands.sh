#!/bin/bash

# Run these commands on your EC2 server
# You're already SSH'd in, so just copy/paste these:

echo "🔄 Deploying new files..."

# Create backup
sudo cp -r /var/www/html /var/www/html.backup.$(date +%Y%m%d_%H%M%S)

# Remove old files
sudo rm -rf /var/www/html/*

# Move new files
sudo mv /tmp/new-deploy/* /var/www/html/

# Set correct permissions
sudo chown -R nginx:nginx /var/www/html
sudo chmod -R 755 /var/www/html

# Restart nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx

echo "✅ Deployment complete!"
echo "Visit: https://thelanguagenetwork.co"
