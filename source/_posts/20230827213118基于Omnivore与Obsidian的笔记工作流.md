---
id: 20230827213118
title: |
  基于Omnivore与Obsidian的笔记工作流
author: |
  mykonakona
tags:
 - 知识管理
 - Obsidian
description: 相比网友们顺其自然的管理，我对笔记的使用更像是一种为记而记的学习。但过程中我也发现，通过强制自己使用笔记、稍后读这类软件及服务，我的表达欲有了一定的提升，思维和表达相比以前也更加清晰，为自身带来了明显的改变。因此，我决定将还在摸索阶段的我个人的笔记工作流记录下来，供大家参考。
date: 2023-08-27 21:31:18
date_saved: null
origin_url: null
---

构建笔记工作流当然有受到这股知识管理风潮的影响，但改善自身学习工作混乱无序的诱惑实在巨大。

<!-- more -->

在分享之前必须说明，我并不是一个经常记各种笔记的人，平时的阅读、记录或者写作都是比较散漫的。所以尽管阅读量并不小，但是因为缺乏提炼，导致日常的口头和文字表达常会出现啰嗦、逻辑不清的情况。

相比网友们顺其自然的管理，我对笔记的使用更像是一种为记而记的学习。但过程中我也发现，通过强制自己使用笔记、稍后读这类软件及服务，我的表达欲有了一定的提升，思维和表达相比以前也更加清晰，为自身带来了明显的改变。因此，我决定将还在摸索阶段的我个人的笔记工作流记录下来，供大家参考。

我把我的知识管理流程分为三个阶段：

- 收集——整理——提炼

需要说明的是，并非是先根据这三个阶段来规划后续的工具使用，而是根据试用体验，精简了工具选型，再从实际的工具使用中反推出这三个阶段。

谈到工具选型，首先从最主要的笔记软件看，笔记软件应当成为整个知识管理流程中使用时间最长的工具，也是整个流程中使用到的工具的核心。表面上看市面上可用的笔记软件非常非常多，但在明确了自己的需求后，你会发现真正可供选择的其实很少。

我曾是很长时间的国区Evernote用户，Notion也实际使用过一段时间。这次为了捋顺整个流程，还把Logseq、wolai等等都用了个遍。这些笔记软件中，最有实力的我认为还是Notion，几乎没有它做不到的事情。但最后还是决定使用Obsidian，选择的理由其实完全是基于对后续使用的规划：

- 一个不常使用笔记的人，要建立起用笔记的习惯，首先需要的是启动速度快。Obsidian在笔记量比较少的时候，启动比起需要联网的Notion还是快得多了；
- 假如把基于网络服务的笔记软件看作一个私有仓库的博客，那它们都有停运的风险。对比Notion的网络同步，Obsidian同步可能得需要我去把文件夹挂载到某个网盘上，确实不那么酷。但搭配rclone后就意味着本地和云端乃至其他机器的多副本，不需要特地进行手动备份；
- 另外一个不去使用Notion的比较滑稽的原因是：Notion的各种功能做得太好了。这会让人（我）忍不住想去使用、研究，消耗很多时间。Obsidian的功能其实也不少，但是功能上的易用性不如Notion，而且往往是以一种兴趣小组布道式的方式来推广，门槛也高。不以折腾为目的话，反而可以老老实实地专注在记录本身上。

只基于这些原因，似乎也没必要选用Obsidian。比起速度快，打开Notepad不是更快？但笔记软件还是得讲一个使用生态。对于菜鸟来说，不宜选过于小众的软件来入门，至少得有相当的用户支持才能提高使用体验。另外，对于一些特殊的需求而言，有时候是有“非XX不可”的情况存在的。我之所以选择Obsidian，还和我的稍后读选型有着很大关系。

稍后读服务其实并不新鲜，比起稍后读本身，可能大多数人还是把它当作一个资料的中转站。Pocket毫无疑问是把这个概念发扬光大的APP，但在今天恐怕没有多少人会去用Pocket。各家云笔记推出自己的Web Clipper服务之后，对Pocket的冲击就更大。发展到现在，用户已经可以选择cubox、剪藏等功能已经非常完备的服务。但这类服务的一大问题是如果服务器架设在国内就会有内容审查的风险。这种风险虽然很低，但我们在使用稍后读时，总不能自己先主动审查一遍来避免可能的麻烦吧。对我而言，所有可能会有这类问题的稍后读或Web Clipper服务我都不会去使用。因此我选用Omnivore搭配Obsidian。

Omnivore毕竟还不成熟，内容抓取上其实是不如Pocket的。它的优势是可以通过Obsidian插件将高亮、笔记内容同步到Obsidian去。这件事cubox也能干（同步到Notion）但cubox毕竟还是在国内。

目前，我通过Omnivore收集资料，打好标签，做好高亮、笔记后，推送到Obsidian。这样后续的整理、提炼可以全部在Obsidian内完成。Obsidian一方面要接收Omnivore推送的信息流，一方面需要承担大部分的写作工作。如果[在Obsidian中实践ZK理念][1]，除了规划好文件夹分区外（常规的盒子如：灵感、文献、永久等），还可以将资料和笔记的格式统一起来。例如，Omnivore收集的资料导入Obsidian时，使用的[Front Matter][2]为：

```markdown
id: {{{id}}}
title: >
  {{{title}}}
{{#author}}
author: >
  {{{author}}}
{{/author}}
{{#labels.length}}
tags:
{{#labels}} - {{{name}}}
{{/labels}}
{{/labels.length}}
description: {{{description}}}
{{#datePublished}}
date_published: {{{datePublished}}}
{{/datePublished}}
date_saved: {{{dateSaved}}}
origin_url: {{{originalUrl}}}
```

而在Obsidian里，所有的笔记新建我们都通过Obsidian的`创建时间戳笔记`来发起。时间戳笔记的格式均遵循以下模板：

```markdown
---
id: 
title: |
  title
author: |
  me
tags:
 - tag
description: 
date_published: 
date_saved: null
origin_url: null
---
```

同时，对Obsidian中时间戳笔记和Omnivore插件进行配置，统一新建笔记的命名规则为`yyyyMMDDHHmmss`。这时，不论是同步过来的资料还是新增的笔记，都做到了元数据和格式上的尽可能地统一。这种做法的优势在于，笔记的元数据整理起来很轻松，且能够几乎无缝地发布到博客上，节省了大量的时间。

当然，这套流程并非没有缺点。虽然从经济成本上它不需要使用任何付费服务，但伴随的问题就是[对于随手记没有很好的解决方案][3]。电脑上我还可以打开软件生成一条时间戳笔记进行记录，移动端就很难解决了。

随手记的导入和移动端适配仿佛是鱼和熊掌。尤其是苹果生态和安卓生态的不统一，使得这个问题很难有一个多平台适配的答案。另一种解决方式是搭建[memos服务器][4]再通过[插件][5]导入。这对NAS用户其实挺友好的。目前我还是通过其他服务（如flomo）来接管，但最后[flomo与Obsidian的联动][6]还是需要手动完成，无法方便地一键导入。

所以后续我大概会采用一个很笨的方法：

- 在iPhone上装一个熊掌记；
- 日常的随手记通过手机的桌面组件进入后统一记录在一个文件里；
- 定期通过熊掌记的markdown格式导出功能把随手记手动同步到Onedrive上的Obsidian文件夹里。

到此为止，回头再看整个过程，各个环节基本上都有了对应的解决方案。到此我对构建自己的笔记工作流的探索告一段落了。我的方案并不完美，或许在今后的使用中，还会放弃许多今天的构想或者使用的工具。但比起用什么样的工具，我认为更重要的还是需求为本、做减法的思维方式以及自底向上的实践做法，对我而言，这些指导思想或许已经在我的知识管理入门中发挥着潜移默化的作用。

[1]: https://zhuanlan.zhihu.com/p/360599265 "用Obsidian实现Zettelkasten看这一篇就够了（上）"
[2]: https://docs.omnivore.app/integrations/obsidian.html#front-matter "Sync all your reading to Obsidian "
[3]: https://forum-zh.obsidian.md/t/topic/15659 "建议官方内置memos插件，完善随手记碎碎念功能"
[4]: https://github.com/usememos/memos "A privacy-first, lightweight note-taking service. Easily capture and share your great thoughts. "
[5]: https://github.com/catnu/obsidian-memos-fetch "obsidian plugin to pull memos. Contribute to catnu/obsidian-memos-fetch development by creating an account on GitHub."
[6]: https://forum-zh.obsidian.md/t/topic/20120/3 "各司其职：Flomo,Obsidian的联动使用"
