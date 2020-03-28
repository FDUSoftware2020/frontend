//注册和发送验证码
var vm = new Vue({
    el: '#register_container',

    data: {
        id : "",
        pwd : "",
        pwd_re : "",
        email : "",
        verification : "",

        last_verify_time : 0
    },

    methods: {
        req_register : function() {
            if(this.id == "" || this.pwd == "" || this.pwd_re == "" || this.email == "" || this.verification == ""){
                alert("请输入用户名、密码邮箱以及验证码！")
            }else if(this.pwd != this.pwd_re){
                alert("两次输入的密码不一致！")
            }else if(this.pwd.length < 6){
                alert("密码长度至少为6位！")
            }else if(this.verification.length != 4){
                alert("验证码错误！")
            }else{
                axios.post(url + '/account/register', data = {
                    username : this.id,
                    password : this.pwd,
                    email : this.email,
                    verification : this.verification
                }, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(response => (this.ack_register(response)))
                .catch(function(error){
                    console.log(error);
                });
            }
        },

        ack_register : function(response){
            var data = response.data;
            if(data.err_code == 0){
                alert("恭喜注册成功！请牢记用户名和密码");
                location.reload()
            }else{
                alert("注册失败\n" + data.message);
            }
        },

        req_verify : function(){
            //验证邮箱格式
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(!myreg.test(this.email)){
                alert("邮箱格式错误")
                return
            }
            //验证发送间隔
            var curtime = new Date().getTime()
            console.log(curtime)
            if(curtime - this.last_verify_time < 60000){
                document.getElementById("btnVerify").innerHTML = "发送过于频繁请一分钟后再试";
                return
            }

            this.last_verify_time = curtime

            axios.post(url + '/account/verify', data = {
                email : this.email,
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(response => (this.ack_verify(response)))
            .catch(function(error){
                console.log(error);
            });
        },

        ack_verify : function(response){
            var data = response.data
            if(data.err_code == 0){
                document.getElementById("btnVerify").innerHTML = "发送成功";
            }else{
                document.getElementById("btnVerify").innerHTML = "发送失败" + data.message;
            }
        }

    }
})