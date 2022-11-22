---
title: 使用WARP脚本为VPS添加IPv4/IPv6网络
date: 2022-11-14 09:07
categories: Coding
tags: VPS
---

2022-11-14 09:07更新：

之前安装的WARP失效了，重装VPS系统后再次运行[一把梭脚本][1]，无法正常使用（应该是因为无法获取IP），因此使用了warp-go的相关脚本配置IPv4/IPv6网络:

`wget -N https://raw.githubusercontent.com/fscarmen/warp/main/warp-go.sh && bash warp-go.sh d`

<!-- more -->

2022-01-27 15:55更新：

大部分的VPS不是原生IP，在Netfilx上无法观看breaking bad这类非自制剧。

并且随着使用时间的增长，很容易被Google认定为机器人，从此每次使用Google时都会跳出烦人的验证码。因此使用WARP是很有必要的。

因为现在有方便的[一把梭脚本][1]，正常来讲新的空白机器想要解锁可以直接执行：

`bash <(curl -fsSL git.io/warp.sh) d`

##  问题

然而我目前使用的Hostdare服务器(年付$34.49的Premium China Optimized KVM VPS，中途换过一次IP)实际跑一把梭脚本时会在运行到`starting wireguard`时卡住，由于我懒得排查具体是什么原因（操作系统版本？还是服务器的一些未知原因？），且服务器上也部署了很多docker容器，因此也无法轻易地重装系统。所以决定干脆试试另一个解锁教程的方案：[WARP socks5 client分流][2]。

另外，我在按照该解锁方案实操时，使用另一[一键WARP脚本][3]安装warp socks5 client出现了无法安装的情况。

为了解决上述两个问题，我简单调整了该解锁方案的执行步骤：将warp socks5 client安装的步骤调整为用一把梭脚本安装，之后的步骤实际上和教程完全一样了，但还是完整地记录一下供Hostdare用户参考：

## 过程
### 安装WARP socks5 client

执行：

`bash <(curl -fsSL git.io/warp.sh) menu`

进入菜单后，选择相关选项安装warp linux client。
 
### 刷可使用IP

完成上一步的安装后，执行：

`wget -N https://cdn.jsdelivr.net/gh/fscarmen/warp/menu.sh && bash menu.sh`

选择选项5：“更换支持Netflix的IP”，刷到可使用的IP。

### 修改配置文件实现分流

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
修改后执行：

`sudo systemctl restart v2ray`

重启v2ray使配置生效。

## 补充

这种方法解锁的机器在执行[流媒体检测][3]时，结果仍然会显示非原生IP，但实际观看时不受影响。

[1]: https://github.com/P3TERX/warp.sh "Cloudflare WARP configuration script"
[2]: https://vpsxb.net/1069/ "继续解锁奈飞（七）-WARP socks5 client分流"
[3]: https://github.com/fscarmen/warp "【WGCF】连接CF WARP为服务器添加IPv4/IPv6网络"
[3]: https://github.com/sjlleo/netflix-verify "NETFLIX-VERIFY"

