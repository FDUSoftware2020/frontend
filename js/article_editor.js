new Vue({
    el: '#article_editor_page',
    vuetify: new Vuetify(),
    data() {
        return { 
            value: '',
            title: '', 
            img_file: {},
        };
    },
    methods:{
        // 绑定@imgAdd event
        $update_content(content){
            this.value = content;
        },
        $img_add(pos, $file){
            // 缓存图片信息
            this.img_file[pos] = $file;
        },
        $img_del(pos){
            delete this.img_file[pos];
        },
        async release_issue(){
            // 第一步, 检查标题和文章内容是否符合要求
            if (this.title == '' || this.value == ''){
                window.alert('标题或文章内容为空!');
                return;
            }
            
            var formdata = new FormData();
            for(var _img in this.img_file){
                formdata.append(_img, this.img_file[_img]);
            }

            await axios.post(url + '/image/upload/', data = formdata, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((res) => {
                /**
                 * 例如：返回数据为 res.data.data.img_list = {pos1: url1, pos2: url2, ...}
                 * pos 为原图片标志（0）
                 * url 为上传后图片的url地址
                 */
                // 第三步, 将返回的url替换到文本原位置![...](0) -> ![...](url)
                if(res.data.err_code == -1){
                    console.log(res);
                    window.alert(res.data.message);
                }else{
                    res_img_list = res.data.data
                    for (var img_pos in res_img_list) {
                        // 将md源码中图片文件名替换为url
                        this.$refs.md.img2Url(img_pos, res_img_list[img_pos]);
                    }
                }
            }).catch(function(error){
                console.log(error);
            });

            // 第四步, 将文章的md源码发送给后端
            await axios.post(url + '/issue/create/', data = {
                "type": 1,
                "title": this.title,
                "content": this.value,
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then((res) => {
                if(res.data.err_code == -1){
                    console.log(res);
                    window.alert(res.data.message);
                    return;
                }else{
                    // 跳转到文章页面, 待修改
                    // window.location.href = url + "/question.html";
                    console.log(res);
                }
            }).catch(function(error){
                console.log(error);
            });
            
        },
    },
  })