#!/bin/bash
cd /home/ec2-user/idurar-erp-crm/frontend

echo "Building frontend..."
npm run build

rm -rf /home/ec2-user/idurar-erp-crm/backend/src/public/*
cp -r dist/* /home/ec2-user/idurar-erp-crm/backend/src/public/
