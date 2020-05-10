new Vue({
    el: '#home_page',
    vuetify: new Vuetify(),
    data: {
        detail: [{
            "id": 0,
            "type": 0,
            "title": "这是一个标题",
            "author": "张三",
            "pub_date": "2020-10-10",
            "content": "get the question or some lines of the article",
            "collect_num": 111,
            "like_num": 11,
            "IsCollecting": true,
            "IsLiking":  false,
        },
        {
            "id": 0,
            "type": 0,
            "title": "这是一个标题",
            "author": "张三",
            "pub_date": "2020-10-10",
            "content": "get the question or some lines of the article",
            "collect_num": 111,
            "like_num": 11,
            "IsCollecting": true,
            "IsLiking":  false,
        },
        {
            "id": 0,
            "type": 0,
            "title": "这是一个标题",
            "author": "张三",
            "pub_date": "2020-10-10",
            "content": "get the question or some lines of the article",
            "collect_num": 111,
            "like_num": 11,
            "IsCollecting": true,
            "IsLiking":  false,
        },
        {
            "id": 0,
            "type": 0,
            "title": "这是一个标题",
            "author": "张三",
            "pub_date": "2020-10-10",
            "content": "get the question or some lines of the article",
            "collect_num": 111,
            "like_num": 11,
            "IsCollecting": true,
            "IsLiking":  false,
        },
        {
            "id": 1,
            "type": 1,
            "title": "这又是一个标题",
            "author": "李四",
            "pub_date": "2020-02-02",
            "content": "get the question or some lines of the article",
            "collect_num": 222,
            "like_num": 22,
            "IsCollecting": false,
            "IsLiking":  true,
        }
        ],
        like_color: ["grey", "pink"],
        collect_color: ["grey", "yellow"],
        
    },
/*
    computed: {
        like_icon: function(i){
            // alert(this.like_color[this.detail[1].IsLiking])
            if(this.detail[1].IsLiking){
                return "pink"
            }
            else{
                return "grey"
            }
        },
        collect_icon: function(i){
            alert(this.collect_color[this.detail[i].IsCollecting])
             return this.collect_color[this.detail[i].IsCollecting]
        },
    },
*/
    mounted: function() {
        this.load_recommendation();
    },
    methods: {
        load_recommendation: function(){
            key = "？"
            axios.post(url + '/issue/search/', data = {
                keyword : key
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
            })
            .then(response => (this.ack_search(response)))
            .catch(function(error){
                console.log(error);
            });
        },
        send_keyword: function(){
            key = decodeURI(window.location.href.split('=')[1])
            axios.post(url + '/issue/search/', data = {
                keyword : key
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            })
            .then(response => (this.ack_search(response)))
            .catch(function(error){
                console.log(error);
            });
        },
        
        like_icon: function(i){
            if(this.detail[i].IsLiking){
                return "pink"
            }
            else{
                return "grey"
            }
        },
        collect_icon: function(i){
            if(this.detail[i].IsCollecting){
                return "yellow"
            }
            else{
                return "grey"
            }
        },
        
        like: function(i){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }
            this.detail[i].IsLiking = !this.detail[i].IsLiking
            if(this.detail[i].IsLiking){
                this.detail[i].like_num += 1
            }else{
                this.detail[i].like_num -= 1
            }
            alert(this.like_color[int(this.detail[i].IsLiking)])
            like_icon(i)

            axios.get(url + '/issue/' + this.detail[i].issue_id + '/like/', 
                data = {}, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_like(response)))
            .catch(function(error){
                console.log(error);
            });
        },
        collect: function(i){
            if(!is_logged_in){
                alert("请先登录！")
                location = "sign.html"
            }
            this.detail[i].IsCollecting = !this.detail[i].IsCollecting
            if(this.detail[i].IsCollecting){
                this.detail[i].collect_num += 1
            }else{
                this.detail[i].collect_num -= 1
            }

            axios.get(url + '/issue/' + this.detail[i].issue_id + '/collect/', 
                data = {}, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_collect(response)))
            .catch(function(error){
                console.log(error);
            });
        },

        more_detail: function(i){
            if(this.detail[i].type == 0){
                window.location.href = "question.html?question_id=" + this.detail[i].id
              }
              else{
                window.location.href = "article.html?article_id=" + this.detail[i].id
              }
        },

        ack_search: function(response){
            var data = response.data
            console.log(response)
            if(data.err_code == 0){
                this.detail = data.data
            }else{
                alert("搜索失败")
            }
        },
        ack_like: function(response){
            var data = response.data
            if(data.err_code == 0){
                this.detail = data.data
            }else{
                alert("喜欢失败")
            }
        },
        ack_collect: function(response){
            var data = response.data
            if(data.err_code == 0){
                this.detail = data.data
            }else{
                alert("收藏失败")
            }
        },

    }
})