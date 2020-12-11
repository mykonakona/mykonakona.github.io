---
title: 如何解决智冠版天龙八部等繁体Windows老游戏在Win10下的乱码问题
date: 2020-12-08 16:45:00
categories: game
tags: VPS 
---

这个问题早已有之，早期的解决方案是安装AppLocale等软件进行转码，但上述软件目前在Win10环境下基本全部失效。

<!-- more -->

以智冠版天龙八部为例，在目前可以搜索到的相关资源贴中给出了两种解决方案：

- 方案一：修改配置文件，并“把XP到WIN10区域与语言切换到繁体”

- 方案二：使用游戏转码大师（见下图）

![yxzmds](https://www.ppxclub.com/forum.php?mod=attachment&aid=OTc5Nzk3fDQxYjljYmIwfDE2MDc0MTgxNTR8NjEwMjE3fDcwMDc5OA%3D%3D)

```
方案一在每次玩游戏时都需要修改区域与语言，相当麻烦。

方案二则有两个问题：

一、这个软件年久失修，目前已经很难鉴别网络上可下载的版本中哪个是可靠的；

二、笔者下载了诸多版本，在目前的Win10环境统统会报毒，于是没有再继续通过虚拟机或者沙盒尝试使用了，有兴趣的朋友可以试下。
```

因此这里介绍一个新的解决方案给有老Windows游戏游玩需求却又苦于乱码问题的玩家：使用[Locale Emulater](https://pooi.moe/Locale-Emulator/)。

根据介绍，这个工具开发的目的主要是为了解决日文AVG在中文环境下游玩的乱码问题，但经本人实测对繁中版游戏的乱码问题也能完美解决。

该软件完成安装后，会在右键菜单中添加Locale Emulater选项，使用方式为右键游戏程序，在菜单中以此点击“Locale Emulater”、“修改此程序的配置”，会弹出下方窗口。

![bh.PNG](https://i.loli.net/2020/12/11/VefS94ma62C3vPb.png)

对繁中游戏，调整“预置配置”与“时区”即可，保存后可以通过“建立快捷方式”，将调整配置后的快捷方式生成到桌面，便于下次调用。

实测截图如下，Win10下可正常显示智冠版天龙八部，开始畅玩吧！

![dragontc.png](https://i.loli.net/2020/12/11/gCJLtSaiIA34Exv.png)