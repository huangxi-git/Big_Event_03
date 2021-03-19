$(function () {

    // 渲染页面
    getUserInfo();

    let layer = layui.layer;
    // 点击退出按钮
    $('#btnLogout').on('click', function () {
        // console.log(99555);
        // layui提供的询问框
        layer.confirm('是有退出？', { icon: 3, title: '提示' },
            function (index) {
                // 清空本地 token 
                localStorage.removeItem('token');
                // 页面跳转
                location.href = '/login.html';
                // 关闭询问框
                layer.close(index);
            });
    });





});


// 全局函数---其他页面可以调用函数
// 获取用户信息
function getUserInfo() {

    // 发送请求
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     // 拿取本地存储的 token ，登录成功本地就有token，没有登录就没有
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            };
            // 调用函数传入数据--渲染页面
            renderAvatar(res.data);
        },
    });
};


// 封装函数渲染 昵称-头像
function renderAvatar(user) {
    // 拿到名字数据
    let name = user.nickname || user.username;
    // 渲染名字
    $('#welcome').html(name);
    // 渲染头像
    // 判断是否有头像，没有头像用名字
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toIpperCase());
    };

};