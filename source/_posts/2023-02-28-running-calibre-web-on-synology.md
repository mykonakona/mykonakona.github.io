---
title: 群晖nas搭建calibre-web勘误
date: 2023-02-28 18:56:09
categories: Digital
tags: [TV-Series, subtitle]
---

目前网上有一篇较详细的名为[“群晖nas搭建个人图书馆”][1]的calibre-web搭建教程。该教程的原始版本存在一些笔误并缺失一些关键问题的解决。作者似乎已经对其中的一些错误进行了修正，但考虑到搜索结果中还有存在着一些[原版本的内容流传][2]，这里还是不厌其烦的列出以下内容以供读者参考。

<!-- more -->

## GUID的笔误

首先，初始化容器时填写的环境变量不是PUID、GUID，而是PUID、PGID。

## 原PUID及PGID配置引起上传时报“attempt to write a readonly database”

此处问题与PUID及PGID的值有关，原文设置为`$(id -u)`和`$(id -g)`，观察容器日志：

```bash
groupmod: invalid group ID '$(id -g)'
usermod: invalid user ID '$(id -u)'
```

可知这种写法也会提示非法。

因此个人建议还是老老实实打开群晖的ssh功能，本地连接后运行`id`命令获取实际的PUID和PGID。填写实际获取到的id后不再出现该报错提示。

## 缺少必需挂载的文件夹引起上传时报“无法保存到临时目录”

在完成PUID和PGID配置后，除`/books`及`/config`外，还需要额外挂载`/tmp`和`/upload`两个文件夹。否则无法上传书籍。此处原理可参考[reddit][3]。

[1]: https://www.lategege.com/?p=639
[2]: https://zhuanlan.zhihu.com/p/544504281
[3]: https://www.reddit.com/r/Calibre/comments/odgkb1/error_when_uploading_via_calibreweb/
