//注册
var vm = new Vue({
    el: '#register_container',

    data: {
        id : "",
        pwd : "",
        email : ""
    },

    methods: {
        req_register : function() {
            if(this.id == "" || this.pwd == ""){
                alert("请输入用户名和密码！")
            }else{
                //var json = '{"username" : "' + this.id + '",' + ' "password" : "' + this.pwd + '"}';
                //alert(json)
                axios.post('http://127.0.0.1:5000/account/register', data = {
                    username : this.id,
                    password : this.pwd
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
            }else{
                alert("注册失败\n" + data.message);
            }
            location.reload(); 
        }

    }
})