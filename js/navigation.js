Vue.component('navigation', {
  template: `<div>\
  <v-app-bar color="white" dense>\
    <v-app-bar-nav-icon>\
    <v-col md="0.5">\
    </v-col>\
    <v-img src = "images/logo_new.png" contain max-height="30"></v-img>\
    </v-app-bar-nav-icon>\
    <v-toolbar-title>\
    <v-btn text color = "black" href="home.html">首页</v-btn>\
    <v-btn text color = "black">问答</v-btn>\
    <v-btn class = "mr-12" text color = "black" href="article_editor.html">写文章</v-btn>\
    </v-toolbar-title>\
    <v-spacer></v-spacer>\
    <v-col class = "ml-12">\
      <v-text-field id="keyword"\
      v-model="message"\
      filled\
      clear-icon="mdi-close-circle"\
      clearable\
      label="搜索"\
      type="text" dense hide-details outlined\
      append-icon="search"\
      @click:append="search"\
      @keyup.enter="search"></v-text-field>\
    </v-col>\
    <v-btn class = "mr-12" color = "primary" href="question_editor.html">提问</v-btn>\
    <div v-if="!log_in">\
      <v-btn text color = "black" href="sign.html">登录</v-btn>\
      <v-btn text color = "black" href="register.html">注册</v-btn>\
    </div>\
    <div v-if="log_in">\
      <v-menu>\
        <template v-slot:activator="{ on, attrs }">\
          <v-btn v-bind="attrs" v-on="on">{{user_id}}</v-btn>\
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
    </div>\
  </v-app-bar>\
</div>`,

  data: () => ({
    message: '',
    log_in: false,
    user_id: '未登录'
  }),

  mounted: function() {
    this.req_login();
  },

  methods: {
    req_login: async function(){
      axios.get(url + '/account/ask_login_user/', {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(response => (this.ack_login(response)))
      .catch(function(error){
          console.log(error);
      });
    },

    ack_login: async function(response){
      if(response.data.err_code == -1){
        return;
      }
      var data = response.data.data;
      if(data != ""){
          this.log_in = true;
          this.user_id = data
      }
    },

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
    },

    search: function(){
      keyword = document.getElementById("keyword").value
      if(keyword){
        window.location.href = "search_page.html?search=" + keyword
      }
      else{
        message = "请输入搜索内容"
      }
    }
  }

})

