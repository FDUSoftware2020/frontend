//登录
var vm = new Vue({
    el: '#login_container',

    data: {
        id : "",
        pwd : ""
    },

    methods: {
        req_login : function() {
            if(this.id == "" || this.pwd == ""){
                alert("请输入用户名和密码！")
            }else{
                //var json = '{"username" : "' + this.id + '",' + ' "password" : "' + this.pwd + '"}';
                //alert(json)
                axios.post('http://127.0.0.1:5000/account/login', data = {
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
            }else{
                alert("登录失败\n" + data.message);
            }
            location.reload(); 
        }

    }
});