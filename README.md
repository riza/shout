# 📢 Shout

Shout is a quick video conversion app.

### Requirements to Production

 * NodeJS
 * NGiNGX (optional)

### Installation Guide

1. Clone Repo
2. $ npm install
3. $ npm start (default prod env, you can switch to dev $ npm start dev)
4. localhost:3000


I prefer nginx to serve with proxy_pass :+1:

```
 location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;	
    #index index.php index.html;
  }
```


