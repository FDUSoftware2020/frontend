//每个网页加载时先进行的工作，主要是重要的全局变量和判断是否在线,每个html文件都需要最先引入

//判断是否在线的全局变量，每个html页面对应的js文件都有该变量
var is_logged_in = false;
var user_id = "";
var user_email = "";

function ack_ask_user(response){
    if(response.data.err_code == -1){
        console.log(response);
        return;
    }
    var data = response.data.data
    if(JSON.stringify(data) != '{}'){
        is_logged_in = true;
        user_id = data.username;
        user_email = data.email;
        document.getElementById("User_Name").innerHTML = user_id;
    }
}

var url = "http://182.92.131.202:8000"

//进入页面，首先发送是否已登录的请求,每个页面对应的js文件都有该操作
axios.get(url + '/account/ask_user/', {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
.then(response => (ack_ask_user(response)))
.catch(function(error){
    console.log(error);
});