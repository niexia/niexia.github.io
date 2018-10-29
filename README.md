# BLOG

### 说明

Blog是基于Jekyll，然后使用GitHub Pages进行发布.

**GitHub Pages**

[Github Pages](https://pages.github.com/) 是面向用户、组织和项目开放的公共静态页面搭建托管服 务，站点可以被免费托管在 Github 上，你可以选择使用 Github Pages 默 认提供的域名 github.io 或者自定义域名来发布站点。Github Pages 支持 自动利用 Jekyll 生成站点，也同样支持纯 HTML 文档，将你的 Jekyll 站 点托管在 Github Pages 上是一个不错的选择。

**Jekyll**

[Jekyll](http://jekyllcn.com/)是一种简单的、适用于博客的、静态网站生成引擎。它使用一个模板目录作为网站布局的基础框架，支持Markdown、Textile等标记语言的解析，提供了模板、变量、插件等功能，最终生成一个完整的静态Web站点。说白了就是，只要安装Jekyll的规范和结构，不用写html，就可以生成网站。

Jekyll的核心其实就是一个文本的转换引擎，用你最喜欢的标记语言写文档，可以是Markdown、Textile或者HTML等等，再通过layout将文档拼装起来，根据你设置的URL规则来展现，这些都是通过严格的配置文件来定义，最终的产出就是web页面。
```
|-- _config.yml
|-- _includes
|-- _layouts
|   |-- default.html
|    -- post.html
|-- _posts
|   |-- 2007-10-29-why-every-programmer-should-play-nethack.textile
|    -- 2009-04-26-barcamp-boston-4-roundup.textile
|-- _site
 -- index.html
```
**项目结构**

|文件/目录|描述|
|:--------------|:--------------|
|_config.yml|保存配置数据。很多配置选项都可以直接在命令行中进行设置，但是如果你把那些配置写在这儿，你就不用非要去记住那些命令了。|
|_drafts|drafts（草稿）是未发布的文章。这些文件的格式中都没有 title.MARKUP 数据。
|_includes| 你可以加载这些包含部分到你的布局或者文章中以方便重用。可以用这个标签  {% include file.ext %} 来把文件 _includes/file.ext 包含进来。你可以将这里面的文件当作你layouts中的材料，因为你每个页面都会用到它
|_layouts|layouts（布局）是包裹在文章外部的模板。标签  {{ content }} 可以将content插入页面中。
|_posts|这里放的就是你的文章了。如果你想简单的谢谢博客，那么你关注这里还有_config.yml就差不多足够了！
|_data|格式化好的网站数据应放在这里。jekyll 的引擎会自动加载在该目录下所有的 yaml 文件（后缀是 .yml, .yaml, .json 或者 .csv ）。这些文件可以经由 ｀site.data｀ 访问。如果有一个 members.yml 文件在该目录下，你就可以通过 site.data.members 获取该文件的内容。
|assets|引用的资源。css js等，它们都将被完全拷贝到生成的 site 中。
|favicon.ico|标签页中的icon，你可能会想换成自己的，[推荐一个网站](http://www.faviconico.org/)。选择你喜欢icon图片，然后转成favicon.ico就好了


[博客预览](http://yangseas.github.io)

### 使用这个模板

**你需要**
1. download或者clone这个res<br/>
2. 修改`_config.yml`里面的配置<br/>
3. 然后将这些文件push到你的usename.github.io这个res就行（请先了解GitHub pages），然后通过`http://username.github.io`进行访问
4. 本地我没有安装jekyll，如果你想本地调试，请参考一下的参考中的连接查看如何操作。

**_config.yml的说明**

|参数|说明|
|:--------------|:--------------|
|title|首页展示的标题|
|email|邮箱地址， 其他人联系的时候会往该邮箱发邮件（会先有一封confirm邮件）
|description| 标题下面的描述
|baseurl|二级路径（我设置为空，会加到地址栏里边，配置部队会导致获取资源失败）
|url|github.io的url路径

### Bugs and Issues 

如果在使用过程中有遇到bug或者issue,请到这里[提issue](https://github.com/yangseas/yangseas.github.io/issues)

### 如果你提交之后发现没有更新
那么就是GitHub Pages 执行构建的时候失败了。这个时候GitHub会给你github上面的邮箱发邮件通知你，告诉你失败的原因，注意查看邮件
>Tip: We strongly recommend `running Jekyll locally` so you can easily debug and fix build errors before pushing to GitHub. To learn more about troubleshooting options, see "Troubleshooting GitHub Pages builds."

### 感谢

1. 这个模板fork自[BlackrockDigital/startbootstrap-clean-blog-jekyll](https://github.com/BlackrockDigital/startbootstrap-clean-blog-jekyll)，感谢这个作者
2. 还有[huxpro.github.io](https://github.com/huxpro/huxpro.github.io)，里面的很多功能真的很棒

### 参考
- [Jekyll中文文档](http://jekyllcn.com/)
- [用Jekyll搭建的Github Pages个人博客](https://www.jianshu.com/p/88c9e72978b4)
- [Github Pages 搭建笔记](https://www.jianshu.com/p/ec7953b9e5ab)
- [window下Jekyll建站过程](https://blog.csdn.net/m0_37996098/article/details/78478764)

