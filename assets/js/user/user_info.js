$(function () {

    let form = layui.form;
    // 自定义判断输入昵称长度
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度1-6！';
            };
        },
    });


    // 将用户数据渲染到页面
    initUserInfo();

    let layer = layui.layer;
    // 封装函数
    function initUserInfo() {
        // 发送请求
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                // 渲染到页面
                form.val('formUserInfo', res.data);
            },
        });
    };


    // 点击重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        // 将用户数据渲染到页面
        initUserInfo();
    });



    // 修改用户信息---form 表单 提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // 发送请求
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('修改成功！');
                // 调用父级页面中渲染名字和头像的函数
                window.parent.getUserInfo();
            },
        });
    });





});