# NetDir
self-hosted file storage
## install and start

install node

install php and composer

clone repo
  ```
  git clone https://github.com/0znerol/NetDir-laravel.git
  ```
  ```
  cd NDServer
  ```
  install php dependencies:
  ```
  composer install 
  ```
  .env:
  
    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=
    SESSION_DOMAIN={your ip address}
    SANCTUM_STATFUL_DOMAINS=http://{your ip address}:8000,http://{your ip address}:4444
    FRONTEND_URL=http://{your ip address}:4444
    APP_DEBUG=true
    APP_URL=http://{your ip address}:8000
    
  migrate database:
  ```
  php artisan migrate:fresh
  ```
  generate app key:
  ```
  php artisan key:generatete
  ```
  start server:
  ```
  php artisan serve --host={your ip address} --port=8000
  ```
  ```
  cd ../NetDir
  ```
  install node dependencies:
  ```
  npm i
  ```
  ## change src/variables/Network.js host to your ip address
  
  run react server:
  ```
  npm run web
  ```
  ### open the page via {your ip}:4444 not localhost

