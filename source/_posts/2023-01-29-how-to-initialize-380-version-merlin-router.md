---
title: 380版本梅林固件路由器初始化指南
date: 2023-01-29 10:28
categories: Digital
tags: Router
---

家里的R7000已经服役了6年，当时费了老大劲刷好的梅林，固件号也伴随koolshare的各种骚操作停滞在了380版本。尽管如此，只需要一些基础配置，还是足以让这套设备在今天完成包括拨号、端口转发、科学上网等刚需。所以我记录下一些基础步骤，也是为了避免因为维修硬重置路由器后遗忘如何配置的情况发生。

<!-- more -->

## 一种常见的故障及原因

这次之所以需要硬重置路由，是因为我在调整路由器天线时可能误触到了wps按钮，造成路由器无法连接至后台页面，2.4g和5g指示灯也不再闪烁。此前为了使用一个老式摄像头设备，通过后台开启过一次wps，印象中当时也造成了路由器死机。虽然缺乏更进一步的证据，但对比两次故障的相似程度，我仍然倾向于故障原因为这个版本的wps功能不完善，造成功能开启后的死机。

## 硬重置方法

因为此时已经无法进入后台了，最简单的硬重置方法就是在开机状态下使用卡针按住路由器后方的reset按钮30秒左右后松开，为避免变砖可能还需要[断电30秒后再插电30秒][1]，但我之前没有遵循该步骤

## 设置连接名称密码

重置后路由器连接名称会变会Netgear，因为后续要使用smart connect，所以在连接后进入的设置向导页面只需要考虑一下管理员名称和密码的设置，wifi连接名称和密码建议只需要使用默认的就好（默认密码：00000000）。

向导完成后，连接wifi并访问：`http://router.asus.com/Main_Login.asp`

登入后可以先进入外部网络选项卡，打开smart connect开关，此时使用的wifi名称在保存应用后将不再区分2.4g和5g，而是根据smart connect rule进行切换，这部分的设置可以参考[华硕路由器Smart Connect原理解析与硬核设置指南][2]。

对于此前联系过运营商做过桥接改造的用户来说，还需要在外部网络选项卡将拨号选为PPPOE，并在PPP处填入运营商提供的用户、密码。

## 解除软件中心限制

此时路由器已经可以正常访问网络，但如果想要科学上网，需要先根据路由器提示打开jffs的一个权限选项，再打开路由器的ssh功能，执行命令

```bash
sed -i 's/\tdetect_package/\t# detect_package/g' /koolshare/scripts/ks_tar_install.sh
```

[解除软件中心的安装限制][3]。或使用[其他方式][4]（如安装[fuckkoolshare.tar.gz][5])。

## 安装clash

如果还在使用ss的用户，可以尝试寻找旧版本ss并安装。目前比较流行的方式是安装merlin clash，它使用能够兼容xray的clash-meta内核，如果此前使用过clash for windows等，只需要将规则配置文件修改为能够通过校验的格式并上传即可。

## 端口转发

PT需要端口转发，可参考[华硕Merlin梅林路由Synology群晖不能外网访问的踩坑记录][6]进行配置。

## 配置导出

最后为避免重复劳动，建议做一次配置及jffs的导出并备份在其他可靠位置。

[1]: https://www.right.com.cn/forum/thread-8267551-1-1.html "网件R7000捅菊花变砖"
[2]: https://zhuanlan.zhihu.com/p/370147768 "华硕路由器Smart Connect原理解析与硬核设置指南"
[3]: https://hq450.github.io/fancyss/ "fancyss - 科学上网"
[4]: https://www.bilibili.com/read/cv9729050 "Koolshare 软件中心离线安装限制 解除"
[5]: https://t.me/s/SukkaChannel?q=fuckkoolshare.tar.gz "解除 Koolshare 酷软中心 的离线安装限制的插件"
[6]: https://cloud.tencent.com/developer/article/1624139 "华硕Merlin梅林路由Synology群晖不能外网访问的踩坑记录"
