---
title: docker版qbittorrent修改webUI乱码问题
date: 2022-11-14 11:36:00
categories: Digital
tags: [qbittorrent, nas, docker]
---

我在群晖通过docker安装了4.1.9版本的qbittorrent，当初选定这一版本是根据天雪的客户端支持列表来的，这个版本的UI提供的功能很简陋，所以需要使用第三方webUI替代。

<!-- more -->

## 问题

但在修改webUI时，一点击保存就会跳转到一个[乱码][1]页面，内容如下：

`涓嶅彲鎺ュ彈鐨勬枃浠剁被鍨嬶紝鍙厑璁镐娇鐢ㄥ父瑙勬枃浠躲€�`

## 恢复

虽然有很多教程(本质上都来源于reddit的这个[讨论][2])指出，此时如果想恢复qb假死的状态，需要在url后加上如下内容以调用api：

`/api/v2/app/setPreferences?json=%7B%22alternative_webui_enabled%22:false%7D`

但实测是无效的，因为显示该乱码的原因是之前我们把qb调成了中文界面，只有在英文界面正常显示如下信息时，该方法才能生效：

`"Unacceptable file type, only regular file is allowed"`

这时候只能通过在docker管理界面新建一个`/bin/sh`的终端，进入docker内部去修改qb的配置文件（把webui启用的选项设置成false)，重启容器后才能重新正常访问qb的web页面。

## 解决

如果想要正常安装第三方webUI并使用，一个[重点][3]是写对配置路径。

可以参考以下做法：

1. 若待挂载的各目录都安排在nas的绝对路径`/volume1/docker/qbittorrent/`下，这里`/docker`最好是一个有读写权限的共享文件夹，这样可以排除产生权限问题的可能。

2. 新建容器时，除惯例挂载的config、data、downloads等文件夹外，新增一个挂载到`/docker/qbittorrent/webui`的`/webui`文件夹，用于存放UI文件并确保其可以被读取。

3. 在qb的配置菜单的备用webUI选项中填入的是相对路径，如：`/docker/qbittorrent/webui/qb-webui-linux-sc-sarasa/public/`

这时再点击保存后，不再跳转乱码页面，第三方UI已可以正常显示。

[1]: https://github.com/PrintNow/MD-qBittorrent-web-ui/issues/2
[2]: https://www.reddit.com/r/qBittorrent/comments/ky01n4/web_ui_stuck_on_unacceptable_file_type_only/
[3]: https://github.com/miniers/qb-web/issues/22
