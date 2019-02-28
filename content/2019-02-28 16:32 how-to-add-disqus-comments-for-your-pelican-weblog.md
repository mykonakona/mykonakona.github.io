---
Title: [Pelican]博客优化之添加disqus评论
Date: 2019-02-28 16:32
Modified: 2019-02-28 16:32
Category: Pelican
Tags: Pelican
Slug: how-to-add-disqus-comments-for-your-pelican-weblog
Authors: mykonakona
Summary: 优化我的Pelican博客之添加disqus评论
---

## 20190228
给博客加了disqus，但过程有点曲折。

不得不说pelican的教程确实有点少，如果不是这样一点点试可能真就卡在这个评论功能上了。很多博文里提完一句“加配置`DISQUS-SITENAME = "xxx"`”就结束，其实根本没这么简单。

**先说走了弯路的方法：

根据[windows下用Pelican+GitHub搭建静态博客][1]的方法：

注册完disqus账号后，在fork的elegant主题repo里建了一个`disqus.html`，然后disqus提供的通用html（即["how-to-add-disqus-comments"][2]提到的第一步配置）拷进去。修改`articles.html`，在`article content`的div末尾加上一句`{% include 'disqus.html' %}`。

经实验，其实这样disqus就可以用了。但是你去看别人用了elegant的pelican站会发现，为什么他们的评论会隐藏？！

**正确的方法：

注册disqus账号。配置可以参考["how-to-add-disqus-comments"][2]（第一步和Trusted Domions那步都可以忽略）。

然后在`pelicanconf.py`里把disqus生成的一个`website shortname`（在admin的setting-general页面）作为`DISQUS-SITENAME = "xxx"`的值填进去。

同时需要配置的还有:

```
# 以https或http开头，io后面不带/，详见pelican docs的[SITEURL配置说明][3]
SITEURL = 'https://xxx.github.io'
# 下面这项在publishconf.py里也要设成False
RELATIVE_URLS = False
```
这时重新`make html`后就可以看到预期的效果了。

[1]: https://jlhxxxx.github.io/pelican-github.html
[2]: https://kamyanskiy.github.io/2017/06/how-to-add-disqus-comments.html
[3]: https://docs.getpelican.com/en/stable/settings.html?highlight=siteurl
