Vue.use(MavonEditor)
Vue.use(VueMarkdown)

Vue.component('editor_header', {
    props: ['page_name'],
    template: `<div>\
    <v-app-bar color="white" dense>\
      <v-app-bar-nav-icon>\
      <v-col md="0.5">\
      </v-col>\
      <v-img src = "images/logo_new.png" contain max-height="30"></v-img>\
      </v-app-bar-nav-icon>\
      <v-col md="0.5">\
      </v-col>\
      <div class="font-weight-black text-center">\
        {{ page_name }}\
      </div>\
      <v-spacer></v-spacer>\
      <v-btn class = "mr-12" color = "primary" @click="$emit('release_issue')">\
        发布\
      </v-btn>\
      <v-menu>\
        <template v-slot:activator="{ on, attrs }">\
          <v-btn v-bind="attrs" v-on="on" id = "User_Name">未登录</v-btn>\
        </template>\
        <v-list>\
          <v-list-item href='profile.html'>\
            <v-list-item-title>用户主页</v-list-item-title>\
          </v-list-item>\
          <v-list-item @click="req_logout">\
            <v-list-item-title>登出</v-list-item-title>\
          </v-list-item>\
        </v-list>\
      </v-menu>\
    </v-app-bar>\
  </div>`,
    data () {
        return {
            name: '',
            isLogin: false,
        }
    },
    mounted () {
        this.checkLogin();
    },
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
      },

      // 检查是否登录，否则跳转到登录页
      async checkLogin() {
        await axios.get(url + '/account/ask_login_user/', {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(response => (ack_ask_login_user(response)))
        .catch(function(error){
            console.log(error);
        });
        if(!is_logged_in){
          alert("请先登录！")
          location = "sign.html"
          return
        }
      },
    },
  
});

Vue.component('markdown_editor', {
    template: `<div>\
      <mavon-editor 
          ref=md \
          v-model="value" \
          @imgAdd="$img_add" \
          @imgDel="$img_del"\
          @change="update_content()"\
      >\
      </mavon-editor>\
    </div>`,
    data () {
        return {
            value: '',
        }
    },
    methods: {
        $img_add(pos, $file){
            // 缓存图片信息
            this.$emit('add_img', pos, $file);
        },
        $img_del(pos){
            this.$emit('delete_img', pos);
        },
        update_content(){
            this.$emit('update_content', this.value);
        },
        img2Url(fileIndex, img_url){
            this.$refs.md.$img2Url(fileIndex, img_url);
            this.$emit('update_content', this.value);
        },
    },
  
});
  
