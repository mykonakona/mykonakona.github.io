---
title: 抖音自动点赞
date: 2020-11-16 16:04:00
categories: Coding
tags: android
---

因为一些主播会把点赞达到多少万作为一项指标，自己又懒得点，所以想把这个工作给自动化。

现在可以搜到的实现基本都是基于adb的，这是一个简陋的整合了相关资料的win下的教学。

其原理为：直接使用adb的点击事件速度会不够快，可以通过记录用户操作再输出的方式模拟在dy主播界面快速点击的行为。

<!-- more -->

1. 下载一个安卓模拟器（本文使用夜神模拟器）并安装，完成安装后在模拟器内安装dy，登录已经关注主播的抖音账号，并进入直播页面

2. 通过命令行进入nox_adb.exe所在目录（命令为默认安装位置）：cd "C:\Program Files (x86)\Nox\bin\"

3. 进入夜神模拟器的adb shell：nox_adb shell

4. 进入shell后，准备记录输入操作到一个新建的recordtap文件内：dd if=/dev/input/event5 of=/sdcard/recordtap，具体是event5或其他（如event1等）可在shell中通过getevent命令查询

5. 回到模拟器的直播页面，在屏幕上重复快速点击

6. 退出adb shell（如快捷键无效，可关掉命令行窗口后重开）

7. 重新进入adb shell，直接写成一个死循环，运行命令：    
    
    i=1; while [ i -gt 0 ];  do dd if=/sdcard/recordtap of=/dev/input/event5;sleep 5; done
   
8. 多开时直接执行nox_adb shell会报 error: more than one device and emulator，这时需要先nox_adb devices查看当前有设备与模拟器：

    C:\Program Files (x86)\Nox\bin>nox_adb devices
    List of devices attached
    127.0.0.1:62025 device
    127.0.0.1:62001 device
    
9.  在执行adb命令时，为命令指定设备的序列号`nox_adb -s 127.0.0.1:62025 shell`

说明：

使用夜神安卓模拟器的ADB指令时，需要将adb改为nox_adb，如nox_adb devices对应adb devices，nox_adb shell对应adb shell。

参考：

https://www.jianshu.com/p/7c565eab821d

https://blog.csdn.net/gaojinshan/article/details/9455193

https://www.yeshen.com/faqs/ByPpRoflZ
