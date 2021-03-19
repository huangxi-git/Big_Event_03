$(function () {

    let layer = layui.layer;
    let form = layui.form;
    // 密码长度校验
    form.verify({
        // 所有密码
        pwd: [
            /^[\S]{6,12}$/, '密码长度必须6-12，不能有空格',
        ],
        // 新密么和旧密码不重复
        samePwd: function (value) {
            // value 是新密码，旧密码要获取
            if (value == $('[name=oldPwd]').val()) {
                return '新密码不能和原密码相同';
            };
        },
        // 两个新密码判断
        rePwd: function (value) {
            // value 是确认密码时输入的密码，第一次的新密码要获取
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码要一致！';
            };
        },
    });


    // 点击提交修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // 发送请求
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg(res.message);
                // 清空输入框
                $('.layui-form')[0].reset();
            },
        });
    });



    // 点击重置密码
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        // console.log(22222);
        $('.layui-form').find('input').val('');
    })







});