---
title: restic使用onedrive的贴士
date: 2021-03-30 10:02:00
categories: Coding
tags: VPS 
---

太长不看版：推荐使用restic提供的offical binary自己编译。

<!-- more -->

# 问题

我们在通过docker使用Bitwarden之类的应用时，一般会把它的数据库等等文件挂在到本地的一个位置，这时候可以通过restic来备份VPS上的这部分数据到网盘，既有加密又有快照恢复，使用resitc就是看中了这些功能。

但在使用过程中也还是不出意外地出现了各种问题，这里记录一个我自己最开始碰到的：我希望通过restic将挂载出来数据备份到我自己的onedrive里。现在restic的onedrive备份需要通过rclone。rclone连接onedrive是没有问题的,但在执行`restic -r rclone:onedrive:Backup init`（onedrive、Backup分别为我自定义的remote和folder名）时会报`Fatal: create repository at rclone:onedrive:Backup failed: invalid backend`错误。

如果这是一个invalid的backend，那么说明我们rclone的连接有问题，`rclone lsd: onedrive`应该是不能正常显示目录结构的，但实际经过测试没有发生这个情况。

# 原因

最后爬restic的论坛发现了同样问题的一个讨论贴：[restic-with-rclone](https://forum.restic.net/t/restic-with-rclone/2373/13)。solution的这位老兄为了解答还去搜了源码，发现如果确实是`restic -r rclone:onedrive:Backup init`这个命令的形式，执行时会无法通过打印"invalid backend"的这条报错信息的判断条件，所以当前版本执行这一命令不会出现问题，有可能是restic版本过时。

两相对照后，也是被自己蠢笑了，当时无脑`apt-get install resitc`，没有考虑到现在VPS上的系统版本是UBuntu的LTS版本。导致我在VPS安装的restic的这个版本是0.8.3，而根据讨论贴里的信息，restic在0.9.0版本里才加入rclone支持。

# 解决

因此需要重装一下restic，我的步骤是先根据go主页的[Download and install](https://golang.org/doc/install)安装好go环境，之后再通过`wget https://github.com/restic/restic/releases/download/v0.12.0/restic-0.12.0.tar.gz`下载官方的包，解压后再执行`make`去编译。编译完成后生成的可执行的restic文件就可以正常使用了。

如果需要配置定时任务，可以用crontab或者systemd。crontab的话可以先把`RESTIC_PASSWORD="here is your password"`加到`~/.bashrc`或者`~/etc/profile`里，之后在`crontab -e`添加任务配置：
```
0 4 * * * . ~/.bashrc; /home/user/restic-0.12.0/restic -r rclone:onedrivedb:Backup backup /home/user/data; /home/user/restic-0.12.0/restic forget -q --prune --keep-hourly 24 --keep-daily 7
```