#!/bin/bash
cd /home/ec2-user/app/frontend
npm run build
cp -r dist/* ../backend/public/
