---
title: 给自己的VPS的新服务新增配证书
date: 2020-05-27 21:59:00
categories: coding
tags: VPS
---

我已经忘记为啥我这个站没法生成通配符证书了，现在每加一个应用就得重新生成一遍，还是挺折腾的，很容易忘记。我还是先把这个过程记下来吧。

<!-- more -->

先去购买域名网站的配置页面那里给这次想使用的子域名che.xxx.xyz更新一条DNS记录，DNS更新大概15到20分钟左右时间。

这次加的是chevereto这个图床应用，直接用官网的docker-compose.yml改一下分配的端口号，之后通过`docker-compose up -d`进行安装。

这时候还只能通过ip加端口形式访问，所以需要在nginx中加配置，把che.xxx.xyz这个域名配置成我在/home/wwwroot/下布好的一个静态网页。然后重启nginx服务让配置生效，好像用restart或者reload都行。

之后要用到acme.sh了：

```
acme.sh  --issue  -d che.xxx.xyz --webroot  /home/wwwroot/XXX

acme.sh --installcert -d che.xxx.xyz --keypath  /data/che.xxx.xyz.key  --fullchainpath /data/che.xxx.xyz.fc.cer --reloadcmd  "service nginx reload"
```

这两个命令分别做了生成证书以及把证书安装到指定位置，这次做的时候我把第二步给忘了，是手动拷贝过去改名字的，所以拷错了文件，加载配置时报了[PEM_read_bio_X509_AUX](https://ma.ttias.be/nginx-ssl-certificate-errors-pem_read_bio_x509_aux-pem_read_bio_x509-ssl_ctx_use_privatekey_file/)这个错。所以还是用脚本吧。

证书部分完成后就是重新修改nginx的配置，这次得按照正式使用的场景进行修改，改完后还是同样需要让新配置生效。

nginx生效后，就可以通过https访问了。