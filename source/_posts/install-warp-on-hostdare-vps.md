---
title: Hostdare解锁奈飞实测
date: 2022-01-27 15:55
categories: Coding
tags: VPS
---

因为现在有方便的一把梭脚本，正常来讲新的空白机器想要解锁可以直接执行：`bash <(curl -fsSL git.io/warp.sh) d`

<!-- more -->

然而我的这台Hostdare(年付$34.49的Premium China Optimized KVM VPS，中途换过一次IP)，实际执行一把梭脚本时会在执行到`starting wireguard`时卡住，由于我上面部署了很多docker容器，因此无法轻易地重装系统。所以参考了https://vpsxb.net/1069/ 进行解锁。但实际操作的结果会和教程有一点出入，因此这里记录了一下实际操作的过程，安装的过程基本上都围绕现在使用较多的一些脚本进行：

## 安装warp linux client

我在按照上文实操时，使用脚本`wget -N https://cdn.jsdelivr.net/gh/fscarmen/warp/menu.sh && bash menu.sh`安装warp的linux client时出现了无法安装的情况，因此我先运行了另一个脚本`bash <(curl -fsSL git.io/warp.sh) menu`，在菜单中选择相关选项安装warp linux client。

## 刷支持IP

完成上一步的安装后，使用`wget -N https://cdn.jsdelivr.net/gh/fscarmen/warp/menu.sh && bash menu.sh`，选择选项5：“更换支持Netflix的IP”，刷到可使用的IP。

## 修改配置文件

执行`vim /etc/v2ray/config.json`修改v2ray配置文件的outbounds和routing部分为：

```
  "outbounds": [
    {
      "protocol": "freedom"
    },
    {
      "tag": "media-unlock",
      "protocol": "socks",
      "settings": {
      "servers": [
      {
      "address": "127.0.0.1",
      "port": 40000,
      "users": []
      }
      ]
      }
    }
  ], 
  "routing": {
    "domainStrategy": "AsIs",
    "rules": [
      {
      "type": "field",
      "domain": [
      "geosite:netflix"
      ],
      "outboundTag": "media-unlock"
      }
    ]
  }
```
修改后`sudo systemctl restart v2ray`，重启v2ray使配置生效。

## 补充

这种方法解锁的机器是无法通过`wget -O nf https://github.com/sjlleo/netflix-verify/releases/download/2.61/nf_2.61_linux_amd64 && chmod +x nf && clear && ./nf`的流媒体检测的，结果仍然会显示非原生IP，但实际观看时不受影响。



