cd /home/ubuntu/SmartQuest_frontend
pm2 start npm --name "sq.frontend" -- start
pm2 startup
pm2 save
pm2 restart all