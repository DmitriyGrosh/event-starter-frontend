#!/bin/bash

echo "=== SSL Debug Script ==="
echo

echo "1. Checking current running containers:"
docker ps
echo

echo "2. Checking docker-compose status:"
cd ~/event-starter-frontend
docker compose ps
echo

echo "3. Checking nginx container logs:"
docker compose logs nginx
echo

echo "4. Checking SSL certificate files:"
ls -la /etc/nginx/ssl/
echo

echo "5. Testing SSL certificate validity:"
openssl x509 -in /etc/nginx/ssl/cert.pem -text -noout | grep -E "(Subject|Issuer|Not Before|Not After)"
echo

echo "6. Checking if ports 80 and 443 are in use:"
netstat -tlnp | grep -E ":80 |:443 "
echo

echo "7. Testing local HTTPS connection:"
curl -k -I https://localhost
echo

echo "8. Checking nginx configuration syntax:"
docker compose exec nginx nginx -t
echo 