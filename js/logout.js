//处理登出，每个html页面都引入该文件，is_logged_in定义与preload.js中
function req_logout(){
    if(is_logged_in){
        axios.get(url + '/account/logout', {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(response => (ack_logout(response)))
        .catch(function(error){
            console.log(error);
        });
    }else{
        alert("请先登录后再登出")
    }
}

function ack_logout(response){
    var data = response.data
    if(data.err_code == 0){
        location.reload()
    }else{
        console(response.message)
    }
}
