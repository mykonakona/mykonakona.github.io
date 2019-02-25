---
Title: 批量telnet端口的powershell脚本
Date: 2019-02-14 16:05
Modified: 2019-02-14 16:05
Category: Windows
Tags: Windows, Powershell, Network
Slug: a-powershell-script-to-telnet-amount-of-remote-ports
Authors: mykonakona
Summary: 这篇16年左右写的，先占个坑，后面再调格式8。
---

##前言
这篇16年左右写的，先占个坑，后面再调格式8。


##背景
工作时经常需要测试生产机与终端机间的网络是否打通。由于生产机器数量较多，在登录每台终端机时手动telnet测试端口是否打通的方式会消耗较多时间。在这一背景下，产生了使用脚本自动完成该部分工作的需求。
在stackoverflow上也有人提出了类似的问题[Automate Telnet Port Testing On Windows 7 Using Batch Script](https://stackoverflow.com/questions/20583686/automate-telnet-port-testing-on-windows-7-using-batch-script) 
对于操作系统为Windows7的终端机，可以通过编写powershell脚本的方式完成这一任务。以下脚本在该问题答案的基础上，将逐个输入ip及端口进行测试的方法，修改为逐行读取预先准备的文本文档参数的方式。
##脚本内容
```
#powershell ExecutionPolicy Bypass
#powershell -File ./t2.ps1

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
##端口及地址的列表文件示例
路径 `C:\iplist.txt` 的文件内容大致如下：
```
127.0.0.1 8080
127.0.0.1 80
```
##脚本的执行
执行该脚本前，将准备好的iplist.txt放到指定路径下（文中指定的路径为C:\iplist.txt），再回到powershell下输入以下命令以获得执行权限。
```
powershell ExecutionPolicy Bypass
```
获得权限后，输入如下指令执行该脚本文件。
```
powershell -File ./t2.ps1
```
##小结
该脚本主要包括三部分工作：
1. 读入准备好的iplist.txt文件
2. 使用正则逐行取出需要测试的ip及端口号
3. 将取出的ip和端口号填入System.Net.Sockets.TcpClient函数中并测试对应的ip及端口
其中不同于一般正则的地方的是`?<alp>`，这部分较通俗的解释可见：
[PowerShell中正则表达式的运用](http://blog.csdn.net/bluelilyabc/article/details/17119819)
