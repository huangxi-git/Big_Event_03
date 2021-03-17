$(function () {

    // 点击去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    // 点击去登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });


    // 自定义验证
    let form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/, '密码必须6-12位',
        ],
        // 确认密码
        repwd: function (value) {
            // 拿到 注册页面里的 第一个密码内容
            let pwd = $('.reg-box input[name=password]').val();
            // 第一次输入的密码 和 确认密码 对比
            if (value !== pwd) {
                return '两次密码不一致！';
            };
        },
    });


    let layer = layui.layer;
    // 实现注册功能
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        // 发送请求
        $.ajax({
            type: 'post',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    // 注册失败
                    return layer.msg(res.message);
                };
                // 注册成功
                layer.msg(res.message);
                // 切换到登录页面
                $('#link_login').click();
                // 重置表单
                $('#layui-form')[0].reset();
            },
        });
    });


    // 实现登录功能
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    // 登录失败
                    return layer.msg(res.message);
                };
                // 登录成功
                layer.msg(res.message);
                // 保存 token 
                localStorage.setItem('token', res.token);
                // 跳转页面
                location.href = '/index.html';
            },
        });
    })






});