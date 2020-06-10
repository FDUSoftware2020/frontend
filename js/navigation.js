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
      <v-dialog v-model="dialog" width="400px">
        <template v-slot:activator="{ on }">
          <v-btn v-bind="attrs" v-on="on" @click="">
            <span>{{title}} </span>
            <span class="red--text">{{cnt}}</span>
          </v-btn>\
        </template>
        <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        min-height="20"
        transition="fade-transition"
        >
        <v-card
          class="mx-auto"
          max-width="400"
          dense
        >
          <v-card-title>消息通知</v-card-title>
          <v-divider></v-divider>
          <v-list-item two-line v-for="(item, index) in news" :key="index">
            <v-list-item-content>
              <p style="word-break:break-all;" @click="jump(index, 0)">
                <span class="font-weight-black">{{item.from}} </span>
                {{item.content}}
              </p>
              <v-list-item-subtitle @click="jump(index, 0)">
                <span class="font-weight-light">{{item.pub_date}}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action @click="del(index, 0)">
              <v-btn icon>
                <v-icon small color="grey lighten-1">
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <div v-if="!no_old">
            <v-subheader>以下为旧消息</v-subheader>
            <v-divider></v-divider>
            
          </div>
          <v-list-item two-line v-for="(item, index) in old" :key="index">
            <v-list-item-content>
            <p @click="jump(index, 1)">
            <span class="font-weight-black">{{item.from}} </span>
            {{item.content}}
          </p>
          <v-list-item-subtitle @click="jump(index, 1)">
            <span class="font-weight-light">{{item.pub_date}}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action @click="del(index, 1)">
          <v-btn icon>
            <v-icon small color="grey lighten-1">
              mdi-delete
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">确认</v-btn>
          </v-card-actions>
        </v-card>
        </v-lazy>
      </v-dialog>
      <v-menu>\
        <template v-slot:activator="{ on, attrs }">\
          <v-btn v-bind="attrs" v-on="on">{{user_id}}</v-btn>\
        </template>\
        <v-list>\
          <v-list-item @click="goto_profile">\
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
    title: '消息通知',
    cnt: '',
    no_old: false,
    dialog: false,
    user_id: '未登录',
    type: ['', '回答了你的问题', '评论了你的文章', '评论了你的回答'],
    news: [{ 
      "msg_id": 123,
      "type": 1,
	    "issue_id": 2,
	    "answer_id": 2,
	    "parent_comment_id": -1,
	    "comment_id": -1,
      "from": "张三",
      "pub_date": "2020-2-20",
      "content": "在帖子《XXXXXXXXXXXXXXXXXXXXXXXXXX》你的回复中追加了一条对话",
      "IsReading": 0
    },
    { 
      "msg_id": 127,
      "type": 2,
	    "issue_id": 2,
	    "answer_id": -1,
	    "parent_comment_id": -1,
	    "comment_id": 11,
	    "from": "张三",
      "pub_date": "2020-2-20",
      "content": "在你的帖子《》追加了一条回答",
      "IsReading": 0
    }],
    old: [{ 
      "msg_id": 123,
      "type": 1,
	    "issue_id": 2,
	    "answer_id": 2,
	    "parent_comment_id": -1,
	    "comment_id": -1,
	    "from": '张',
	    "pub_date": "2020-2-20",
      "content": "在你的帖子《》追加了一条回答",
      "IsReading": 1
    },
    { 
      "msg_id": 123,
      "type": 1,
	    "issue_id": 2,
	    "answer_id": 2,
	    "parent_comment_id": -1,
	    "comment_id": -1,
	    "from": '张',
	    "pub_date": "2020-2-20",
      "content": "在帖子《》你的回复中追加了一条对话",
      "IsReading": 1
    },
    { 
      "msg_id": 123,
      "type": 1,
	    "issue_id": 2,
	    "answer_id": 2,
	    "parent_comment_id": -1,
	    "comment_id": -1,
	    "from": '张',
      "pub_date": "2020-2-20",
      "content": "在你的帖子《》追加了一条回答",
      "IsReading": 1
    },
    { 
      "msg_id": 127,
      "type": 2,
	    "issue_id": 2,
	    "answer_id": -1,
	    "parent_comment_id": -1,
	    "comment_id": 11,
	    "from": '三',
      "pub_date": "2020-2-20",
      "content": "在帖子《》你的回复中追加了一条对话",
      "IsReading": 1
    }]
  }),

  mounted: function() {
    this.req_login();
    this.req_mess();
  },

  methods: {
    del: function(index, c){
      axios.get(url + '/account/message/' + this.news[index].msg_id + '/delete/', data = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
      })
      .then(response => (this.ack_delete(response)))
      .catch(function(error){
        console.log(error);
      });
      if(c == 0){
        var id = this.news[index].msg_id
        this.news = this.news.filter(t => t.msg_id != id)
        var len = this.news.length
        if(len > 0){
          this.cnt = "(" + String(len) + ")"
        }else{
          this.cnt = ""
        }
      }else{
        var id = this.old[index].msg_id
        this.old = this.old.filter(t => t.msg_id != id)
        if(this.old.length == 0){
          this.no_old = true
        }
      }
    },

    jump: function(index, c){
      if(c == 0){
        var temp = this.news[index]
        this.old.push(temp)
        this.news = this.news.filter(t => t.msg_id != temp.msg_id) 
        var len = this.news.length
        if(len > 0){
          this.cnt = "(" + String(len) + ")"
        }else{
          this.cnt = ""
        }
      }else{
        var temp = this.old[index]
      }
      if(temp.type == 1 || temp.type == 3){
        window.location.href = "question.html?question_id=" + temp.issue_id
      }else if(temp.type == 2){
        window.location.href = "article.html?article_id=" + temp.issue_id
      }else{
        alert("Error.")
      }

    },

    req_mess: function(){
      axios.get(url + '/account/message/list/', data = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
      })
      .then(response => (this.ack_mess(response)))
      .catch(function(error){
        console.log(error);
      });
    },

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

    ack_read: function(response){
      if(response.err_code == 0){
        return
      }else{
        alert(response.message)
      }
    },


    ack_delete: function(response){
      if(response.err_code == 0){
        return
      }else{
        alert(response.message)
      }
    },

    ack_mess: function(response){
      var data = response.data
      if(data.err_code == 0){
        this.news = data.data.filter(t => t.IsReading != 1) 
        this.old = data.data.filter(t => t.IsReading == 1) 
        var len = this.news.length
        var old_len = this.old.length
        if(len > 0){
          this.cnt = "(" + String(len) + ")"
        }
        if(old_len > 0){
          this.no_old = false
        }
      }else{
        console.log(data.message)
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
    },

    goto_profile: function(){
      location = 'profile.html'
    },
  }

})

