---
title: 我搭静态博客
date: 2020-05-27 21:59:00
categories: Coding
tags: Hexo
---

动态博客其实一直以来都很吸引我。事实上不久之前，我还在自己的VPS上搭建了最近比较火的halo。域名、证书签发、反代的配置等等都做好了。但经过一系列的折腾，最后还是回来重新使用github page。

做出这个决定有一个重要的理由——动态博客真的贵：好的域名需要钱，线路流畅的VPS也需要钱。廉价VPS服务商的线路一言难尽，我的目的也仅止于记录自己的一些想法和兴趣，不会有更大的野心。因此权衡下来我更倾向于选择一个具有性价比的方案。

<!-- more -->

话虽如此，并不代表静态博客就完美无缺。相反，一些在动态博客中根本不能称之为问题的问题，在静态博客上就得通过各种“奇技淫巧”来解决。

因此本文基于hexo聊一聊在搭建过程中需要注意的点，同类型的生成器如pelican在使用中基本上围绕的也都是这些问题。

## 自动化部署

现在流行的做法通过Travis CI自动部署github page，基本上都遵循如下步骤：

1. 新建一个`username.github.io`仓库，在github的`Settings - Developer settings - Personal access tokens`页面内为Travis CI新建一个github page专用，并赋予repo权限的access token；
2. 使用github账号登陆Travis CI以完成账号关联，将access token作为`GH_TOKEN`加入到从github同步过去的仓库配置中，并在Travis CI中启用该仓库。
3. 在本地安装npm、hexo。初始化hexo项目后，为本地项目添加.travis.yml，并完成_config.yml、.gitignore等相关配置；
4. 为`username.github.io`新建一个`source`分支，将本地项目推送到这个source分支下。最终目的是让Travis CI根据source分支下.travis.yml中的设置的步骤生成静态文件，并把静态文件推送到`username.github.io`的`master`分支下。

这部分的教程其实相当多了，如[1][1]。在实际搭建时，可以根据自己的情况进行调整，并不需要照搬教程。

## 主题开发

如果你使用了比较成熟的主题，但又希望做一些个性化的定制，比较好的一种方式是把这个主题fork到自己的github账号下。并在本地环境中拉取fork的主题。这样做之后，本地的开发环境将会有两个仓库：

- `username.github.io`的`source`分支
  
- `hexo-theme-themename`的`master`分支

由于主题是一个独立分支，因此在自动部署时，一般会把`source`下的themes文件夹加入到这个分支的`.gitignore`里去，避免发生一些可能的修改冲突。

使用时，则通过在.travis.yml添加`git clone`命令引入主题并渲染，例如：

```bash
before_script:
  - npm install -g hexo-cli 
  - mkdir themes
  - git clone https://github.com/username/hexo-theme-themename.git themes/themename

script: 
  - hexo generate
```

## 评论服务选型

对动态博客来说几乎属于标配的评论功能，在静态博客上就得通过各种奇奇怪怪的方案去实现，并且往往还并不完美。我目前使用的主题minos支持的几种评论服务，就各自存在一些缺点：

### disqus

国内网络环境下的访问实在是太慢了，非常影响浏览体验。
  
- 一种方式是把disqus隐藏在一个按钮中，相当于用户只有在点击该评论按钮后才会加载disqus，属于一个治标不治本的方案。
  
- 如果坚持使用disqus，可以考虑参考[2][2]，但我个人感觉还是会有拖慢。

### gitment/gitalk

单独为这类评论服务建一个存放issue仓库倒还不是最麻烦的地方，最麻烦的是每篇博文好像都得手动加issue，虽然github也有网友写了脚本完成这一工作，但易用性还是大大降低了。

另外gitment已经停止更新，一些常见问题如[object XMLHttpRequestProgressEvent][3]、[hexo上的开启失败][4]等只能通过网友提供的各种方案加以解决，这一点也十分劝退我。

### isso

使用体验最好的一个，但并没有选用他。这实际上涉及的是一个理念问题：isso需要自行搭建，也就是说又得放在VPS上，那为什么不直接选用一个自带评论的动态博客方案呢，和我搭静态博客的出发点相矛盾。当然，对于不介意这点的朋友，这个服务还是推荐的。

### valine

目前这个博客上部署的方案，没有上面一些比较恶心的问题。但leancloud这个服务能坚持多久是比较让我担心的地方……

综上所述，可以看到静态博客的评论实在是一大痛点。虽然有各种各样的解决方案，但始终只能算马马虎虎能用，难以达到动态博客的使用体验。

## 搜索引擎收录及SEO优化

目前google的网址前缀收录的推荐方式是通过校验html来完成，步骤可参考[5][5]，SEO优化方面的文章也很多，如[6][6]，这里就不再赘述了。

## 小结

完成这些内容后，你的静态博客相当于拥有了基本的功能。后续包括[全站多语言支持][7]、[图片懒加载][8]等等，都是可以持续优化的方面。

当然，对于一个博客来说，最重要的永远是内容。希望大家不要被各种花俏的技巧蒙蔽了双眼，为了搭博客而搭博客。而是通过搭博客培养兴趣和动手能力，在兴趣驱动下，继续分享自己的思考与创意😁

[1]: https://segmentfault.com/a/1190000021987832 "Travis CI 加 Hexo 实现自动构建部署 Github Pages 博客"
[2]: https://blog.skk.moe/post/prevent-disqus-from-slowing-your-site/#Disqus-Lazyload "使 Disqus 不再拖累性能和页面加载"
[3]: https://github.com/imsun/gitment/issues/100 "总是提示 [object XMLHttpRequestProgressEvent] #100"
[4]: https://github.com/imsun/gitment/issues/178 "hexo博客的gitment评论开启一直失败"
[5]: https://kennyliblog.nctu.me/2019/06/24/Google-search-Hexo-Blog/ "實作 - 讓 Google 能搜尋到自己的 Hexo Blog"
[6]: https://juejin.im/post/5ae7fc18518825672565a7f0#heading-4 "Hexo 个人博客 SEO 优化（3）：改造你的博客，提升搜索引擎排名"
[7]: https://dengcb.com/zh/hexo-minos-multi-language/ "用Minos搭建Hexo全站多语言站点"
[8]: https://blog.skk.moe/post/img-lazyload-hexo/ "图片 lazyload 的学问和在 Hexo 上的最佳实践"
