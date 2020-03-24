//登录
var vm = new Vue({
    el: '#login_container',

    data: {
        id : "",
        pwd : ""
    },

    methods: {
        log_in : function() {
            alert(this.id + ' ' + this.pwd)
        }
    }
});