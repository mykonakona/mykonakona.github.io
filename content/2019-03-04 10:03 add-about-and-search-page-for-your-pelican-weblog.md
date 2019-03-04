---
Title: [Pelican]给博客加about与search页
Date: 2019-03-04 10:03
Modified: 2019-03-04 10:03
Category: Pelican
Tags: Pelican
Slug: add-about-and-search-page-for-your-pelican-weblog
Authors: mykonakona
Summary: 最近的更新
---

pelican里如果不做特别的设定的话，一般会有tags、categories、archives页，但不会有about页，有些主题会在页面顶部或其他位置放一个标为search的input元素，但直接输入搜索一般是无效的，需要配置对应的插件后才能生效。

## 1.添加about页：
基本上通用的做法是在content里新建一个pages目录，之后在pages目录下新建一个About.md，最简单的：
```
title: About
slug: about
date: 2019-03-01 14:20
This is mykonakona.
```
pelican会把pages目录下的.md都生成为静态页面。
然后在pelicanconf.py里加配置项,这里可以这样配置：
```
PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}/index.html'
```

## 2.添加search页：
这里涉及到一个主题和插件的选择，现在最简单的方式是用`tipue_search`插件。这个插件的README里主要推荐了两个主题，其中一个是elegant。
有关search页的最简要的配置基本如下:
```
DIRECT_TEMPLATES = (('index', 'tags', 'categories','archives', 'search', '404'))  
PLUGIN_PATHS = ['plugins']
PLUGINS = ['tipue_search']
```

为了配合`PlUGIN_PATHS`的路径，需要在`.travis.yml`的`script`里补上：
```
script:
- git clone --depth 1 https://github.com/mykonakona/pelican-plugins plugins
```
这里一般推荐从官方插件仓库fork过来一个，这样后续涉及到对插件做自定义时也会方便一些。
