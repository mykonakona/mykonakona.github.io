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

## 环境：
LinuxMint_x64_xfce

##准备工作：

### [安装git（Debian/Ubuntu）][1]
```
#For the latest stable version for your release of Debian/Ubuntu
$ apt-get install git
#For Ubuntu, this PPA provides the latest stable upstream Git version
$ add-apt-repository ppa:git-core/ppa # apt update; apt install git
```

###(可选）安装vim
```
$ sudo apt-get install vim
```

###安装pip(Debian/Ubuntu)
```
#Python 2:
$ sudo apt install python-pip

#Python 3:
$ sudo apt install python3-venv python3-pip
```

###安装virtualenv（Python3版本）
```
$pip3 install virtualenv
```

###Creating virtual environments（Python3版本）
```
#Python3:
python3 -m venv /path/to/new/virtual/environment
```

###安装gcc（用于后续SSDB的编译）
```
$ sudo apt-get instll gcc
```

安装SSDB
```
wget --no-check-certificate https://github.com/ideawu/ssdb/archive/master.zip
unzip master
cd ssdb-master
make
# optional, install ssdb in /usr/local/ssdb
sudo make install
```

安装proxy_pool
```
下载源码:
$ git clone https://github.com/jhao104/proxy_pool.git
#建议这里先去激活新建的python虚拟环境
$ cd /path/to/new/virtual/environment
$ cd bin
$ source activate
#安装依赖:
$ pip install -r requirements.txt
```

[1]: https://git-scm.com/download/linux "安装git（Debian/Ubuntu）"
