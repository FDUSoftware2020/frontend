new Vue({
    el: '#login_page',
    vuetify: new Vuetify(),

    data: {
        id : "",
        pwd : ""
    },

    methods: {
        req_login : function() {
            if(is_logged_in == true){
                alert("请先登出后再登录！")
            }
            else if(this.id == "" || this.pwd == ""){
                alert("请输入用户名和密码！")
            }else{
                axios.post(url + '/account/login/', data = {
                    username : this.id,
                    password : this.pwd
                }, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(response => (this.ack_login(response)))
                .catch(function(error){
                    console.log(error);
                });
            }
        },

        ack_login : function(response){
            var data = response.data;
            if(data.err_code == 0){
                alert("登录成功！欢迎" + this.id);
                location = 'home.html'
            }else{
                alert("登录失败\n" + data.message);
            }
            //location.reload(); 
        }

    }
})