Title: 一个小脚本背后的shell script细节
Date: 2018-09-28 14:30
Modified: 2018-09-28 14:30
Category: liunx
Tags: liunx, shell
Slug: a-little-learning-of-shell-script
Authors: mykonakona
Summary: Short version for index and feeds

## 0. 引子
事情的起因是因为公司目前在用的即时通讯软件里可用的表情太少，所以想导一份百度的泡泡表情进去。

看起来这玩意可以下载的地方还挺多的，但实际下载完发现下载站上的大小都偏大，于是就想是不是直接从百度贴吧里批量下载。

[![image.png](https://i.postimg.cc/W1ZrT2YR/image.png)](https://postimg.cc/mPbhSGGV)

查看元素发现表情的url还是很有规律的，不用上正则了。在shell下写脚本就够用了，很快就写好了一个：

```
!/bin/sh
if [ ! -d "./bdpao/" ]
then
   mkdir bdpao
else
   echo "folder existed"
fi
#我只想要黄脸表情，不需要其他的物件表情，所以把值设置为33
for (( i=1; i<=33; i++ ))
do
   if [ "$i" -le 9 ]
   then
       dlurl="http://tb2.bdstatic.com/tb/editor/images/face/i_f0"$i".png?t=20140803"
       wget -q "$dlurl" -O ./bdpao/0$i.png
   else
       dlurl="http://tb2.bdstatic.com/tb/editor/images/face/i_f"$i".png?t=20140803"
       wget -q "$dlurl" -O ./bdpao/$i.png
   fi
done
zip -q -r bdpao.zip ./bdpao
```


然而实际运行时发现的问题，让我意识到自己对shell script的认识仍停留在一个一知半解的阶段。

## 1. 不同的循环风格

关于shell中常用的for循环的风格，根据[Linux shell 用for循环100次的方法][1]介绍的内容主要有C风格、Python风格（使用in）及使用seq。

### 1.1. C风格

我在编写脚本时，是先用C风格的for循环实现的，本来以为直接sh bdpao.sh就可以跑，但是实际运行时报了一个这样的错：

```
bdpao.sh: 8: bdpao.sh: Syntax error: Bad for loop variable
```

stackoverflow里有人也提了类似的问题[syntax-error-bad-for-loop-variable][2]，这里的解答说的比较清楚：

The for (( expr ; expr ; expr )) syntax is not available in sh.

即是说C风格在sh是不可用的。

解决方案：可以用`bash bdpao.sh`，或者改成while循环再用`sh bdpao.sh`运行。

### 1.2. Python风格
继续试了试Python风格，sh bdpao.sh后报了和之前不一样的错：

```
bdpao.sh: 11: [: Illegal number: {1..33}
```

但换成bash可以运行，说明Python风格在sh下也不可用。

### 1.3. 使用seq
那么seq是不是也是一样呢？我把脚本修改成使用seq的形式，仍然报错了：

```
bdpao.sh: 12: [: Illegal number: seq 1 33
```

不仅如此，bash bdpao.sh时，继续报错：

```
./bdpao.sh: line 12: [: seq 1 33: integer expression expected
```

为什么会这样呢，难道sh和bash都不支持seq，那为什么还有很多shell的教程里用seq做循环？

原来这里我犯了一个最大的错误，但也是小白最大的陷阱，就是是'与`的区别，我在一知半解下把反引号当成单引号！但这两者意义完全不同。

据[(())与()还有${}差在哪？][3]在bash shell中, \$()与\`\`(反引号)都是用来做命令替换(command substitution)的。所谓的命令替换是通过完成\`\`或者$()里面的 命令，将其结果替换出来，再重组命令行。例如：

```
$ echo the last sunday is $(date -d "last sunday" +%Y-%m-%d)
```
将'改正为`后，用sh命令和bash命令都可以运行。

## 2. sh，./，还是bash？
问题好像是解决了，但之前看《UNIX/Linux/OS X中的Shell编程（第4版）》里讲循环的章节，都是在shell下使用类似`for  i in {1..33}`形式的循环写法。我在自己的linux试了一下也是可以，为什么把内容写进.sh文件里就会有这些问题？执行.sh脚本的时候，什么时候应该用sh，什么时候应该用bash？

[what-is-the-purpose-of-the-sh-command][4]中有朋友解答了这一疑问：使用sh命令的目的是通过这一命令来指定运行环境。这种C风格、Python风格的for循环可以在shell下直接使用的原因是，大部分系统默认使用的shell是/bin/bash，这一点可以通过[查看当前使用的shell][5]来验证。

通过`echo $SHELL`可以发现系统默认的shell是/bin/bash，通过`echo $$`查当前shell的进程号，结果如下：

```
mint64@mint64-virtual-machine ~/Documents $ echo $$
2265
mint64@mint64-virtual-machine ~/Documents $ ps -ef | grep '2265'
mint64     2265   2258  0 Sep26 pts/6    00:00:01 bash
mint64    44980   2265  0 15:56 pts/6    00:00:00 ps -ef
mint64    44981   2265  0 15:56 pts/6    00:00:00 grep --color=auto 2265
```

当前系统使用的也确实是bash，这种通过查shell进程号确认当前使用shell的操作可以通过grep与awk的组合来做：

```
ps | grep $$ | awk '{print $4}'
```
### 2.1. 三种情况
那么我们究竟应该如何选择shell脚本的执行命令呢？据[difference-between-and-sh-in-unix][6]的解答，使用sh file格式执行shell script时会新建一个shell进程，使用. file格式时是在当前的shell进程中执行shell脚本文件，而使用./file则是在当前目录下执行文件。

解答中还很贴心的举例说明了这三种情况，如果有一个名为test.sh的shell脚本文件，其内容为：

```
#!/bin/sh

TEST=present
```
使用`sh test.sh`执行时，会运行一个新的sh，然后把脚本里的变量在这个sh中定义，最后退出。因此退出后如果用`echo $TEST`将没有结果输出，因为这个变量仅在`sh test.sh`时使用的sh里，在外部的shell不存在。

如果用`. test.sh`执行，`echo $TEST`可以输出present的结果，因为这种方式是在当前的shell中执行shell脚本文件，而不是像`sh test.sh`一样新建一个sh。

如果用`./test.sh`执行，这时#!/bin/sh被检测，等价于`/bin/sh ./test.sh`。

即是说，如果不需要指定运行环境的情况下，shell脚本文件的头部不加[shebang][7]的内容也是可以的。

## 3. 小结
现在网上不少教程只告诉你怎么做，并不会告诉你是为什么，所以网上搜到的海量内容不等同于自己的知识，只有甄别、消化乃至加工后的内容才能称得上是真正掌握。

最后，从需求入手永远是学习技术最快的一种方式。

[1]: https://blog.csdn.net/wr339988/article/details/70768499    "Linux shell 用for循环100次的方法"
[2]: https://stackoverflow.com/questions/30358065/syntax-error-bad-for-loop-variable    "syntax-error-bad-for-loop-variable"
[3]: http://wiki.jikexueyuan.com/project/13-questions-of-shell/eight.html    "(())与()还有${}差在哪？"
[4]: https://superuser.com/questions/408890/what-is-the-purpose-of-the-sh-command    "what-is-the-purpose-of-the-sh-command"
[5]: https://www.cnblogs.com/softwaretesting/archive/2012/02/14/2350688.html    "查看当前使用的shell"
[6]: https://stackoverflow.com/questions/22087378/difference-between-and-sh-in-unix    "difference-between-and-sh-in-unix"
[7]: https://zh.wikipedia.org/zh-hans/Shebang    "Shebang"
