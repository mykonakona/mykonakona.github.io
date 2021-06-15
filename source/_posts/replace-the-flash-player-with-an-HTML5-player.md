---
title: 使用用户脚本将Flash播放器替换为HTML5播放器
date: 2019-04-29 14:38
categories: Coding
tags: Userscript
---

做这个东西的动机其实是为了刷48的公演直播，本来一直在b站上看是没有问题的。但看这个月的n队N.E.W公演的那天，b站不知为何没有直播源了……

<!-- more -->

也来不及搞清楚没有源这个事情是不是又是丝芭想搞闭环，总之当时除了模拟器登口袋，好像电脑上刷直播的方法就只剩在live.48.cn上看。

然后live48不出意料地还在用flash，我的火狐进去之后就是一块白板。虽然最后临时用CentBrowser刷了一下公演，但毕竟不是我的主力浏览器，刷完之后就莫名地感觉不爽……

扒了扒greasefork，这方面脚本还是比较多的。找了一个用了dplayer的脚本[dilidili flash to html5 fix](https://greasyfork.org/zh-CN/scripts/378188-dilidili-flash-to-html5-fix)开始抄。抄的过程中就感觉：如果只考虑满足最基本的需求，基本上还在使用Flash播放器的视频站都可以采用这个思路通过加载用户脚本做h5播放器的替换。

## 开始：

+ 在head或者body加载dplayer的类库和hls的类库。
+ 触发window.onload后，清空原播放器div下的子元素，append一个新div进去用于新播放器的使用。
+ 写一个dplayer的构造函数，配好从原页面提取的视频url、视频类型为hls等配置项即可。

最后的结果可见[live48 html5 player](https://greasyfork.org/zh-CN/scripts/382316)。
