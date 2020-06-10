new Vue({
    el: '#profile_page',
    vuetify: new Vuetify(),
    data: {
        tab_ptr: null,
        tabs: ["收藏", "回答", "文章"],
        tabs_content: {
            "收藏": [{
                "id": 0,
                "type": 0,
                "title": "这是一个收藏",
                "author": "张三",
                "pub_date": "2020-10-10",
                "content": "get the question or some lines of the article",
                "collect_num": 111,
                "like_num": 11,
                "IsCollecting": true,
                "IsLiking": false,
            }, ],
            "回答": [{
                "id": 0,
                "type": 0,
                "title": "这是一个回答",
                "author": "张三",
                "pub_date": "2020-10-10",
                "content": "get the question or some lines of the article",
                "collect_num": 111,
                "like_num": 11,
                "IsCollecting": true,
                "IsLiking": false,
            }, ],
            "文章": [{
                "id": 0,
                "type": 0,
                "title": "这是一个文章",
                "author": "张三",
                "pub_date": "2020-10-10",
                "content": "get the question or some lines of the article",
                "collect_num": 111,
                "like_num": 11,
                "IsCollecting": true,
                "IsLiking": false,
            }, ],

        },
        log_in: false,
        user_id: '未登录',
        user_email: "",
        user_signature: "",
        user_contribution: "",
        is_edit: false,
        input_signature: "",
        like_color: ["grey", "pink"],
        collect_color: ["grey", "yellow"],

    },
    mounted: function () {
        this.req_login()
        this.load_items();
    },
    methods: {
        req_login: async function () {
            await axios.get(url + '/account/ask_login_user/', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => (this.ack_login(response)))
                .catch(function (error) {
                    console.log(error);
                });
            if(!this.log_in){
                alert("请先登录！")
                location = "sign.html"
                return
            }
        },

        req_user: async function (){
            axios.post(url + '/account/ask_user/', data = {
                "username" : this.user_id,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => (this.ack_user(response)))
            .catch(function (error) {
                console.log(error);
            });
        },

        ack_login: async function (response) {
            if (response.data.err_code == -1) {
                this.log_in = false
                return;
            }
            var data = response.data.data;
            if (data != "") {
                this.log_in = true
                this.user_id = data
                this.req_user()
            }else{
                this.log_in = false
            }
        },

        ack_user: async function (response) {
            
            if (response.data.err_code == -1) {
                console.log(response.data)
                return;
            }
            var data = response.data.data;
            console.log(data)
            this.user_email = data.email
            this.user_signature = data.signature
            this.user_contribution = data.contribution
        },

        load_items: function () {
            axios.get(url + '/issue/collection_list/', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                })
                .then(response => (this.ack_collection_list(response)))
                .catch(function (error) {
                    console.log(error);
                });

            axios.get(url + '/issue/publication_list/', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                })
                .then(response => (this.ack_publication_list(response)))
                .catch(function (error) {
                    console.log(error);
                });
        },

        like_icon: function (tab_choice, i) {
            if (this.tabs_content[tab_choice][i].IsLiking) {
                return "pink"
            } else {
                return "grey"
            }
        },
        collect_icon: function (tab_choice, i) {
            if (this.tabs_content[tab_choice][i].IsCollecting) {
                return "yellow"
            } else {
                return "grey"
            }
        },

        like: function (tab_choice, i) {
            if (!is_logged_in) {
                alert("请先登录！")
                location = "sign.html"
            }
            // this.tabs_content[tab_choice][i].IsLiking = !this.tabs_content[tab_choice][i].IsLiking
            // if(this.tabs_content[tab_choice][i].IsLiking){
            // 	this.tabs_content[tab_choice][i].like_num += 1
            // }else{
            // 	this.tabs_content[tab_choice][i].like_num -= 1
            // }

            axios.get(url + '/issue/' + this.tabs_content[tab_choice][i].id + '/like/', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => (this.ack_like(response, tab_choice, i)))
                .catch(function (error) {
                    console.log(error);
                });
        },
        collect: function (tab_choice, i) {
            if (!is_logged_in) {
                alert("请先登录！")
                location = "sign.html"
            }
            // this.tabs_content[tab_choice][i].IsCollecting = !this.tabs_content[tab_choice][i].IsCollecting
            // if(this.tabs_content[tab_choice][i].IsCollecting){
            // 	this.tabs_content[tab_choice][i].collect_num += 1
            // }else{
            // 	this.tabs_content[tab_choice][i].collect_num -= 1
            // }

            axios.get(url + '/issue/' + this.tabs_content[tab_choice][i].id + '/collect/', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => (this.ack_collect(response, tab_choice, i)))
                .catch(function (error) {
                    console.log(error);
                });
        },

        more_detail: function (tab_choice, i) {
            if (this.tabs_content[tab_choice][i].type == 0) {
                window.location.href = "question.html?question_id=" + this.tabs_content[tab_choice][i].id
            } else {
                window.location.href = "article.html?article_id=" + this.tabs_content[tab_choice][i].id
            }
        },

        modify_signature : function() {
            
            axios.post(url + '/account/modify_signature/', data = {
                "signature" : this.input_signature,
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_modify_signature(response)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_modify_signature : function(response){
            var data = response.data;
            if(data.err_code == 0){
                this.req_user()
                this.is_edit = false
            }
            //location.reload(); 
        },

        ack_collection_list: function (response) {
            var data = response.data
            if (data.err_code == 0) {
                this.tabs_content["收藏"] = data.data
            } else {
                console.log("请求收藏列表失败")
            }
        },
        ack_publication_list: function (response) {
            var data = response.data
            if (data.err_code == 0) {
                this.tabs_content["回答"] = []
                this.tabs_content["文章"] = []
                for (var i in data.data) {
                    var issue = data.data[i]
                    if (Number(issue["type"]) == 0) {
                        this.tabs_content["回答"].push(issue);
                    } else if (Number(issue["type"]) == 1) {
                        this.tabs_content["文章"].push(issue);
                    }
                }
            } else {
                console.log("请求发布列表失败")
            }
        },
        ack_like: function (response, tab_choice, i) {
            var data = response.data
            if (data.err_code == 0) {
                this.tabs_content[tab_choice][i].IsLiking = !this.tabs_content[tab_choice][i].IsLiking
                if (this.tabs_content[tab_choice][i].IsLiking) {
                    this.tabs_content[tab_choice][i].like_num += 1
                } else {
                    this.tabs_content[tab_choice][i].like_num -= 1
                }
            } else {
                console.log("点赞失败")
            }
        },
        ack_collect: function (response, tab_choice, i) {
            var data = response.data
            if (data.err_code == 0) {
                this.tabs_content[tab_choice][i].IsCollecting = !this.tabs_content[tab_choice][i].IsCollecting
                if (this.tabs_content[tab_choice][i].IsCollecting) {
                    this.tabs_content[tab_choice][i].collect_num += 1
                } else {
                    this.tabs_content[tab_choice][i].collect_num -= 1
                }
            } else {
                console.log("收藏失败")
            }
        },
        

    }
})