//排序
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

Vue.component('single_subcomment',{
    props:["item", "idx"],
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
            <v-btn text>回复</v-btn>\
        </v-card-actions>\
    </v-card>\
    ',
    methods:{
        comment_like: function(){
            this.$emit('like_comment', this.idx)
        },
    }
})

Vue.component('single_answer',{
    props:["item", "idx"],
    template: '\
    <div>\
        <v-card>\
            <v-card-title class="font-weight-bold">\
                {{item.author}}\
                <v-spacer></v-spacer>\
                <p class="body-2">发布于 {{item.pub_date}}</p>\
            </v-card-title>\
            <v-card-text class="body-1">\
                <p class="text--primary">{{item.content}}</p>\
            </v-card-text>\
            <v-card-actions>\
                <v-btn text color="blue" @click="like_answer" v-if="!item.IsLiking" min-width="80" max-width="80">赞同{{item.like_num}}</v-btn>\
                <v-btn outlined color="blue" @click="like_answer" v-if="item.IsLiking" min-width="80" max-width="80">已赞同{{item.like_num}}</v-btn>\
                <v-btn text color="blue" @click="req_comment_list" v-if="!show_comments" min-width="80">评论{{item.comment_num}}</v-btn>\
                <v-btn outlined color="blue" @click="pack_up_comments" v-if="show_comments" min-width="80">收起评论</v-btn>\
            </v-card-actions>\
        </v-card>\
        <v-divider></v-divider>\
        <div v-if="show_comments" class = "ma-4">\
            <single_subcomment v-bind:item="tool, idx" v-for="(tool, idx) in sub_comments" v-on:like_comment = "req_comment_like"></single_subcomment>\
        </div>\
    </div>\
    ',
    data: function(){
        return {
            show_comments: false,
            /*
            {
	            "id": <int>,
	            "from": <str, 发送方>,
	            "to": <str, 接收方>,
	            "pub_date": <str, 发布时间>,
	            "content": <str, 内容>,
	            "like_num": <str, 点赞数>,
	            "IsLiking": <bool, True表示当前用户已点赞, False表示未点赞, 未登录时默认False>
            }
            */
            sub_comments: [],
        }
    },

    methods:{
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
                alert("ops")
            }
        },

        like_answer: function(){
            this.$emit('like_answer', this.idx)
        },  

        pack_up_comments: function(){
            this.show_comments = false;
        },

        req_comment_list: function(){
            this.show_comments = true;
            //POST /comment/list/
            axios.post(url + '/comment/list/', data = {
                target_type: 2,
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
                alert("oops")
                return
            }else{
                var data = response.data.data
                this.sub_comments = data
            }
        }
    },
  });



new Vue({
    el: '#question_page',
    vuetify: new Vuetify(),
    data:{
        question_id : '17307130009', //当前页面显示的问题id
        title: "",
        content: "",
        pub_date: "",
        author: "",
        q_is_liking : false,
        q_is_collecting : false,
        q_like_num : 0,
        q_collect_num : 0,
        /*
        {
            "id": <int>,
	        "author": <str, 回答者的用户名>,
	        "pub_date": <str, 回答时间>,
	        "content": <str, 回答的内容>,
	        "like_num": <int, 点赞数>,
	        "IsLiking": <bool, True表示当前用户已点赞, False表示未点赞, 未登录时默认False>,
	        "comment_num": <int, 评论数目>
        }
        */
        Answers:[]
    },
    mounted (){
        //首先获取questionid
        this.question_id = this.get_question_id("question_id");
        //alert(this.question_id)

        //首先获取issue详细信息
        //GET /issue/<int:issue_id>/detail/
        axios.get(url + '/issue/' + this.question_id + '/detail/', {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(response => (this.ack_issue_detail(response)))
        .catch(function(error){
            console.log(error);
        });
        //接下来获取问题的所有回答
        //GET /issue/<int:issue_id>/answer_list/
        axios.get(url + '/issue/' + this.question_id + '/answer_list/', {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(response => (this.ack_issue_answer_list(response)))
        .catch(function(error){
            console.log(error);
        });

    },
    methods:{
        //从url参数中获取问题的id
        get_question_id: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if (r != null)
            context = r[2];
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        },

        //点赞一条回答
        // GET /issue/answer/<int:answer_id>/like/
        req_answer_like: function(idx){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }
            axios.get(url + '/issue/answer/' + this.Answers[idx].id + '/like/', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_answer_like(response, idx)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_answer_like: function(response, idx){
            var data = response.data
            if(data.err_code == 0){
                if(this.Answers[idx].IsLiking == false){
                    this.Answers[idx].IsLiking = true
                    this.Answers[idx].like_num = this.Answers[idx].like_num + 1
                }else{
                    this.Answers[idx].IsLiking = false
                    this.Answers[idx].like_num = this.Answers[idx].like_num - 1
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

            axios.get(url + '/issue/' + this.question_id + '/collect/', {
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
                alert("ops")
            }
        },

        //GET /issue/<int:issue_id>/like/
        req_issue_like: function(){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }

            axios.get(url + '/issue/' + this.question_id + '/like/', {
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
                alert("ops")
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

        ack_issue_answer_list: function(response){
            var data = response.data.data;
            this.Answers = data
        },

        sort_hotest: function(){
            this.Answers.sort(compare_hotest)
        },

        sort_newest: function(){
            this.Answers.sort(compare_newest)
        }
    },
})