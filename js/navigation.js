new Vue({
  el: '#navigation_header',
  data:{
      message: '<div>\
          <v-app-bar color="white" dense>\
            <v-col md="0.8"></v-col>\
            <v-img src = "images/logo_new.png" contain max-height="50"></v-img>\
            <v-col md="0.5"></v-col>\
            <v-btn text color = "black">首页</v-btn>\
            <v-btn text color = "black">问答</v-btn>\
            <v-btn class = "mr-12" text color = "black">文章</v-btn>\
            <v-col md="4"></v-col>\
            <v-col md="2" class = "ml-12">\
              <v-text-field placeholder="搜索" dense hide-details outlined append-icon="search"></v-text-field>\
            </v-col>\
            <v-btn class = "mr-12" color = "primary">提问</v-btn>\
            <v-btn text color = "black">登录</v-btn>\
            <v-btn text color = "black" href="register.html">注册</v-btn>\
            <v-menu>\
              <template v-slot:activator="{ on, attrs }">\
                <v-btn v-bind="attrs" v-on="on">未登录</v-btn>\
              </template>\
              <v-list>\
                <v-list-item>\
                  <v-list-item-title>用户主页</v-list-item-title>\
                </v-list-item>\
                <v-list-item>\
                  <v-list-item-title>登出</v-list-item-title>\
                </v-list-item>\
              </v-list>\
            </v-menu>\
          </v-app-bar>\
        </div>',
  },
})

