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

## Structure

```
frontend
├── css                   // css文件目录
├── images			          // 图像资源目录
├── js					          // js文件目录
│   ├── home.js			      // 布局控制逻辑
│   ├── jquery-3.4.1		  // jquery库文件
│   ├── logout.js				  // 用户登出逻辑
│   ├── particles				  // 粒子特效背景实现
│   ├── preload.js		    // 在线状态判断逻辑
│   ├── register.js			  // 用户注册逻辑
│   ├── sign.js					  // 用户登录逻辑
│   └── sweetalert2			  // JavaScript弹窗库
├── home.html					    // 入口html文件
├── register.html				  // 注册页面html文件
├── sign.html				      // 登录页面html文件
├── api.md							  // API文档
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