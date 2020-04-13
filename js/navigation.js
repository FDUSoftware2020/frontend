//每个页面最初的导航栏，每个需要导航栏的页面都需要引入

new Vue({
    el: '#header_nav',
    data: {
      message: '<header>\
                    <div class="container">\
                        <div class="logo-container">\
                        <!-- Website Logo -->\
                            <a href="home.html"  title="FSDN">\
                                <img src="images/logo.png" alt="FSDN">\
                            </a>\
                            <span class="tag-line">Fudan Software Developer Network</span>\
                        </div>\
                        <!-- Start of Main Navigation -->\
                        <nav class="main-nav">\
                            <div class="menu-top-menu-container">\
                                    <ul id="menu-top-menu" class="clearfix">\
                                    <li><a href="home.html">Home</a></li>\
                                    <li><a href="sign.html">Sign</a></li>\
                                    <li><a href="register.html">Register</a></li>\
                                    <li><a href="#" id = "User_Name">User</a>\
                                        <ul class="sub-menu">\
                                            <li><a>wait</a></li>\
                                            <li><a>for</a></li>\
                                            <li><a>more</a></li>\
                                            <li><a>detail</a></li>\
                                            <li><button onclick="req_logout()">Logout</button></li>\
                                        </ul>\
                                    </li>\
                                </ul>\
                            </div>\
                        </nav>\
                        <!-- End of Main Navigation -->\
                    </div>\
                </header>'
    }
  })