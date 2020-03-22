var vm = new Vue({
    el: '#vue-sign',

    data: {
        id : "",
        pwd : ""
    },

    methods: {
        sign_in : function() {
            alert(this.id + " " + this.pwd)
        }
    }
});