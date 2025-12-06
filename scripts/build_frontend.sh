#!/bin/bash
cd /home/ec2-user/idurar-erp-crm/frontend
npm run build
cp -r dist/* ../backend/public/
