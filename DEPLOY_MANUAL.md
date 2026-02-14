#!/bin/bash

# Quick AWS Deployment - Manual Steps
# Run these commands one by one

echo "Step 1: Build the project"
echo "Command: npm run build"
echo ""

echo "Step 2: SSH into your server (in another terminal)"
echo "Command: ssh -i TLN.pem ec2-user@3.101.63.121"
echo ""

echo "Step 3: On the server, run these commands:"
echo ""
echo "sudo rm -rf /var/www/html/*"
echo ""

echo "Step 4: Back on your local machine, upload files:"
echo "Command: scp -i TLN.pem -r dist/* ec2-user@3.101.63.121:/tmp/"
echo ""

echo "Step 5: Back on the server, move files and set permissions:"
echo ""
echo "sudo mv /tmp/index.html /var/www/html/"
echo "sudo mv /tmp/assets /var/www/html/"
echo "sudo chown -R nginx:nginx /var/www/html"
echo "sudo chmod -R 755 /var/www/html"
echo "sudo systemctl restart nginx"
echo ""

echo "Done! Check https://thelanguagenetwork.co"
