---
Title: [Pelican]优化我的Pelican博客配置
Date: 2019-02-27 11:09
Modified: 2019-02-28 16:42
Category: Pelican
Tags: Pelican
Slug: promote-conf-of-my-pelican-weblog
Authors: mykonakona
Summary: 优化我的Pelican博客配置。
---

最近主要解决了配置上三个问题。

###1.之前我的文章构建完都是堆在根目录下，数量多了就显得很杂乱，根据对应时间做检索也困难。

**已解决**：pelican其实有配置项可以让文章存到按指定规则生成的目录下。比如在pelicanconf.py加上下面的内容：

```
# @see http://docs.getpelican.com/en/3.5.0/settings.html#url-settings
ARTICLE_URL = '{date:%Y}/{date:%m}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'
```

以这篇文章为例，在发布后你可以mykonakona.github.io的master分支下的`2019/02/27/fix-bugs-of-my-pelican-weblog`目录找到渲染后的页面（index.html)，它的url为:
https://mykonakona.github.io/2019/02/27/fix-bugs-of-my-pelican-weblog/，和设置也可以对应起来。

###2.构建时常看见Travis CI的job log有下面的WARNING信息：

```
$ make publish
pelican /home/travis/build/[secure]/[secure].github.io/content -o /home/travis/build/[secure]/[secure].github.io/output -s /home/travis/build/[secure]/[secure].github.io/publishconf.py 
WARNING: %s usage in CATEGORY_FEED_ATOM is deprecated, use {slug} instead.
WARNING: Feeds generated without SITEURL set properly may not be valid
WARNING: Docutils has no localization for 'zh'. Using 'en' instead.
Done: Processed 6 articles, 0 drafts, 0 pages, 0 hidden pages and 0 draft pages in 0.64 seconds.
The command "make publish" exited with 0.
```

**已解决**：不去改其实也没事，但还是忍不住去改了。前两条光看内容似乎是CATEGORY_FEED_ATOM配置有问题，可能需要把FEED相关的配置都改一改。但打开pelicanconf.py一看有点怪：

```
# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
```

这时候回忆起来基本上都是默认，没做什么特别修改，十分困惑为什么有这个提示出来。

仔细查了查，发现其实publishconf.py是继承自pelicanconf.py（这点还是看到一个[issue][1]后才注意到的，捂脸），publishconf.py里关于FEED的选项也改成None就不会弹出提示了，但后面还是考虑要把订阅加上的。（这点也提醒大家在做这类静态博客的gernerater选型时还是要关注一下语言，如果熟悉js用hexo可能就好很多，可以节省很多时间。）

最后一条似乎是配置里的`Default_Lang`没有`zh`，就改回`en`了，懒。

###3.自动构建完之后，master分支里除了一个index.html还会有一个index2.html，author目录下除了一个mykonakona.html外还会有一个mykonakona2.html。

**已解决**：其实这不算问题，因为pelican默认就是这样设置的（见[using-pagination-patterns][2]），比如设置的`DEFAULT_PAGINATION`设的值是5，然后到了第6篇文章的时候就会在index.html之外再生成一个index2.html。所以如果文章比较多又不希望仓库里有太多这种类型的html（这是什么奇怪需求？？？），可以把`DEFAULT_PAGINATION`的调小一点，或者参考[using-pagination-patterns][2]设置`PAGINATION_PATTERNS`。

[1]: https://github.com/getpelican/pelican/issues/1419
[2]: https://docs.getpelican.com/en/stable/settings.html#using-pagination-patterns
