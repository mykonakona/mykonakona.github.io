---
id: 20221114113600
title: |
  修复qBittorrent的WebUI乱码
author: |
  mykonakona
category:
  教程
tags:
 - 数码
 - 群晖
 - docker
 - qBittorrent
 - PT
description: qBittorrent的WebUI一直有个乱码问题。
date: 2022-11-14 11:36:00
origin_url: qbittorrent-webui-mojibake
---

qBittorrent的WebUI一直有个乱码问题。

<!-- more -->

## 背景

这个问题在网络上由来已久，其中不少受害者是和我一样的群晖NAS用户。

根据[天雪的客户端支持列表][1]，我在群晖的docker安装了4.1.9版本的qBittorrent。这个版本的WebUI提供的功能很简陋，所以需要使用第三方WebUI替代。但修改WebUI路径并点击保存后，会跳转到一个[乱码][2]页面，此后无法正常进入qBittorrent的登陆页面。

## 修复

首先要把qBittorrent恢复到正常状态，一种方式是在url后加上如下内容以[调用api][3]：

`/api/v2/app/setPreferences?json=%7B%22alternative_webui_enabled%22:false%7D`

但经过实测，有些情况下这一方法是无效的，比如之前如果设置过语言为简体中文的话，报错信息为：

`涓嶅彲鎺ュ彈鐨勬枃浠剁被鍨嬶紝鍙厑璁镐娇鐢ㄥ父瑙勬枃浠躲€�`

而非:

`"Unacceptable file type, only regular file is allowed"`

所以最有效的方法还是直接修改qBittorrent的配置文件并重启。

在群晖等NAS中，可在docker管理界面-容器-详情-终端机-新增-通过命令启动，找到入口。随后输入`/bin/sh`开启终端。

之后在docker内部找到qBittorrent.conf，修改WebUI\AlternativeUIEnabled选项为false。

重启容器后重新正常访问qb的登陆页面。

## 后续

如果想要正常安装第三方WebUI并使用，一个重点是写对配置路径。

可以参考以下做法：

1. 若待挂载的各目录都安排在nas的绝对路径`/volume1/docker/qbittorrent/`下，这里`/docker`最好是一个有读写权限的共享文件夹，可以排除产生权限问题的可能；

2. 新建容器时，除惯例挂载的config、data、downloads等文件夹外，新增一个挂载到`/docker/qbittorrent/webui`的`/webui`文件夹，用于存放UI文件并确保其可以被读取；

3. 设置中文，在qb的配置菜单的备用WebUI选项填入docker内部的绝对路径，如：`/webui/qb-webui-linux-sc-sarasa/`，此时下一次目录为主题的private和public文件夹。

这时点击保存，不再跳转乱码页面，第三方UI已可以正常显示。

[1]: https://skyeysnow.com/forum.php?mod=viewthread&tid=366&extra=page%3D1
[2]: https://github.com/PrintNow/MD-qBittorrent-web-ui/issues/2
[3]: https://www.reddit.com/r/qBittorrent/comments/ky01n4/web_ui_stuck_on_unacceptable_file_type_only/
