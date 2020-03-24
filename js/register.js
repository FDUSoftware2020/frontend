//注册
var vm = new Vue({
    el: '#register_container',

    data: {
        id : "",
        pwd : "",
        email : ""
    },

    methods: {
        register : function() {
            alert(this.id + ' ' + this.pwd + ' ' + this.email)
        }
    }
})