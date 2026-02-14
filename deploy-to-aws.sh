#!/bin/bash

# AWS Deployment Script for The Language Network
# This script deploys the latest build to your AWS EC2 server

echo "================================================================================"
echo "🚀 DEPLOYING TO AWS EC2"
echo "================================================================================"
echo ""

# Configuration
EC2_USER="ec2-user"
EC2_HOST="3.101.63.121"
KEY_FILE="TLN.pem"
WEB_ROOT="/var/www/html"

echo "📦 Step 1: Building production bundle..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

echo "📤 Step 2: Uploading to AWS EC2..."
echo "   Server: $EC2_HOST"
echo "   Path: $WEB_ROOT"
echo ""

# Upload dist folder to EC2
scp -i "$KEY_FILE" -r dist/* ${EC2_USER}@${EC2_HOST}:/tmp/dist-upload/

if [ $? -ne 0 ]; then
    echo "❌ Upload failed!"
    exit 1
fi

echo "✅ Upload successful!"
echo ""

echo "🔄 Step 3: Deploying on server..."

# SSH into server and move files
ssh -i "$KEY_FILE" ${EC2_USER}@${EC2_HOST} << 'ENDSSH'
    echo "   Backing up current deployment..."
    sudo cp -r /var/www/html /var/www/html.backup.$(date +%Y%m%d_%H%M%S)
    
    echo "   Removing old files..."
    sudo rm -rf /var/www/html/*
    
    echo "   Moving new files..."
    sudo mv /tmp/dist-upload/* /var/www/html/
    
    echo "   Setting permissions..."
    sudo chown -R nginx:nginx /var/www/html
    sudo chmod -R 755 /var/www/html
    
    echo "   Cleaning up..."
    rm -rf /tmp/dist-upload
    
    echo "   Restarting nginx..."
    sudo systemctl restart nginx
    
    echo "✅ Deployment complete!"
ENDSSH

echo ""
echo "================================================================================"
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "================================================================================"
echo ""
echo "Your site is now live at: https://thelanguagenetwork.co"
echo ""
echo "To verify:"
echo "  1. Visit https://thelanguagenetwork.co"
echo "  2. Check admin panel: https://thelanguagenetwork.co/admin/login"
echo "  3. Test mastery kits: https://thelanguagenetwork.co/my-mastery-kits"
echo ""
