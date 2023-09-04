---
title: 相册使用说明
layout: "blueimpgallery"
comments: false
---

本主题相册页支持blueimpGallery，需在主题ejs文件内手动引入相关资源。

## 使用例

### 配置文件

```html
favicon: /images/favicon.ico

menu:
    Archives: /archives
    Categories: /categories
    Gallery: /gallery
    About: /about

article:
    # Show word count and estimated reading time.
    readtime: true
    # Code highlight theme, please see https://highlightjs.org/static/demo/
    highlight: atom-one-dark    

logo:
    text: mykonakona

navbar_links:
  RSS:
    icon: fas fa-rss
    url: https://mykonakona.github.io/atom.xml

search:
    type: insight

# Other plugins and their settings.
plugins:
  mathjax: true
  katex: false
  gallery: true
  clipboard: true
```

### 相册页

source下新建../gallery/index.md文件，插入以下内容：

```html
---
layout: "blueimpgallery"
comments: false
---

<div id="links"  class="links">
<a href="https://che.jakku.top/images/2021/09/17/IMG_20210808_174117.jpg"><img loading="lazy" width="105" height="105" src="https://che.jakku.top/images/2021/09/17/IMG_20210808_174117.th.jpg" alt="IMG_20210808_174117.th.jpg" border="0"></a>
<a href="https://che.jakku.top/images/2021/09/17/IMG_20210808_174124.jpg"><img loading="lazy" width="105" height="105" src="https://che.jakku.top/images/2021/09/17/IMG_20210808_174124.th.jpg" alt="IMG_20210808_174124.th.jpg" border="0"></a>
<a href="https://che.jakku.top/images/2021/09/17/IMG_20210808_174135.jpg"><img loading="lazy" width="105" height="105" src="https://che.jakku.top/images/2021/09/17/IMG_20210808_174135.th.jpg" alt="IMG_20210808_174135.th.jpg" border="0"></a>
<a href="https://che.jakku.top/images/2021/09/17/IMG_20210808_174144.jpg"><img loading="lazy" width="105" height="105" src="https://che.jakku.top/images/2021/09/17/IMG_20210808_174144.th.jpg" alt="IMG_20210808_174144.th.jpg" border="0"></a>
</div>
```

## 效果

<div id="links"  class="links">
<a href="https://che.jakku.top/images/2021/09/17/IMG_20210808_174117.jpg"><img loading="lazy" width="105" height="105" src="https://che.jakku.top/images/2021/09/17/IMG_20210808_174117.th.jpg" alt="IMG_20210808_174117.th.jpg" border="0"></a>
<a href="https://che.jakku.top/images/2021/09/17/IMG_20210808_174124.jpg"><img loading="lazy" width="105" height="105" src="https://che.jakku.top/images/2021/09/17/IMG_20210808_174124.th.jpg" alt="IMG_20210808_174124.th.jpg" border="0"></a>
<a href="https://che.jakku.top/images/2021/09/17/IMG_20210808_174135.jpg"><img loading="lazy" width="105" height="105" src="https://che.jakku.top/images/2021/09/17/IMG_20210808_174135.th.jpg" alt="IMG_20210808_174135.th.jpg" border="0"></a>
<a href="https://che.jakku.top/images/2021/09/17/IMG_20210808_174144.jpg"><img loading="lazy" width="105" height="105" src="https://che.jakku.top/images/2021/09/17/IMG_20210808_174144.th.jpg" alt="IMG_20210808_174144.th.jpg" border="0"></a>
</div>