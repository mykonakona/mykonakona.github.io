---
title: Ubuntu LTS软件版本问题
author: mykonakona
category: 踩坑
tags: 
 - 运维
 - Linux
 - Ubuntu
date: 2021-03-30 10:02:00
updated: 2021-03-30 10:02:00
origin_url: lts-software-source
description: 用惯了Windows，今天还是第一次发现这个问题。
---

用惯了Windows，今天还是第一次发现这个问题。

<!-- more -->

## 背景

为了备份VPS上的docker挂载数据到OneDrive，赶忙安装了restic。restic既有加密又有快照恢复，真是太棒啦！

但执行到`restic -r rclone:onedrive:backupfolder init`时，突然提示：

```bash
Fatal: create repository at rclone:onedrive:backupfolder failed: invalid backend
```

一条简单的命令居然也会报错，这崩得也太快了，还没开始就结束？

## 分析

如果这里的backend是invalid的，说明rclone连接有问题。

但实测命令`rclone lsd: onedrive`，能够正常显示目录结构。连接是有效的。

## 原因

restic论坛里提到过类似问题：[restic-with-rclone][1]。

简单总结：根据源码分析，出现这个错误的原因是restic版本过时。备份到OneDrive需要使用rclone，但restic在0.9.0版本里才加入rclone支持。

被安装低版本的原因在于VPS安装的Ubuntu LTS系统，在运行`apt-get install resitc`后，安装的restic版本号是0.8.3。

对普通用户而言，单台服务器跑跑小程序、代码，没必要追求生产环境的稳定，反而应当尽量与自己的开发、测试环境保持一致，以便于复现、还原异常与报错。

## 修复

要想对各类发行版一视同仁地安装restic的最新版本，自己编译是比较稳妥的方案：

### 安装go环境

- 根据go主页的[Download and install][2]安装go环境。
- 下载官方包：
  
  ```bash
  wget https://github.com/restic/restic/releases/download/v0.12.0/restic-0.12.0.tar.gz
  ```

- 解压后执行`make`编译。

- 配置定时任务
  
  - crontab

    - 可以先把`RESTIC_PASSWORD="here is your password"`加到~/.bashrc或者~/etc/profile里
    - 之后`crontab -e`添加任务配置：

  `0 4 * * * . ~/.bashrc; /home/user/restic-0.12.0/restic       -r rclone:onedrivedb:Backup backup /home/usdata; /      home/user/restic-0.12.0/restic forget -q --prune       --keep-hourly 24 --keep-daily 7`

[1]: https://forum.restic.net/t/restic-with-rclone/2373/13
[2]: https://golang.org/doc/install
