#!/bin/bash
pm2 stop all || true
cd /home/ec2-user/app/backend
pm2 start index.js --name "staging-backend"
