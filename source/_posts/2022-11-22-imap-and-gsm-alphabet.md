---
title: 踩坑GSM alphabet
date: 2022-11-22 17:08:00
categories: Coding
tags: Email
---

比起计算机网络里不知考过多少遍的IMAP，[GSM alphabet](https://melroselabs.com/docs/reference/sms/gsm-alphabet/)这个概念恐怕很多人是第一次听说。一个是邮箱协议，一个是通讯标准，是一个什么样的坑能把看起来没联系的两者联系到一起去呢？

<!-- more -->

## 问题

事先声明，如果你是gmail用户，那基本不可能遇到以下问题。只有常用邮箱是QQ邮箱，手机又恰好刷了miui.eu（不确定其他miui版本是否有相同设置）的大冤种，才有几率踩这个坑。

首先，使用第三方客户端登录qq邮箱或者163邮箱，都需要手动开启邮箱的IMAP。而开启IMAP，需要发一条指定内容的短信到指定号码进行验证，以获得腾讯或网易生成的授权码。

我的163邮箱在这个环节可以正常发送、验证，但qq邮箱通过密保手机发送短信时就会弹出如下提示：

![“您发送的短信内容有误”](/images/2022-11-22-alert.PNG)

核对了多遍，也没有发现内容哪里有误

![实发短信内容无误](/images/2022-11-22-message.PNG)

## 疑惑

通过qq邮箱的[反馈建议](https://open.mail.qq.com/feedback/feedbackhome#/)提交了一个工单上去，qq对这个问题的答复是：

> 你好，出现这种情况一般有可能：用户手机终端本身没有把这个短信成功发送出来，请检查自己的手机状态是否正常，建议： 1、致电运营商客服电话，询问是否被禁止了端口短信功能/增值业务 网关（也叫做SP开关）； 2、发送短信到备用接收号码重试； 3、发送短信时去掉+86重试发送； 4、确认是否有发送扣费记录，若扣费成功，请提供【扣费记录截图】、【发送短信手机号（密保手机号）】、【发送短信时间】给我们，若没有扣费成功，请联系运营商，感谢配合！

- 第一点肯定不可能，因为我的手机刚刚还在163邮箱那边成功打开了，应该不存在这个问题；
- 第二点，实际测试了一下，也可以正常发送接收；
- 第三点，看手机的短信页面，是不带86的；
- 第四点，短信查询余额，确实有扣费。

这时变得有点像在做一道选择题，需要选出错误的选项,但所有选项看起来都是对的。

## 解决

这时候只能回过头来看选项了，感觉最大的可能还是出在+86这里。

于是去电信查询详单，号码确实有问题：

![+86](/images/2022-11-22-detail.PNG)

但手机上是没有显示+86的，那一定是有某个设置自行进行了添加。在仔细观察后我注意到了这个配置：

![GSM-alphabet](/images/2022-11-22-GSM-alphabet.jpg)

关掉这一选项并重新发送短信，验证正常通过。我想原因可能是因为在miui上使用GSM-alphabet这个选项的话，会先把号码拼接上+86再做短信的发送，所以虽然发短信时手输的号码不带+86，但查询的结果显示是加上+86的。

## 其他

在解决的过程中，我也突然想到有没可能通过安装[Foxmail](https://www.foxmail.com/)客户端来开启IMAP，得到了一个很奇怪的结果：安装完成后进入默认的登录选项，会要求手动配置IMAP，这时输入框是无法填写的灰色：这很好理解，因为邮箱设置里IMAP也是没有开启的状态，不给登录也很正常。

但是如果用qq扫码登录，无需配置便可以正常通过Foxmail客户端使用邮箱。此时通过网页端查看，邮箱的IMAP设置依然是关闭的（但不知什么原因exchange设置好像给打开了）。

虽然我解决了这个问题，但有种浪费生命的感觉：最基础设置还需要繁琐手段开启。我想我会考虑尽量解绑使用qq邮箱的账号，转为使用gmail。虽然国内的网络环境很可能继续恶劣下去，但这样的服务实在不值得继续使用。