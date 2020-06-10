var compare_hotest = function(x, y){
    if(x.like_num < y.like_num){
        return 1;
    }else if(x.like_num == y.like_num){
        return 0;
    }
    return -1;
}

var compare_newest = function(x, y){
    var date1 = new Date(x.pub_date)
    var date2 = new Date(y.pub_date)
    var time1 = Date.parse(date1)
    var time2 = Date.parse(date2)
    if(time1 < time2){
        return 1;
    }else if(time1 == time2){
        return 0;
    }
    return -1;
}
Vue.use(VueMarkdown)

Vue.component('single_subcomment',{
    props:["item", "idx", "parent_id"],
    template: '\
    <v-card shaped>\
        <v-card-title>\
            {{item.from}} <span class="body-2">&nbsp; &nbsp; 回复&nbsp; &nbsp; </span> {{item.to}}\
            <v-spacer></v-spacer>\
            <span class="caption">{{item.pub_date}}</span>\
        </v-card-title>\
        <v-card-text class="body-1">\
            <p class="text--primary">{{item.content}}</p>\
        </v-card-text>\
        <v-card-actions>\
            <v-btn text v-if="!item.IsLiking" min-width="80" max-width="80" @click="comment_like">\
                <v-icon small left color="grey">mdi-thumb-up</v-icon>\
                {{item.like_num}}\
            </v-btn>\
            <v-btn text color="blue" v-if="item.IsLiking" min-width="80" max-width="80" @click="comment_like">\
                <v-icon small left>mdi-thumb-up</v-icon>\
                {{item.like_num}}\
            </v-btn>\
            <v-btn text @click="show_response_editor=!show_response_editor" v-if="!show_response_editor">回复</v-btn>\
            <v-btn text @click="show_response_editor=!show_response_editor" v-if="show_response_editor" color="blue">收起</v-btn>\
            <v-btn text small color="grey" v-if="current_user_id == item.from" @click="req_comment_delete">删除</v-btn>\
        </v-card-actions>\
        <v-card-actions>\
            <v-textarea label="输入你的评论内容" outlined color="blue" height="50" v-if="show_response_editor" class="mt-2" v-model = "__comment"></v-textarea>\
            <v-btn color="primary" v-if="show_response_editor" class="mb-4" min-width="80" @click="pub_comment">发布</v-btn>\
        </v-card-actions>\
    </v-card>\
    ',
    
    data: function(){
        return {
            current_user_id : user_id,
            show_response_editor : false,
            __comment : ""
        }
    },
    methods:{
        comment_like: function(){
            this.$emit('like_comment', this.idx)
        },
        pub_comment: function(){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }
            if(this.__comment == ""){
                alert("回复不能为空")
                return;
            }
            axios.post(url + '/comment/create/', data = {
                target_type : 3,
                target_id : this.item.id,
                parent_comment_id: this.parent_id,
                content : this.__comment
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_pub_comment(response)))
            .catch(function(error){
                console.log(error);
            });
        },
        ack_pub_comment : function(response){
            var data = response.data;
            if(data.err_code == 0){
                alert("回复成功")
                this.$emit('comment_respond')
            }else{
                alert("回复失败\n" + data.message);
            }
        },

        //删除回复
        //GET /comment/<int:comment_id>/delete/
        req_comment_delete: function(){
            if(user_id != this.item.from || !is_logged_in){
                alert("无法删除")
                return
            }
            var r = confirm("是否确认删除");
            if(!r){
                return
            }

            axios.get(url + '/comment/' + this.item.id + '/delete/', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_comment_delete(response)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_comment_delete: function(response){
            var data = response.data
            if(data.err_code == -1){
                alert("删除失败")
                return
            }
            alert("删除成功")
            this.$emit('comment_delete')
        }
    }
})

Vue.component('single_comment',{
    props:["item", "idx"],
    template: '\
    <div>\
        <v-card shaped>\
            <v-card-title>\
                {{item.from}} \
                <v-spacer></v-spacer>\
                <span class="caption">{{item.pub_date}}</span>\
            </v-card-title>\
            <v-card-text class="body-1">\
                <p class="text--primary">{{item.content}}</p>\
            </v-card-text>\
            <v-card-actions>\
                <v-btn text v-if="!item.IsLiking" min-width="80" max-width="80" @click="like_comment">\
                    <v-icon small left color="grey">mdi-thumb-up</v-icon>\
                    {{item.like_num}}\
                </v-btn>\
                <v-btn text color="blue" v-if="item.IsLiking" min-width="80" max-width="80" @click="like_comment">\
                    <v-icon small left>mdi-thumb-up</v-icon>\
                    {{item.like_num}}\
                </v-btn>\
                <v-btn text @click="show_response_editor=!show_response_editor" v-if="!show_response_editor">回复</v-btn>\
                <v-btn text @click="show_response_editor=!show_response_editor" v-if="show_response_editor" color="blue">收起</v-btn>\
                <v-btn text small color="grey" v-if="current_user_id == item.from" @click="req_comment_delete">删除</v-btn>\
                <v-spacer></v-spacer>\
                <v-btn text color="blue" @click="req_comment_list" v-if="!show_comments" min-width="80">显示其他回复{{item.comment_num}}</v-btn>\
                <v-btn outlined color="blue" @click="pack_up_comments" v-if="show_comments" min-width="80">隐藏其他回复</v-btn>\
            </v-card-actions>\
            <v-card-actions>\
                <v-textarea label="输入你的评论内容" outlined color="blue" height="50" v-if="show_response_editor" class="mt-2" v-model = "__comment"></v-textarea>\
                <v-btn color="primary" v-if="show_response_editor" class="mb-4" min-width="80" @click="req_pub_comment">发布</v-btn>\
            </v-card-actions>\
        </v-card>\
        <v-divider></v-divider>\
        <div v-if="show_comments" class = "ml-12">\
            <single_subcomment v-bind:item="tool, idx" v-bind:parent_id="item.id" v-for="(tool, idx) in sub_comments" \
            v-on:like_comment = "req_comment_like" v-on:comment_respond = "req_comment_list" \
            v-on:comment_delete = "req_comment_list"></single_subcomment>\
        </div>\
    </div>\
    ',
    data: function(){
        return {
            current_user_id : user_id,
            show_comments: false,
            sub_comments: [],
            show_response_editor : false,
            __comment : ""
        }
    },

    methods:{
        req_pub_comment: function(){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }
            if(this.__comment == ""){
                alert("回复不能为空")
                return;
            }
            axios.post(url + '/comment/create/', data = {
                target_type : 3,
                target_id : this.item.id,
                parent_comment_id: this.item.id,
                content : this.__comment
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_pub_comment(response)))
            .catch(function(error){
                console.log(error);
            });
        },
        ack_pub_comment : function(response){
            var data = response.data;
            if(data.err_code == -1){
                alert("回复失败\n" + data.message)
            }else{
                alert("回复成功")
                this.req_comment_list()
            }
        },

        //删除回复
        //GET /comment/<int:comment_id>/delete/
        req_comment_delete: function(){
            if(user_id != this.item.from || !is_logged_in){
                alert("无法删除")
                return
            }
            var r = confirm("是否确认删除");
            if(!r){
                return
            }
            
            axios.get(url + '/comment/' + this.item.id + '/delete/', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_comment_delete(response)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_comment_delete: function(response){
            var data = response.data
            if(data.err_code == -1){
                alert("删除失败")
                return
            }
            alert("删除成功")
            location.reload()
        },

        //点赞一条回答的评论
        //GET /comment/<int:comment_id>/like/
        req_comment_like: function(idx){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }
            axios.get(url + '/comment/' + this.sub_comments[idx].id + '/like/', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_comment_like(response, idx)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_comment_like: function(response, idx){
            if(response.data.err_code == 0){
                if(this.sub_comments[idx].IsLiking == false){
                    this.sub_comments[idx].IsLiking = true
                    this.sub_comments[idx].like_num = this.sub_comments[idx].like_num + 1
                }else{
                    this.sub_comments[idx].IsLiking = false
                    this.sub_comments[idx].like_num = this.sub_comments[idx].like_num - 1
                }
            }else{
                alert("failed to get comment like")
            }
        },

        like_comment: function(){
            this.$emit('like_comment', this.idx)
        },  

        pack_up_comments: function(){
            this.show_comments = false;
        },

        req_comment_list: function(){
            this.show_comments = true;
            //POST /comment/list/
            axios.post(url + '/comment/list/', data = {
                target_type: 3,
	            target_id: this.item.id,
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_comment_list(response)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_comment_list: function(response){
            if(response.data.err_code == -1){
                alert("failed to get comment list")
                return
            }else{
                var data = response.data.data
                this.sub_comments = data
            }
        }
    },
  })





new Vue({
    el: '#article_page',
    vuetify: new Vuetify(),

    data: {
        article_id : "",
        title : "",
        content : "",
        author : "",
        pub_date: "",
        q_is_liking : false,
        q_is_collecting : false,
        q_like_num : 0,
        q_collect_num : 0,
        comments : [],
        __comment : ""
    },
    mounted (){
        this.article_id = this.get_article_id("article_id");

        //首先获取issue详细信息
        axios.get(url + '/issue/' + this.article_id + '/detail/', {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(response => (this.ack_issue_detail(response)))
        .catch(function(error){
            console.log(error);
        });
        //接下来获取问题的所有评论
        axios.post(url + '/comment/list/',  data = {
            target_type: 1,
            target_id: this.article_id,
        }, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(response => (this.ack_comment_list(response)))
        .catch(function(error){
            console.log(error);
        });

    },

    methods: {

        get_article_id: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if (r != null)
            context = r[2];
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        },
        req_pub_comment: function(){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }
            if(this.__comment == ""){
                alert("回复不能为空")
                return;
            }
            axios.post(url + '/comment/create/', data = {
                target_type : 1,
                target_id : this.article_id,
                parent_comment_id: -1,
                content : this.__comment
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_pub_comment(response)))
            .catch(function(error){
                console.log(error);
            });
        },
        ack_pub_comment : function(response){
            var data = response.data;
            if(data.err_code == -1){
                alert("回复失败\n" + data.message)
            }else{
                alert("回复成功")
                location.reload()
            }
        },

        // GET /comment/<int:comment_id>/like/
        req_comment_like: function(idx){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }
            axios.get(url + '/comment/' + this.comments[idx].id + '/like/', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_comment_like(response, idx)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_comment_like: function(response, idx){
            var data = response.data
            if(data.err_code == 0){
                if(this.comments[idx].IsLiking == false){
                    this.comments[idx].IsLiking = true
                    this.comments[idx].like_num = this.comments[idx].like_num + 1
                }else{
                    this.comments[idx].IsLiking = false
                    this.comments[idx].like_num = this.comments[idx].like_num - 1
                }
            }else{
                console.log(data)
            }
        },



        //GET /issue/<int:issue_id>/collect/
        req_issue_collect: function(){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }

            axios.get(url + '/issue/' + this.article_id + '/collect/', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_issue_collect(response)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_issue_collect: function(response){
            var data = response.data.data
            if(response.data.err_code == 0){
                if(this.q_is_collecting){
                    this.q_is_collecting = 0;
                    this.q_collect_num = this.q_collect_num - 1;
                }else{
                    this.q_is_collecting = 1;
                    this.q_collect_num = this.q_collect_num + 1;
                }
            }else{
                alert("failed to get issue collect")
            }
        },

        //GET /issue/<int:issue_id>/like/
        req_issue_like: function(){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }

            axios.get(url + '/issue/' + this.article_id + '/like/', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_issue_like(response)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_issue_like: function(response){
            var data = response.data.data
            if(response.data.err_code == 0){
                if(this.q_is_liking){
                    this.q_is_liking = 0;
                    this.q_like_num = this.q_like_num - 1;
                }else{
                    this.q_is_liking = 1;
                    this.q_like_num = this.q_like_num + 1;
                }
            }else{
                alert("failed to get issue like")
            }
        },
        ack_issue_detail: function(response){
            if(response.data.err_code == -1){
                console.log(response);
                return;
            }
            var data = response.data.data;
            this.title = data.title
            this.content = data.content
            this.author = data.author
            this.pub_date = data.pub_date
            this.q_is_liking = data.IsLiking;
            this.q_is_collecting = data.IsCollecting;
            this.q_like_num = data.like_num;
            this.q_collect_num = data.collect_num;
        },
        ack_comment_list: function(response){
            if(response.data.err_code == -1){
                alert("filed to get comment list")
                return
            }else{
                var data = response.data.data
                this.comments = data
            }
        },

        sort_hotest: function(){
            this.comments.sort(compare_hotest)
        },

        sort_newest: function(){
            this.comments.sort(compare_newest)
        }

    }
})

