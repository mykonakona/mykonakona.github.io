---
title: acme.sh的Verify error:Invalid response from报错
date: 2020-08-24 16:49:00
categories: Coding
tags: VPS 
---

之前在hostdare购入过一台VPS，速度一般，所以拿来做备胎，乱七八糟部了一些服务在上面，考虑到最低限度的安全，用acme给每个服务都手动生成了一遍证书，还挺麻烦的（当时因为一些原因，通配符证书没能用起来……）。

其中最常用的一个自用服务是freshrss，今天访问时突然发现证书过期了，按说acme是可以自动续期的。查了一下`acme.sh.log`，报了一条这个错误：

<!-- more -->

```
[Mon Aug 24 00:09:56 CST 2020] yousite.xyz:Verify error:Invalid response from https://yousite.xyz/.well-known/acme-challenge/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx [*.*.*.*]: 404
```

说明acme是有在自动去更新证书的，但是到verify这一步时会通不过。查了一下，发现项目里面有一条issue：[Verify error:Invalid response #132][1]里有解答：

```

同样遇到这个问题，如果是nginx的话，一般是因为服务器拒绝访问，解决方法2个，都是为了获取访问权限：

1.在include *.conf; 下方加入部分代码：

server {

listen 80;

server_name yoursite.com www.yoursite.com;

include *.conf;      // 加入以下代码；

       location ^~ /.well-known/acme-challenge/ 
    {
        default_type "text/plain";
        root  /home/wwwroot/yoursite;
    }
    
    location = /.well-known/acme-challenge/ 
    {
        try_files $uri =404;
    }
    

2.在 yoursite.conf 中，把拒绝访问代码注释掉，如下：

        #  location ~ /\.
        #  {
        #      deny all;
        #  }


```

我的nginx把各服务的配置单独放在了新建的`\etc\nginx\conf\conf.d\xxx.conf`，所以这里`location`部分要放到`xxx.conf`下，后续要做的就是重新加载nginx的配置：

```
cd /etc/nginx/sbin
./nginx -s reload
```

为了验证配置是否生效，这里更新了一下acme之后做了一次证书手动更新。

```
cd ~/.acme.sh/
acme.sh --upgrade
acme.sh --renew  -d domain.com 
```

这次签发成功了，于是又水了一贴（部分信息做了脱敏处理）……

[1]: https://github.com/acmesh-official/acme.sh/issues/132 "Verify error:Invalid response #132"
