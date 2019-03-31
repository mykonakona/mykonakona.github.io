---
Title: [Spider]jhao104/proxy_pool使用教程
Date: 2019-03-30 19:22
Modified: 2019-03-30 19:22
Category: Spider
Tags: Network, Spider
Slug: tutorial-of-jhao104's-proxy_pool
Authors: mykonakona
Summary: 记录一下怎么用jhao104/proxy_pool
---
## 背景：
爬虫（spider）的目的大多是为了从特定网站上爬取我们所感兴趣的数据。但不是所有站点都欢迎这类数据爬取的行为，一种比较常见的反爬虫策略是屏蔽一段时间内多次访问站点的某个ip。为了突破这类反爬策略对单机爬取数据的限制，一种方法是维护一个代理池（proxy pool），通过使用不同的代理来规避网站的检测。jhao104/proxy_pool是Github上在国内使用比较多的一个代理池项目，这次主要记录一下从头开始建一个jhao104/proxy_pool的过程。

## 环境准备工作：

使用操作系统为：Linux Mint 19.1 "Tessa" - Xfce (64-bit)

[安装git（Debian/Ubuntu）][1]
```
For the latest stable version for your release of Debian/Ubuntu
$ apt-get install git

For Ubuntu, this PPA provides the latest stable upstream Git version
$ add-apt-repository ppa:git-core/ppa # apt update; apt install git
```

[安装pip（Debian/Ubuntu）][2]
```
Python 2:
$ sudo apt install python-pip

Python 3:
$ sudo apt install python3-venv python3-pip
```

安装virtualenv（Python3版本）
```
$ pip3 install virtualenv
```

[Creating virtual environments（Python3版本）][3]
```
Python3:
$ python3 -m venv /path/to/new/virtual/environment
```

安装gcc（用于后续SSDB的编译）
```
$ sudo apt-get instll gcc
```

安装SSDB[（以下引自项目文档）][4]
```
$ wget --no-check-certificate https://github.com/ideawu/ssdb/archive/master.zip
$ unzip master
$ cd ssdb-master
$ make
optional, install ssdb in /usr/local/ssdb
$ sudo make install
```

安装jhao104/proxy_pool[（以下引自项目文档）][5]
```
下载源码:
$ git clone https://github.com/jhao104/proxy_pool.git

建议这里先去激活新建的python虚拟环境：
$ cd /path/to/new/virtual/environment
$ cd bin
$ source activate

安装依赖:
$ pip install -r requirements.txt
```

## 启动:
step1. 修改配置文件使jhao104/proxy_pool与SSDB使用的端口号一致。

step2. 启动SSDB[（以下引自项目文档）][4]
```
start master:
$ ./ssdb-server ssdb.conf

or start as daemon:
$ ./ssdb-server -d ssdb.conf
```

step3. 启动jhao104/proxy_pool[（以下引自项目文档）][5]

如果你的依赖已经安全完成并且具备运行条件,可以直接在Run目录下运行main.py:
```
$ python main.py
```

如果运行成功你应该看到有4个main.py进程。

你也可以分别运行他们:
依次到Api下启动ProxyApi.py，Schedule下启动ProxyRefreshSchedule.py和ProxyValidSchedule.py即可。

## 验证:
示例脚本get_status.py（通过api访问http://127.0.0.1:5010 查看当前代理池可用代理数）
```
import requests
print(requests.get("http://127.0.0.1:5010/get_status/").content)
```
如在terminal中打印出当前的raw代理数和useful代理数，表示jhao104/proxy_pool已搭建成功:-)

[1]: https://git-scm.com/download/linux "安装git（Debian/Ubuntu）"
[2]: https://packaging.python.org/guides/installing-using-linux-tools/#installing-pip-setuptools-wheel-with-linux-package-managers "安装pip(Debian/Ubuntu)"
[3]: https://docs.python.org/3/library/venv.html "Creating virtual environments（Python3版本）"
[4]: http://ssdb.io/zh_cn/ "（以下引自项目文档）"
[5]: https://github.com/jhao104/proxy_pool  "（以下引自项目文档）"
