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

pelican里如果不做特别的设定的话，一般会有tags、categories、archives页，但不会有about页，


## 先说加about：
基本上通用的做法是在content里新建一个pages目录，之后在pages目录下新建一个About.md，最简单的：
```
title: About
slug: about
date: 2019-03-01 14:20
This is mykonakona.
```
pelican会把pages目录下的.md都生成为静态页面。
然后在pelicanconf.py里加配置项,这里可以这样配置的：
```
PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}/index.html'
```

## 再说加search：
这里涉及到一个主题和插件的选择，应该说现在最简单的方式用tipue_search插件，这个插件在介绍页面介绍了两个主题，其中一个是elegant。
```
DIRECT_TEMPLATES = (('index', 'tags', 'categories','archives', 'search', '404'))  
PLUGIN_PATHS = ['plugins']
PLUGINS = ['tipue_search']
```
基本上这么配置就可以了，因为加了`PlUGIN_PATHS`，所以还需要在`.travis.yml`的`script`里补上：
```
script:
- git clone --depth 1 https://github.com/mykonakona/pelican-plugins plugins
```
