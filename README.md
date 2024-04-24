install node
install php and composer

start the app:
  
  cd NDServer

  composer install 
  
  .env:[
    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=
    SESSION_DOMAIN={your ip address}
    SANCTUM_STATFUL_DOMAINS=http://{your ip address}:8000,http://{your ip address}:4444
    FRONTEND_URL=http://{your ip address}:4444
    APP_DEBUG=true
    APP_URL=http://{your ip address}:8000
]
  
  php artisan migrate:fresh
  
  php artisan key:generatete
  
  php artisan serve --host={your ip address} --port=8000
  
  cd NetDir
  
  npm i
  
  change src/variables/Network.js host to your ip address
  
  npm run web
  
  open the page via {your ip}:4444 not localhost
