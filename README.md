**该仓库已不再维护，请使用新版本的博客主题：[Issue-Blog-With-Github-Action](https://github.com/Yidadaa/Issue-Blog-With-Github-Action)**

# issue-blog

使用 github 的 issue 系统书写博客，获得完善的 markdown 写作支持，免服务器，响应式布局。

> A Vue.js project

## 使用指南

在你的 Github Pages 目录下，新建`index.html`文件，并将以下内容复制进去即可。
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <title>Yidadaa的个人博客</title>
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <link href="//cdn.bootcss.com/viewerjs/0.10.0/viewer.min.css" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
    <script>
      window.username = 'Yidadaa' // 你的 github 账户名
      window.reponame = 'Yidadaa.github.io' // 你用来存放博客的仓库名
      // window.authToken = 'Your Personal Access Token Here' // 用于突破github api的访问限制，这是一个可选参数，如需突破该限制，请按照下方说明配置你自己的access token，然后复制到此处，并取消此处的注释
      window.links = [
        // 头部导航链接
        ['主页', 'https://blog.simplenaive.cn']
      ]
      window.friendLinks = [
        // 友情链接
        ['DragonZZZ', 'http://dragonzzzz.github.io']
      ]
      window.motto = 'Yidadaa' // banner的文字
      window.viewerConfig = {
        // 图片查看器的配置，详情请查阅viewerjs的文档
        navbar: false,
        toolbar: {
          prev: 0,
          play: { show: 0 },
          next: 0,
          rotateLeft: 0,
          rotateRight: 0,
          flipHorizontal: 0,
          flipVertical: 0,
          zoomIn: 1,
          zoomOut: 1,
          oneToOne: 1,
          reset: 1
        }
      }
    </script>
    <script src="//cdn.bootcss.com/fetch/2.0.3/fetch.min.js"></script>
    <script src="//cdn.bootcss.com/babel-polyfill/6.26.0/polyfill.min.js"></script>
    <script src="//blog.simplenaive.cn/Issue-Blog/dist/build.js"></script>
    <script src="//cdn.bootcss.com/viewerjs/0.10.0/viewer.min.js"></script>
  </body>
</html>
```
然后根据情况，修改 21 行之后的配置项，就可以开始用了。
书写博客：在你之前配置的`window.reponame`所指的仓库中提交 issue ，就相当于写博客了，别人评论你的博客，你可以通过 github 的邮件得到通知，十分方便。
对，就这么简单。

## 使用分类和标签管理博文

本博客可以使用分类和标签管理和归档博文，默认使用 issue 的 milestone 作为类目名称， issue 的 label 则为博文的 label 。
使用示例可参考： https://github.com/Yidadaa/Yidadaa.github.io/issues

## 配置Aceess Token
Github API 默认有60次/小时的访问限制，为了突破此限制，可以选择启用Personal Access Token。

1. 访问Personal Access Token配置页面：https://github.com/settings/tokens ;
2. 点击`Generate new token`，在新页面中，填写`Token description`，然后勾选`Select scopes`中的`repo`项;
3. 点击`Generate token`生成新token，然后将生成的token复制到`window.authToken`处即可。

## 开发指南

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
