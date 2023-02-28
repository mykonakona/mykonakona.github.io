---
title: 给自己VPS的新服务新增证书
date: 2022-01-07 19:34:00
categories: Coding
tags: VPS
---

2023年2月28日更新：

没记错的话若干年前acme.sh使用通配符证书还没法自动续签，所以当时是一条一条添加的，现在应该不存在这个问题了。

<!-- more -->

证书申请参考[使用 acme.sh 配置自动续签 SSL 证书](https://u.sb/acme-sh-ssl/)，nginx配置参考[配置 Nginx 和 frps 共存 80/443 端口及泛域名支持教程](https://www.ioiox.com/archives/78.html)即可(不过第二篇有关“frpc.ini 中域名参数需使用 subdomain = xx 仅填写二级域名主机头即可，不要填写完整域名”的内容，经测试还是得写完整域名。)

```bash
server {
    listen 80;
    server_name *.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name *.yourdomain.com;

    ssl_certificate /usr/local/nginx/conf/ssl/yourdomain.com.crt;
    ssl_certificate_key /usr/local/nginx/conf/ssl/yourdomain.com.key;

    client_max_body_size 50m; 
    client_body_buffer_size 256k;
    client_header_timeout 3m;
    client_body_timeout 3m;
    send_timeout 3m;
    proxy_connect_timeout 300s; 
    proxy_read_timeout 300s; 
    proxy_send_timeout 300s;
    proxy_buffer_size 64k; 
    proxy_buffers 4 32k; 
    proxy_busy_buffers_size 64k;
    proxy_temp_file_write_size 64k; 
    proxy_ignore_client_abort on; 

    location / {
        proxy_pass http://127.0.0.1:1234;
        proxy_redirect off;
        proxy_set_header Host $host:80;
        proxy_ssl_server_name on;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

2022年1月7日更新：

关于下文中“che.xxx.xyz这个域名配置成我在/home/wwwroot/下布好的一个静态网页”这一描述，现在再读，感觉还是直接给出一个nginx的配置范例会比较清晰一些

```bash
#运行acme.sh  --issue  -d che.xxx.xyz --webroot  /home/wwwroot/XXX 命令前，注释掉80端口转发的配置
#   server {
#       listen 80;
#       server_name che.xxx.xyz;
#       return 301 https://$host$request_uri;
#    }

#取消注释用于签发证书的配置    
    server {
        listen 80;
        server_name  che.xxx.xyz;
            root  /home/wwwroot/XXX;
        location ^~ /.well-known/acme-challenge/ {
            default_type "text/plain";
        }
    }
```

保存后运行`./nginx -s reload`令其生效，运行下方的acme.sh命令以签发证书

```bash
acme.sh  --issue  -d che.xxx.xyz --webroot  /home/wwwroot/XXX

acme.sh --installcert -d che.xxx.xyz --keypath  /data/che.xxx.xyz.key  --fullchainpath /data/che.xxx.xyz.fc.cer --reloadcmd  "service nginx reload"
```

完成签发后，在nginx配置新增配置，并注释掉之前用于签发证书的内容

```bash
#新增https配置
    server {
        listen 443 ssl http2;
        server_name che.xxx.xyz;
        ssl_certificate       /data/che.xxx.xyz.fc.cer; 
        ssl_certificate_key   /data/che.xxx.xyz.key;
        location / {
            proxy_pass http://127.0.0.1:1234;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }     
      
        location ^~ /.well-known/acme-challenge/ {
            default_type "text/plain";
            root  /home/wwwroot/XXX;
        }
    
        location = /.well-known/acme-challenge/ {
            try_files $uri =404;
        }
    
    }
    
#取消注释80端口的转发，令其生效
    server {
        listen 80;
        server_name che.xxx.xyz;
        return 301 https://$host$request_uri;
    }
    
#注释掉用于签发证书的配置，以便再次使用
#    server {
#       listen 80;
#       server_name  che.xxx.xyz;
#            root  /home/wwwroot/XXX;
#       location ^~ /.well-known/acme-challenge/ {
#            default_type "text/plain";
#        }
#    }

```

再次运行`./nginx -s reload`，令配置生效。

***

先去购买域名网站的配置页面那里给这次想使用的子域名che.xxx.xyz更新一条DNS记录，DNS更新大概15到20分钟左右时间。

这次加的是chevereto这个图床应用，直接用官网的docker-compose.yml改一下分配的端口号，之后通过`docker-compose up -d`进行安装。

这时候还只能通过ip加端口形式访问，所以需要在nginx中加配置，把che.xxx.xyz这个域名配置成我在/home/wwwroot/下布好的一个静态网页。然后重启nginx服务让配置生效，好像用restart或者reload都行。

之后要用到acme.sh了：

```bash
acme.sh  --issue  -d che.xxx.xyz --webroot  /home/wwwroot/XXX

acme.sh --installcert -d che.xxx.xyz --keypath  /data/che.xxx.xyz.key  --fullchainpath /data/che.xxx.xyz.fc.cer --reloadcmd  "service nginx reload"
```

这两个命令分别做了生成证书以及把证书安装到指定位置，这次做的时候我把第二步给忘了，是手动拷贝过去改名字的，所以拷错了文件，加载配置时报了[PEM_read_bio_X509_AUX](https://ma.ttias.be/nginx-ssl-certificate-errors-pem_read_bio_x509_aux-pem_read_bio_x509-ssl_ctx_use_privatekey_file/)这个错。所以还是用脚本吧。

证书部分完成后就是重新修改nginx的配置，这次得按照正式使用的场景进行修改，改完后还是同样需要让新配置生效。

nginx生效后，就可以通过https访问了。

后记：其实图床这个事情也和[我搭静态博客](https://mykonakona.github.io/2020/05/27/the-way-I-build-a-static-blog/)的想法或者说理念有点冲突，实际是有人拿github直接做图床的，想了想还是不大好意思这么做。
