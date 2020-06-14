# FSDN Frontend README

>   This repository contains the frontend of FSDN(Fudan Software Developer Network).

![](https://img.shields.io/badge/FSDN-fontend-brightgreen.svg)![](https://img.shields.io/badge/Framework-Vue.js-green.svg)

## Table of Contents

-   [Background](#background)
-   [Install](#install)
-   [Usage](#Usage)
-   [Contributing](#contributing)
-   [License](#license)

## Background

简单介绍背景

## Release

1. 更新主页及登录、注册页面 (2020-3-22)

2. 登录、注册功能初步实现 (2020-3-25)

3. 注册时的邮箱验证功能实现 (2020-3-28)

4. 使用新组件库重构登录、注册页面(2020-4-20)

5. 问题展示功能实现(2020-5-1)

6. 问题/文章编辑、文章展示、搜索功能实现(2020-5-5)

7. 个人主页、通知信息、二级评论实现(2020-6-6)

8. UI功能测试完成(2020-6-14)

## Structure

```
frontend
├── css                   // css文件目录
├── images                // 图像资源目录
├── js                    // js文件目录
├── home.html             // 主页
├── register.html         // 注册页面
├── sign.html             // 登录页面
├── navigation.html       // 导航栏
├── question.html         // 问题展示页面
├── question_editor.html  // 问题编辑页面
├── article.html          // 文章展示页面
├── article_editor.html   // 文章编辑页面
├── search_page.html      // 搜索结果页面
├── profile.html          // 个人主页页面
└── README.md
```

## Install

在服务器上安装和启动Nginx:

```shell
sudo apt-get install nginx
sudo service nginx start
```

## Usage

前端部署：

把项目文件放在服务器目录下，如放在/var/www/frontend.

在/etc/nginx/conf.d下新建配置文件fsdn.conf，Nginx配置内容如下:

```
server {
  server_name your_server_ip;
  root /var/www/frontend;
  index home.html;
  location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt){
    root /var/www/frontend;
  }
}
```

重新加载nginx配置:

```
sudo nginx -s reload
```

之后通过浏览器访问"http://server_ip"即可显示代理的页面.

## Contributing

贡献者

## License

协议
