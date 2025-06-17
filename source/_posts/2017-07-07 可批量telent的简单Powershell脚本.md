---
title: 可批量telent的简单Powershell脚本
author: mykonakona
category: 教程
tags: 
 - 运维
 - Windows
 - Powershell
date: 2017-07-07 15:19:09
updated: 2017-07-07 15:19:09
origin_url: powershell-telnet-script
description: 用于验证网络打通，顺便熟悉Powershell语法。
---

主要用于验证网络打通，顺便熟悉Powershell语法。

<!--more-->

## 背景

Win环境下可以通过Powershell便捷地进行一些批量操作，如telnet一系列的对端机器。类似问题可见：

[Automate Telnet Port Testing On Windows 7 Using Batch Script][1]

## 实现

```powershell
#powershell ExecutionPolicy Bypass
#powershell -File ./telnet.ps1

$iplist = Get-Content C:\iplist.txt
$regH = "\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b"
$regP = "\s(?<alp>\d{1,5})"
$remoteHost = ""
$Port = ""
foreach ($i in $iplist){
    if($i -match $regH){
        $remoteHost = $Matches[0];
        #write-host "$remoteHost";
    }
    if($i -match $regP){
        $Port = $Matches.alp;
        #write-host "$remotePort";
    }

    try {
        $socket = new-object System.Net.Sockets.TcpClient($remoteHost, $port)
    } catch [Exception] {
        write-host $remoteHost":"$port "Unconnected`n"
       #write-host $_.Exception.GetType().FullName
       #write-host $_.Exception.Message
        continue
    }
    write-host $remoteHost":"$port "Connected`n"
}
```

其中不同于一般正则的地方的是`?<alp>`的添加，这部分较通俗的解释可见：
[PowerShell中正则表达式的运用][2]

## 执行

执行该脚本前，将准备好的iplist.txt放到指定路径下（文中指定的路径为C:\iplist.txt），内容大致如下：

```text
127.0.0.1 8080
127.0.0.1 80
```

再回到powershell下输入以下命令以获得执行权限。

```bash
powershell ExecutionPolicy Bypass
```

获得权限后，输入如下指令执行该脚本文件。

```bash
powershell -File ./telnet.ps1
```

## 小结

该脚本主要包括三部分工作：

1. 读入准备好的iplist.txt文件；
2. 使用正则逐行取出需要测试的ip及端口号；
3. 将取出的ip和端口号填入System.Net.Sockets.TcpClient函数中并测试对应的ip及端口。

[1]: https://stackoverflow.com/questions/20583686/automate-telnet-port-testing-on-windows-7-using-batch-script
[2]: http://blog.csdn.net/bluelilyabc/article/details/17119819
