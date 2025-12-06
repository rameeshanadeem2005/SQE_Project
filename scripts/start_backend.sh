#!/bin/bash
pm2 stop all || true
cd /home/ec2-user/idurar-erp-crm/backend/src
pm2 start server.js --name "staging-backend"
