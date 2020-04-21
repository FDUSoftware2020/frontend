Vue.component('navigation', {
  template: '<div>\
  <v-app-bar color="white" dense>\
    <v-app-bar-nav-icon>\
    <v-col md="0.5">\
    </v-col>\
    <v-img src = "images/logo_new.png" contain max-height="30"></v-img>\
    </v-app-bar-nav-icon>\
    <v-toolbar-title>\
    <v-btn text color = "black" href="home.html">首页</v-btn>\
    <v-btn text color = "black">问答</v-btn>\
    <v-btn class = "mr-12" text color = "black">文章</v-btn>\
    </v-toolbar-title>\
    <v-spacer></v-spacer>\
    <v-col class = "ml-12">\
      <v-text-field placeholder="搜索" dense hide-details outlined append-icon="search"></v-text-field>\
    </v-col>\
    <v-btn class = "mr-12" color = "primary">提问</v-btn>\
    <v-btn text color = "black" href="sign.html">登录</v-btn>\
    <v-btn text color = "black" href="register.html">注册</v-btn>\
    <v-menu>\
      <template v-slot:activator="{ on, attrs }">\
        <v-btn v-bind="attrs" v-on="on" id = "User_Name">未登录</v-btn>\
      </template>\
      <v-list>\
        <v-list-item>\
          <v-list-item-title>用户主页</v-list-item-title>\
        </v-list-item>\
        <v-list-item @click="req_logout">\
          <v-list-item-title>登出</v-list-item-title>\
        </v-list-item>\
      </v-list>\
    </v-menu>\
  </v-app-bar>\
</div>',

  methods: {
    req_logout: function(){
      if(is_logged_in){
          axios.get(url + '/account/logout/', {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .then(response => (this.ack_logout(response)))
          .catch(function(error){
              console.log(error);
          });
      }else{
          alert("请先登录后再登出")
      }
    },
  
    ack_logout: function(response){
      var data = response.data
      if(data.err_code == 0){
          location.reload()
      }else{
          console(response.message)
      }
    }
  }

})

