# BLOG

### 说明

Blog是基于Jekyll的，然后使用[GitHub Pages](https://pages.github.com/)进行发布,GitHub Pages为了提供对HTML内容的支持，选择了Jekyll作为模板系统。Jekyll是一个强大的静态模板系统，很适合作为个人博客使用。

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

[博客预览](http://yangseas.github.io)

### 使用这个模板

**你需要**
1. download或者clone这个res<br/>
2. 修改`_config.yml`里面的配置<br/>
3. 然后将这些文件push到你的usename.github.io这个res就行（请先了解GitHub pages）

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

### 感谢

这个模板fork自[BlackrockDigital/startbootstrap-clean-blog-jekyll](https://github.com/BlackrockDigital/startbootstrap-clean-blog-jekyll)，感谢这个作者

### 参考
- [Jekyll中文文档](http://jekyllcn.com/)
- [用Jekyll搭建的Github Pages个人博客](https://www.jianshu.com/p/88c9e72978b4)
- [Github Pages 搭建笔记](https://www.jianshu.com/p/ec7953b9e5ab)
- [window下Jekyll建站过程](https://blog.csdn.net/m0_37996098/article/details/78478764)
