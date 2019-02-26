---
Title: 我的第一个用户脚本
Date: 2019-02-26 09:52
Modified: 2019-02-26 16:21
Category: User Scripts
Tags: User Scripts
Slug: my-first-user-script
Authors: mykonakona
Summary: 很羞耻……
---

### 用户脚本是什么？

> "用户脚本是一段代码，它们能够优化您的网页浏览体验。安装之后，有些脚本能为网站添加新的功能，有些能使网站的界面更加易用，有些则能隐藏网站上烦人的部分内容。在 Greasy Fork 上的用户脚本都是由用户编写并向全世界发表的，您可以免费安装，轻松体验。"

这是[GreasyFork][1]上给用户脚本（user scripts）的一个定义。但这个定义可能容易让人“小看”用户脚本的用途，事实上用户脚本的使用能够大大提升用户的浏览体验。

说来很羞耻，之所以会萌生写一个用户脚本的念头，是因为JAVLib逛太多，想更方便的从感兴趣的影片页面跳转到其他站点的下载页或视频页。虽然影片的评论页面会有一些下种链接，但这类种子一般都放在某个网盘里，下载时需要等待，实在不方便。别的自动获取磁链脚本装过一些，但似乎功能过于复杂了，有些只支持Chrome下使用（但前几天逛S1时无意看到[[网络]Chrome要禁油猴了？][2]，Chrome凶多吉少？）。

于是开始找一些用户脚本编写的教程，打算自己写一个只做跳转不干其他事情的脚本。但在实际编码时我发现网上关于用户脚本编写与调试的内容都太简陋了。一些所谓的教程连如何调试用户脚本讲不清楚。有关调试基本写的都是什么“调出控制台”之类的正确的废话。就我自己而言，有些场景可能我会打日志，但多数时候我还是希望能够打断点调试的。所以我开一个坑记录我自己在编写用户脚本时遇到的一些问题，希望能给同样没什么基础却又想写一个属于自己的脚本的朋友一点点帮助。

+ 区别于普通的js文件，用户脚本文件的后缀名是.user.js。

+ 只要@namespace不变，@name是可以随意修改的。但如果用户脚本在更新版本的同时修改了@namespace，用户将因为@namespace修改的缘故无法升级到该用户脚本的最新版本。只能重新安装最新版本的脚本。所以对于开发者来说@namespace的修改还需要慎重。这一点在Greasyfork关于脚本元属性值[3]的站点帮助里也有提及:
> “@namespace 与 @name 这两个属性被作为脚本的唯一标识符，用户脚本管理器根据它们来判断一个脚本是否已安装。Sleazy Fork 也需要这些属性，若用户在更新脚本时改变了两者中的任意一项，将发出警告。”

+ 一般来说@match就可以匹配你希望脚本生效的网址，但对JavLib这种有备用地址且经常会变的网站，可以用@include与正则来匹配，前提是备用地址有一定规律（比如\w\d\d\w.com的这种组合）。

+ FF（我使用的版本是65.0.1）下安装附加组件[Omnibug][4]后就可以对用户脚本进行断点调试。

+ 以[我的第一个用户脚本][5]为例，功能其实有点类似searchEngineJump，但由于这是一个adult脚本，所以是在Sleazyfork发布而不是Greasyfork发布，因此需要勾选Adult Content选项。

未完待续……

[1]: https://greasyfork.org/zh-CN
[2]: https://bbs.saraba1st.com/2b/forum.php?mod=viewthread&tid=1810856
[3]: https://greasyfork.org/zh-CN/help/meta-keys
[4]: https://addons.mozilla.org/zh-CN/firefox/addon/omnibug/
[5]: https://sleazyfork.org/zh-CN/scripts/377603）
