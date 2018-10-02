Title: Liunx Shell Scripting Solutions笔记 1.1 printing in the terminal
Date: 2018-10-02 15:30
Modified: 2018-10-02 15:30
Category: liunx
Tags: liunx, shell
Slug: printing-in-the-terminal
Authors: mykonakona
Summary: Note of Liunx Shell Scripting Solutions 1.1 printing in the terminal

## 1. echo
### 1.1. 基本用法
echo是terminal中最常用的打印命令之一。
```
$ echo "text"
$ echo 'text'
$ echo text
```
都可以得到相同的输出。
 
### 1.2. 输出特殊符号
特殊符号，如exclamation mark（感叹号）的输出：
```
$ echo "cannot include exclamation - " !" within double quotes"
```
会得到一个
```
-su !": event not found
```

因此需要通过\进行转义，可修改为：
```
$ echo "cannot include exclamation - " \!" within double quotes"
```

下面三种方式都能够在terminal中得到相同的输出：
```
echo Hello world !
echo 'Hello world !'
echo "Hello world "\!""
```

### 1.3. ;的意义
在命令行中输入：
```
$ echo hello; hello
```
时，会将;后的hello识别为另一个命令。


### 1.4. -e
```
$ echo "1\t2\t3"
$ echo -e "1\t2\t3"
```

### 1.5. 使用echo输出带颜色的内容
常用输出字体的color code有：black 30 red 31 green 32 yellow 33 blue 34 white 37
```
echo -e "\e[1;31m This is red text \e[0m"
```
`\e[1;31m`将echo输出的字体颜色设置成红色，`\e[0m`将其设置回原来的颜色。

常用输出底色的color code有：black 40 red 41 green 42 yellow 43 blue 44 white 47
```
echo -e "\e[1;42m Green Background\e[0m"
```

## 2. printf
另一个用于输出的命令是printf，下面的脚本中使用了printf的一些基本功能：
```
#!/bin/bash
#Filename: printf.sh

printf "%-5s %-10s %-4s\n" No Name Mark
printf "%-5s %-10s %-4.2f\n" 1 Sarath 80.3456
printf "%-5s %-10s %-4.2f\n" 2 James 98.9989
printf "%-5s %-10s %-4.2f\n" 3 Jeff 77.564
```
dash(即-）表示输出左对齐，如果不加-，表示输出右对齐。
dot 2(即.2）running off，精确到2位小数
slash n（即\n）换行符
